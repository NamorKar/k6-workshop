import { stepsManagerExec } from "../apps/stepsManagerExec.ts";

export const options = {
  vus: 1,
  iterations: 1,
  duration: '1m',
};

export default function() {


const createUser = stepsManagerExec.createNewUser.execute();
const loginUser = stepsManagerExec.loginUser.execute(createUser);
const updateUserDataDisableUser = stepsManagerExec.updateUserDataDisableUser.execute(loginUser);
const getUserIdByUsername = stepsManagerExec.getUserIdByUsername.execute(updateUserDataDisableUser);
const dropUser = stepsManagerExec.dropUser.execute(getUserIdByUsername);
const checkUserIsNotFound = stepsManagerExec.checkUserIsNotFound.execute(dropUser);

console.log('User Journey flow data: ' + JSON.stringify(checkUserIsNotFound))
}
