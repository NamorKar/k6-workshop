import { check, group } from "k6";
import { requestsManager } from "../requestsManager.ts";
// @ts-ignore
import { randomItem } from "../../framework/k6Libs/k6Utils.js"
import { Pet } from "../../apps/types/typePet.ts";

export class PetSteps {

  // getAvailablePets () {
  getAvailablePets<T extends object>(stepData: T = {} as T) {

    return group('getAvailablePets', function () {


      const resp: any = requestsManager.petService.findPetByStatus("available")


      check(resp, { 'status equals 200': (r) => r.status === 200 });
      // console.log(`response Body: ${resp.body}`);


      const pets = JSON.parse(resp.body);
      const randomPet = randomItem(pets);

      const availablePetId = randomPet.id;
      // console.log(`Found Available pet id: ${availablePetId}`);
      return { ...stepData, availablePetId };

    });
  }

  // getSoldPets () {
  getSoldPets<T extends object>(stepData: T = {} as T) {

    return group('getSoldPets', function () {

      //   const resp: any = http.get('https://petstore.swagger.io/v2/pet/findByStatus?status=available');
      const resp: any = requestsManager.petService.findPetByStatus("sold")


      check(resp, { 'status equals 200': (r) => r.status === 200 });
      // console.log(`response Body: ${resp.body}`);


      const pets = JSON.parse(resp.body);
      const randomPet = randomItem(pets);

      const soldPetId = randomPet.id;
      // console.log(`Found Sold pet id: ${soldPetId}`);
      return { ...stepData, soldPetId };

    });
  }


  // getPendingPets () {
  getPendingPets<T extends object>(stepData: T = {} as T) {

    return group('getPendingPets', function () {

      //   const resp: any = http.get('https://petstore.swagger.io/v2/pet/findByStatus?status=available');
      const resp: any = requestsManager.petService.findPetByStatus("pending")


      check(resp, { 'status equals 200': (r) => r.status === 200 });
      // console.log(`response Body: ${resp.body}`);


      const pets = JSON.parse(resp.body);
      const randomPet = randomItem(pets);

      const pendingPetId = randomPet.id;
      const pendingPetName = randomPet.name;
      // console.log(`Found Pending id: ${pendingPetId}`);
      // console.log(`Found Pending pet name: ${pendingPetName}`);
      return { ...stepData, pendingPetId, pendingPetName }

    });
  }

  // getPetById(petId: string, petName: string) {
  getPetById<T extends { soldPetId: string, pendingPetName: string }>(stepData: T) {
    const { soldPetId, pendingPetName } = stepData

    return group("Get Pet By Id", function () {
      const getPetByIdResp = requestsManager.petService.findPetById(soldPetId)

      check(getPetByIdResp, { 'status equals 200': (r) => r.status === 200 });
      // console.log(`Found pet by id body: ${getPetByIdResp.body}`);
      // console.log(`Found pet name: ${pendingPetName}`);
      return { ...stepData, getPetByIdResp }

    })
  }

  addNewPet<T extends object>(stepData: T = {} as T) {

    return group('addNewPet', function () {

      // Request body
      const bodyObj: Pet = {
        "id": 134,
        "category": {
          "id": 356,
          "name": "string"
        },
        "name": "doggie11",
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
      const petId = pets.id

      check(resp, {
        'addNewPet status equals 200': (r) => r.status === 200,
        'addNewPet response pet Id matches requested pet Id': () => Number(petId) === bodyObj.id
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

      // console.log(`updateUserDataDisableUser Response Body: ${resp.body}`);

      return { ...stepData };

    });
  }

  deletePet<T extends { petId: string }>(stepData: T) {

    const { petId } = stepData

    return group('deletePet', function () {


      const params = {
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "api_key": "special-key",
        },
      };

      const resp = requestsManager.petService.deletePet(petId, null, params)

      check(resp, {
        'dropUser status equals 200': (r) => r.status === 200,
      });

      // console.log(`dropUser Response Body: ${resp.body}`);

      return { ...stepData };

    });
  }

 checkPetIsNotFound<T extends { petId: string }>(stepData: T) {

    const { petId } = stepData

    return group('checkPetIsNotFound', function () {

      const resp = requestsManager.petService.findPetById(petId)

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