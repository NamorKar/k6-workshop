import { check, group } from "k6";
import { requestsManager } from "../requestsManager.ts";
// @ts-ignore
import { randomItem, randomIntBetween } from "../../framework/k6Libs/k6Utils.js"
import { Pet } from "../../apps/types/typePet.ts";

export class PetSteps {

  getAvailablePet<T extends object>(stepData: T = {} as T) {

    return group('getAvailablePet', function () {


      const resp = requestsManager.petService.findPetByStatus("available")

      const pets = JSON.parse(resp.body as string);
      const randomPet = randomItem(pets);
      check(resp, {
        'getAvailablePet status equals 200': (r) => r.status === 200,
        'getAvailablePet all pets have status available': () => pets.every((pet: Pet) => pet.status === 'available'),

      });

      const availablePetId: number = randomPet.id;
      return { ...stepData, availablePetId };

    });
  }

  getSoldPet<T extends object>(stepData: T = {} as T) {

    return group('getSoldPet', function () {

      const resp = requestsManager.petService.findPetByStatus("sold")
      const pets = JSON.parse(resp.body as string);
      const randomPet = randomItem(pets);

      check(resp, {
        'getSoldPet status equals 200': (r) => r.status === 200,
        'getSoldPet all pets have status sold': () => pets.every((pet: Pet) => pet.status === 'sold')
      });



      const soldPetId = randomPet.id;
      return { ...stepData, soldPetId };

    });
  }


  getPendingPet<T extends object>(stepData: T = {} as T) {

    return group('getPendingPet', function () {

      const resp = requestsManager.petService.findPetByStatus("pending")

      const pets = JSON.parse(resp.body as string);
      const randomPet = randomItem(pets);

      check(resp, {
        'getPendingPet status equals 200': (r) => r.status === 200,
        'getPendingPet all pets have status pending': () => pets.every((pet: Pet) => pet.status === 'pending')
      });



      const pendingPetId = randomPet.id;
      const pendingPetName = randomPet.name;

      return { ...stepData, pendingPetId, pendingPetName }

    });
  }

  getPetById<T extends { petId: number }>(stepData: T) {
    const { petId } = stepData

    return group("getPetById", function () {
      const getPetByIdResp = requestsManager.petService.findPetById(String(petId))

      check(getPetByIdResp, {
        'getPetById status equals 200': (r) => r.status === 200,
        'getPetById response pet Id matches requested pet Id': (r) => r.json("id") === petId,
      });

      return { ...stepData, petId }

    })
  }

  addNewPet<T extends object>(stepData: T = {} as T, customPetData?: Pet) {

    return group('addNewPet', function () {

      let reqPetDataObj: Pet;

      if (customPetData) {
        reqPetDataObj = customPetData;
      } else {
        //Generate pet data
        const petId: number = randomIntBetween(100000, 999999)
        const categoryPetId: number = randomIntBetween(100, 999)

        // Request body
        reqPetDataObj = {
          "id": petId,
          "category": {
            "id": categoryPetId,
            "name": "string"
          },
          "name": `pet_${petId}`,
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
      }

      const params = {
        headers: {
          accept: `application/json`,
          "content-type": `application/json`,
        },
      };

      const resp = requestsManager.petService.addNewPet(JSON.stringify(reqPetDataObj), params)

      const respPetDataObj = JSON.parse(resp.body as string);
      const petIdResp = respPetDataObj.id
      const petName = respPetDataObj.name

      check(resp, {
        'addNewPet status equals 200': (r) => r.status === 200,
        'addNewPet response pet Id matches requested pet Id': () => Number(petIdResp) === reqPetDataObj.id
      });

      const petId = reqPetDataObj.id;
      return { ...stepData, petId, petName, petIdResp, respPetDataObj };


    });
  };


  updatePet<T extends object>(stepData: T, respPetDataObj: Pet) {

    return group('updatePet', function () {

      const params = {
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
      };

      const resp = requestsManager.petService.updatePetObj(JSON.stringify(respPetDataObj), params)

      const pet = JSON.parse(resp.body as string);
      const petId = pet.id

      check(resp, {
        'updatePet status equals 200': (r) => r.status === 200,
        'updatePet resp petId matches requested petId': (r) => r.json("id") === String(petId)
      });

      return { ...stepData };

    });
  }

  updatePetStatus<T extends { petId: number, petName: string }>(stepData: T, petStatus: 'available' | 'pending' | 'sold') {

    const { petId, petName } = stepData

    const updatePetPayload: string = `name=${petName}&status=${petStatus}`

    return group('updatePetStatus', function () {


      const params = {
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
        },
      };

      const resp = requestsManager.petService.updatePetStatus(petId, updatePetPayload, params)

      const pet = JSON.parse(resp.body as string);
      const petStatus = pet.status

      check(resp, {
        'updatePetStatus status equals 200': (r) => r.status === 200,
        'updatePetStatus resp petId matches requested petId': (r) => r.json("message") === String(petId)
      });

      return { ...stepData, petStatus };

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