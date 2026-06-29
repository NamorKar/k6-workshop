import { check, group } from "k6";
import { requestsManager } from "../requestsManager.ts";
// @ts-ignore
import { randomItem, randomIntBetween } from "../../framework/k6Libs/k6Utils.js"
import { Pet } from "../../apps/types/typePet.ts";

export class PetSteps {

  getAvailablePets<T extends object>(stepData: T = {} as T) {

    return group('getAvailablePets', function () {


      const resp = requestsManager.petService.findPetByStatus("available")


      check(resp, { 'getAvailablePets status equals 200': (r) => r.status === 200 });

      const pets = JSON.parse(resp.body as string);
      const randomPet = randomItem(pets);

      const availablePetId: number = randomPet.id;
      return { ...stepData, availablePetId };

    });
  }

  getSoldPets<T extends object>(stepData: T = {} as T) {

    return group('getSoldPets', function () {

      const resp = requestsManager.petService.findPetByStatus("sold")


      check(resp, { 'getSoldPets status equals 200': (r) => r.status === 200 });

      const pets = JSON.parse(resp.body as string);
      const randomPet = randomItem(pets);

      const soldPetId = randomPet.id;
      return { ...stepData, soldPetId };

    });
  }


  getPendingPets<T extends object>(stepData: T = {} as T) {

    return group('getPendingPets', function () {

      const resp = requestsManager.petService.findPetByStatus("pending")

      check(resp, { 'getPendingPets status equals 200': (r) => r.status === 200 });

      const pets = JSON.parse(resp.body as string);
      const randomPet = randomItem(pets);

      const pendingPetId = randomPet.id;
      const pendingPetName = randomPet.name;

      return { ...stepData, pendingPetId, pendingPetName }

    });
  }

  getPetById<T extends { petId: number }>(stepData: T) {
    const { petId } = stepData

    return group("getPetById", function () {
      const getPetByIdResp = requestsManager.petService.findPetById(String(petId))

      check(getPetByIdResp, { 'getPetById status equals 200': (r) => r.status === 200 });

      return { ...stepData, petId }

    })
  }

  addNewPet<T extends object>(stepData: T = {} as T) {

    return group('addNewPet', function () {

      //Generate pet data
      const petId: number = randomIntBetween(100000, 999999)
      const categoryPetId: number = randomIntBetween(100, 999)

      // Request body
      const bodyObj: Pet = {
        "id": petId,
        "category": {
          "id": categoryPetId,
          "name": "string"
        },
        "name": `pet ${petId}`,
        "photoUrls": [
          "string"
        ],
        "tags": [
          {
            "id": 0,
            "name": "string"
          }
        ],
        "status": "available"
      }

      const params = {
        headers: {
          accept: `application/json`,
          "content-type": `application/json`,
        },
      };

      const resp = requestsManager.petService.addNewPet(JSON.stringify(bodyObj), params)

      const pets = JSON.parse(resp.body as string);
      const petIdResp = pets.id

      check(resp, {
        'addNewPet status equals 200': (r) => r.status === 200,
        'addNewPet response pet Id matches requested pet Id': () => Number(petIdResp) === bodyObj.id
      });

      return { ...stepData, petId, bodyObj };


    });
  };


  updatePetStatusToSold<T extends { bodyObj: Pet }>(stepData: T) {

    const { bodyObj } = stepData

    bodyObj.status = 'sold';  //

    return group('updatePetStatusToSold', function () {


      const params = {
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
      };

      const resp = requestsManager.petService.setPetStatusSold(JSON.stringify(bodyObj), params)

      const pet = JSON.parse(resp.body as string);
      const petStatus = pet.status


      check(resp, {
        'updatePetStatusToSold status equals 200': (r) => r.status === 200,
        'updatePetStatusToSold status is sold': () => petStatus === 'sold'
      });

      return { ...stepData };

    });
  }

  deletePet<T extends { petId: number }>(stepData: T) {

    const { petId } = stepData

    return group('deletePet', function () {

      const params = {
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "api_key": "special-key",
        },
      };

      const resp = requestsManager.petService.deletePet(String(petId), null, params)

      check(resp, {
        'dropUser status equals 200': (r) => r.status === 200,
      });

      return { ...stepData };

    });
  }

  checkPetIsNotFound<T extends { petId: number }>(stepData: T) {

    const { petId } = stepData

    return group('checkPetIsNotFound', function () {

      const resp = requestsManager.petService.findPetById(String(petId))

      const pet = JSON.parse(resp.body as string);
      const petNotFoundMessage = pet.message;

      check(resp, {
        'checkPetIsNotFound status equals 404': (r) => r.status === 404,
        'checkPetIsNotFound response contains pet not found': () => petNotFoundMessage == 'Pet not found',
      });
      return { ...stepData };

    });
  }

}