import { check, group } from "k6";
import { requestsManager } from "../../requestsManager.ts";
// @ts-ignore
import * as UserDataGen from "../../../framework/k6Libs/dataGenerator.js";

export class CreateNewUser {

    execute<T extends object>(stepData: T = {} as T) {

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
            const bodyObj = {
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

            return { ...stepData, userId, userName, userPassword, bodyObj };

        });
    };
}



