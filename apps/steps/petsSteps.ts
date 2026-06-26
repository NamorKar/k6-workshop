import { check, group } from "k6";
import { requestsManager } from "../requestsManager.ts";
// @ts-ignore
import {randomItem} from "../../framework/k6Libs/k6Utils.js"

export class PetSteps {

// getAvailablePets () {
 getAvailablePets<T extends object >(stepData: T = {} as T) {

return group('getAvailablePets', function () {
   

 const resp: any= requestsManager.petService.findPetByStatus("available")


  check(resp, { 'status equals 200': (r) => r.status === 200 });
        // console.log(`response Body: ${resp.body}`);
    

    const pets = JSON.parse(resp.body);
    const randomPet = randomItem(pets);

    const availablePetId = randomPet.id;
    // console.log(`Found Available pet id: ${availablePetId}`);
    return {...stepData, availablePetId};

  });
}

// getSoldPets () {
 getSoldPets<T extends object >(stepData: T = {} as T) {

return group('getSoldPets', function () {
   
//   const resp: any = http.get('https://petstore.swagger.io/v2/pet/findByStatus?status=available');
 const resp: any= requestsManager.petService.findPetByStatus("available")


  check(resp, { 'status equals 200': (r) => r.status === 200 });
        // console.log(`response Body: ${resp.body}`);
    

    const pets = JSON.parse(resp.body);
    const randomPet = randomItem(pets);

    const soldPetId = randomPet.id;
    // console.log(`Found Sold pet id: ${soldPetId}`);
    return {...stepData, soldPetId};

  });
}


// getPendingPets () {
 getPendingPets<T extends object >(stepData: T = {} as T) {

return group('getPendingPets', function () {
   
//   const resp: any = http.get('https://petstore.swagger.io/v2/pet/findByStatus?status=available');
 const resp: any= requestsManager.petService.findPetByStatus("available")


  check(resp, { 'status equals 200': (r) => r.status === 200 });
        // console.log(`response Body: ${resp.body}`);
    

    const pets = JSON.parse(resp.body);
    const randomPet = randomItem(pets);

    const pendingPetId = randomPet.id;
    const pendingPetName = randomPet.name;
    // console.log(`Found Pending id: ${pendingPetId}`);
    // console.log(`Found Pending pet name: ${pendingPetName}`);
    return {...stepData, pendingPetId, pendingPetName}

  });
}

// getPetById(petId: string, petName: string) {
getPetById<T extends {soldPetId:string, pendingPetName: string} >(stepData: T ) {
  const {soldPetId, pendingPetName} = stepData

  return group ("Get Pet By Id", function(){
const getPetByIdResp = requestsManager.petService.findPetById(soldPetId)

check(getPetByIdResp, { 'status equals 200': (r) => r.status === 200 });
// console.log(`Found pet by id body: ${getPetByIdResp.body}`);
// console.log(`Found pet name: ${pendingPetName}`);
return {...stepData, getPetByIdResp}

  })
}

}