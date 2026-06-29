import { check, group } from "k6";

import { requestsManager } from "../../requestsManager.ts";

export class CheckUserIsNotFound {

    execute<T extends { userName: string }>(stepData: T) {

        const { userName } = stepData

        return group('checkUserIsNotFound', function () {

            const resp = requestsManager.userService.getUserByUsername(userName)

            const users = JSON.parse(resp.body as string); //Fix 
            const userNotFoundMessage = users.message;

            check(resp, {
                'checkUserIsNotFound status equals 404': (r) => r.status === 404,
                'checkUserIsNotFound response contains user not found': () => userNotFoundMessage == 'User not found',
            });

            return { ...stepData };

        });
    }


}