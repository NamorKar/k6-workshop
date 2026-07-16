import { stepsManager } from "../../apps/stepsManager.ts";


export const options = {
  vus: 1,
  iterations: 1,
};

export default function() {


const createUser = stepsManager.userSteps.createNewUser();
const loginUser = stepsManager.userSteps.loginUser(createUser);
const updateUserToDisable = stepsManager.userSteps.updateUserDataDisableUser(loginUser, loginUser.userName, loginUser.respUserData);
const getUserIdByUsername = stepsManager.userSteps.getUserDataByUsername(updateUserToDisable);
const dropUser = stepsManager.userSteps.dropUser(getUserIdByUsername)
const checkUserIsNotFound = stepsManager.userSteps.checkUserIsNotFound(dropUser)


console.log('User Journey flow data: ' + JSON.stringify(checkUserIsNotFound))
}
