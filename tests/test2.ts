import { stepsManager } from "../apps/stepsManager.ts";


export const options = {
  vus: 1,
  iterations: 1,
  duration: '1m',
};

export default function() {

const availablePets = stepsManager.petSteps.getAvailablePets();
const soldPets = stepsManager.petSteps.getSoldPets(availablePets);
const pendingPets = stepsManager.petSteps.getPendingPets(soldPets);

const petByID = stepsManager.petSteps.getPetById(pendingPets);
const petByID2 = stepsManager.petSteps.getPetById({...pendingPets, soldPetId:availablePets.availablePetId});

console.log(petByID2)
}

