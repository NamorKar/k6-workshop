import { check, group } from "k6";
import { requestsManager } from "../../requestsManager.ts";

export class GetUserIdByUsername {


    execute<T extends { userName: string }>(stepData: T) {

        const { userName } = stepData

        return group('getUserByEnteredUsername', function () {

            const resp = requestsManager.userService.getUserDataByUsername(userName)

            check(resp, { 'getUserByUsername status equals 200': (r) => r.status === 200 });


            const users = JSON.parse(resp.body as string);

            const userId = users.id;
            console.log(`Found Available User Id: ${userId}`);
            return { ...stepData, userId };

        });
    }


}