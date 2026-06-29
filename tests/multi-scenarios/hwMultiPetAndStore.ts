import { stepsManager } from "../../apps/stepsManager.ts";


export const options = {
  vus: 1,
  iterations: 1,
  duration: '1m',
};

export default function() {

const createUser = stepsManager.userSteps.createNewUser();
const loginUser = stepsManager.userSteps.loginUser(createUser);
const addNewPet = stepsManager.petSteps.addNewPet();
const findPetById = stepsManager.petSteps.getPetById(addNewPet)
const placeOrder = stepsManager.storeSteps.placeOrder(findPetById);
const findOrder = stepsManager.storeSteps.findOrderbyId(placeOrder);
const updatePetStatusToSold = stepsManager.petSteps.updatePetStatusToSold(findOrder)
const soldPets = stepsManager.petSteps.getSoldPets(updatePetStatusToSold);

console.log('hwMultiPetAndStore test data: ' + JSON.stringify(soldPets))
}
