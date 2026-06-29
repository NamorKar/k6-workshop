import { check, group } from "k6";
import { requestsManager } from "../../requestsManager.ts";
import { User } from "../../types/typeUser.ts";

export class DropUser {

    execute<T extends { userName: string, bodyObj: User }>(stepData: T) {

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