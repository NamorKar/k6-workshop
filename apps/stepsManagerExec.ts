import {CreateNewUser} from "./steps/user-steps/createNewUser.ts"
import {LoginUser} from "./steps/user-steps/LoginUser.ts"
import {UpdateUserDataDisableUser} from "./steps/user-steps/UpdateUserDataDisableUser.ts"
import {GetUserIdByUsername} from "./steps/user-steps/getUserIdByUsername.ts"
import {DropUser} from "./steps/user-steps/DropUser.ts"
import {CheckUserIsNotFound} from "./steps/user-steps/CheckUserIsNotFound.ts"

class StepsManagerExec {
    createNewUser: CreateNewUser = new CreateNewUser ();
    loginUser: LoginUser = new LoginUser ();
    updateUserDataDisableUser: UpdateUserDataDisableUser = new UpdateUserDataDisableUser ();
    getUserIdByUsername: GetUserIdByUsername = new GetUserIdByUsername ();
    dropUser: DropUser = new DropUser ();
    checkUserIsNotFound: CheckUserIsNotFound = new CheckUserIsNotFound ();

}

export const stepsManagerExec = new StepsManagerExec ();