import { check, group } from "k6";
import { requestsManager } from "../../requestsManager.ts";

export class GetUserIdByUsername {


    execute<T extends {userName:string} >(stepData: T ) {
    
      const {userName} = stepData
    
    return group('getUserByEnteredUsername', function () {
       
     const resp: any= requestsManager.userService.getUserByUsername(userName)
    
      check(resp, { 'getUserByUsername status equals 200': (r) => r.status === 200 });
            // console.log(`response Body: ${resp.body}`);
        
    
        const users = JSON.parse(resp.body);
      
        const userId = users.id;
        // console.log(`Found Available User Id: ${userId}`);
        return {...stepData, userId};
    
      });
    }
    

}