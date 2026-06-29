import { check, group } from "k6";
import { requestsManager } from "../../requestsManager.ts";

export class LoginUser {

    execute<T extends { userName: string, userPassword: string }>(stepData: T) {
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

}


