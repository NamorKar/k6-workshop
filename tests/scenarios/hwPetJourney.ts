import { stepsManager } from "../../apps/stepsManager.ts";


export const options = {
  vus: 1,
  iterations: 1,
  duration: '1m',
};

export default function() {

const addNewPet = stepsManager.petSteps.addNewPet();
const updatePetStatusToSold = stepsManager.petSteps.updatePetStatusToSold(addNewPet)
const soldPets = stepsManager.petSteps.getSoldPets(updatePetStatusToSold);
const deletePet = stepsManager.petSteps.deletePet (soldPets)
const checkPetIsNotFound = stepsManager.petSteps.checkPetIsNotFound(deletePet)

console.log('Pet journey test data: ' + JSON.stringify(checkPetIsNotFound))
}


