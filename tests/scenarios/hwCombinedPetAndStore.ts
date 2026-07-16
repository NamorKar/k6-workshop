import { stepsManager } from "../../apps/stepsManager.ts";


export const options = {
  vus: 1,
  iterations: 1,
};

export default function() {

const createUser = stepsManager.userSteps.createNewUser();
const loginUser = stepsManager.userSteps.loginUser(createUser);
const addNewPet = stepsManager.petSteps.addNewPet();
const findPetById = stepsManager.petSteps.getPetById(addNewPet)
const placeOrder = stepsManager.storeSteps.placeOrder(findPetById);
const findOrder = stepsManager.storeSteps.findOrderbyId(placeOrder);
const updatePetStatusToSold = stepsManager.petSteps.updatePetStatus(findOrder, 'sold')
const soldPets = stepsManager.petSteps.getSoldPet(updatePetStatusToSold);

console.log('hwMultiPetAndStore test data: ' + JSON.stringify(soldPets))
}
