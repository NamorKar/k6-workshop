import { check, group } from "k6";
import { requestsManager } from "../../requestsManager.ts";
import { User } from "../../types/typeUser.ts";


export class UpdateUserDataDisableUser {
    execute<T extends {userName:string, bodyObj: User} >(stepData: T ) {

  const {userName, bodyObj} = stepData

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

     return {...stepData};

  });
}

}


