import { Params } from "k6/http";
import { BaseRequests } from "./baseRequests.ts";

export class PetService extends BaseRequests {

    findPetByStatus (status: 'available' | 'pending' | 'sold', params?:Params) {

        return this.GET (`/v2/pet/findByStatus?status=${status}`, params)

    }

    findPetById (petId: String, params?:Params) {
            return this.GET (`/v2/pet/${petId}`, params)
    }


}