import { stepsManager } from "../apps/stepsManager.ts";


export const options = {
  vus: 1,
  iterations: 1,
  duration: '1m',
};

export default function() {


const createUser = stepsManager.userSteps.createNewUser();
const loginUser = stepsManager.userSteps.loginUser(createUser);
const updateUserToDisable = stepsManager.userSteps.updateUserDataDisableUser(loginUser);
const getUserIdByUsername = stepsManager.userSteps.getUserByUsername(updateUserToDisable);
const dropUser = stepsManager.userSteps.dropUser(getUserIdByUsername)
const checkUserIsNotFound = stepsManager.userSteps.checkUserIsNotFound(dropUser)


console.log('User Journey flow data: ' + JSON.stringify(checkUserIsNotFound))
}
