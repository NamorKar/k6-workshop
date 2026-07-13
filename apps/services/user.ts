import { Params, RequestBody } from "k6/http";
import { BaseRequests } from "./baseRequests.ts";

export class UserService extends BaseRequests {

    getUserDataByUsername (username: string, params?:Params) {
        return this.GET (`/v2/user/${username}`, params)

    }

    createNewUser (body: RequestBody, params?:Params) {
        return this.POST (`/v2/user`,body,params)

    }


    loginUser (username: string, password: string, params?:Params) {
        return this.GET (`/v2/user/login?username=${username}&password=${password}`, params)

    }

        updateUserData (username: string, body: RequestBody, params?:Params) {
        return this.PUT (`/v2/user/${username}`, body, params)

    }

            deleteUser (username: string, params?:Params) {
        return this.DELETE (`/v2/user/${username}`,null, params)

    }
    

}