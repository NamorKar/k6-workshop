import { check, group } from "k6";
import { requestsManager } from "../../requestsManager.ts";

export class DropUser {

    execute<T extends { userName: string}>(stepData: T) {

        const { userName} = stepData

        return group('dropUser', function () {


            const params = {
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                },
            };

            const resp = requestsManager.userService.deleteUser(userName, params)

            check(resp, {
                'dropUser status equals 200': (r) => r.status === 200,
                'dropUser message equal username': (r) => r.json("message") === userName,
            });


            return { ...stepData };

        });
    }

}