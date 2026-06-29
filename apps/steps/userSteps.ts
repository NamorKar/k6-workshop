import { check, group } from "k6";
import { requestsManager } from "../requestsManager.ts";
// @ts-ignore
import * as UserDataGen from "../../framework/k6Libs/dataGenerator.js";
import { User } from "../types/typeUser.ts";


export class UserSteps {

  getUserByUsername<T extends { userName: string }>(stepData: T) {

    const { userName } = stepData

    return group('getUserByEnteredUsername', function () {

      const resp = requestsManager.userService.getUserByUsername(userName)

      check(resp, { 'getUserByUsername status equals 200': (r) => r.status === 200 });

      const users = JSON.parse(resp.body as string);

      const userId = users.id;
      return { ...stepData, userId };

    });
  }


  checkUserIsNotFound<T extends { userName: string }>(stepData: T) {

    const { userName } = stepData

    return group('checkUserIsNotFound', function () {

      const resp = requestsManager.userService.getUserByUsername(userName)

      const users = JSON.parse(resp.body as string);
      const userNotFoundMessage = users.message;

      check(resp, {
        'checkUserIsNotFound status equals 404': (r) => r.status === 404,
        'checkUserIsNotFound response contains user not found': () => userNotFoundMessage == 'User not found',
      });

      return { ...stepData };

    });
  }

  createNewUser<T extends object>(stepData: T = {} as T) {

    return group('createNewUser', function () {

      // Generate user data
      const userId: number = UserDataGen.randomIntBetween(1000, 9999)
      const userName: string = UserDataGen.randomUsername()
      const userFirstName: string = UserDataGen.randomFirstName()
      const userLastName: string = UserDataGen.randomLastName()
      const userEmail: string = UserDataGen.randomEmail()
      const userPassword: string = UserDataGen.randomPassword()
      const userPhone: string = UserDataGen.randomPhone()

      // Generate request body
      const bodyObj: User = {
        "id": userId,
        "username": userName,
        "firstName": userFirstName,
        "lastName": userLastName,
        "email": userEmail,
        "password": userPassword,
        "phone": userPhone,
        "userStatus": 0
      }

      const params = {
        headers: {
          accept: `application/json`,
          "content-type": `application/json`,
        },
      };

      const resp = requestsManager.userService.createNewUser(JSON.stringify(bodyObj), params)

      const users = JSON.parse(resp.body as string);
      const respUserId = users.message

      check(resp, {
        'createNewUser status equals 200': (r) => r.status === 200,
        'createNewUser response user Id matches requested user Id': () => Number(respUserId) === userId
      });

      console.log(`Created user ${userName} with id : ${userId}`);
      return { ...stepData, userId, userName, userPassword, bodyObj };

    });
  };

  loginUser<T extends { userName: string, userPassword: string }>(stepData: T) {
    const { userName, userPassword } = stepData

    return group('loginUser', function () {


      const params = {
        headers: {
          accept: `application/json`,
        },
      };

      const resp = requestsManager.userService.loginUser(userName, userPassword, params)

      const users = JSON.parse(resp.body as string);
      const loginSessionMessage: string = users.message;
      const userSessionId = loginSessionMessage.match(/logged in user session:(\d+)/)?.[1];

      check(resp, {
        'loginUser status equals 200': (r) => r.status === 200,
        'loginUser message contains logged in user session': (r) => {
          return loginSessionMessage.includes('logged in user session');
        }
      });

      return { ...stepData, userSessionId };

    });
  }


  updateUserDataDisableUser<T extends { userName: string, bodyObj: User }>(stepData: T) {

    const { userName, bodyObj } = stepData

    bodyObj.userStatus = 1;  //

    return group('updateUserData', function () {


      const params = {
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
      };

      const resp = requestsManager.userService.updateUserData(userName, JSON.stringify(bodyObj), params)

      check(resp, {
        'updateUserDataDisableUser status equals 200': (r) => r.status === 200,
      });

      return { ...stepData };

    });
  }

  dropUser<T extends { userName: string, bodyObj: User }>(stepData: T) {

    const { userName, bodyObj } = stepData

    return group('dropUser', function () {


      const params = {
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
      };

      const resp = requestsManager.userService.deleteUser(userName, JSON.stringify(bodyObj), params)

      check(resp, {
        'dropUser status equals 200': (r) => r.status === 200,
      });

      return { ...stepData };

    });
  }


}