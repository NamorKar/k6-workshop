import { Params, RequestBody } from "k6/http";
import { BaseRequests } from "./baseRequests.ts";

export class PetService extends BaseRequests {

    findPetByStatus(status: 'available' | 'pending' | 'sold', params?: Params) {
        return this.GET(`/v2/pet/findByStatus?status=${status}`, params)
    }

    findPetById(petId: String, params?: Params) {
        return this.GET(`/v2/pet/${petId}`, params)
    }

    addNewPet(body: RequestBody, params?: Params) {
        return this.POST(`/v2/pet/`, body, params)
    }

    setPetStatusSold(body: RequestBody, params?: Params) {
        return this.PUT(`/v2/pet/`, body, params)
        
    }
    deletePet(petId: string, body?: RequestBody | null, params?: Params) {
        return this.DELETE(`/v2/pet/${petId}`, body, params)

    }
}