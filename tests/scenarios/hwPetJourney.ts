import { stepsManager } from "../../apps/stepsManager.ts";


export const options = {
  vus: 1,
  iterations: 1,
};

export default function() {

const addNewPet = stepsManager.petSteps.addNewPet();
const updatePetStatusToSold = stepsManager.petSteps.updatePetStatus(addNewPet, 'sold')
const soldPets = stepsManager.petSteps.getSoldPet(updatePetStatusToSold);
const deletePet = stepsManager.petSteps.deletePet (soldPets)
const checkPetIsNotFound = stepsManager.petSteps.checkPetIsNotFound(deletePet)
const getAvailablePet = stepsManager.petSteps.getAvailablePet()

console.log('Pet journey test data: ' + JSON.stringify(checkPetIsNotFound))}
