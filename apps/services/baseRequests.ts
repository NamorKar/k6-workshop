import http , { Params, RequestBody } from 'k6/http';
import { BASE_URL } from '../../config/frameworkConfig.ts';


export class BaseRequests {

    constructor (protected readonly baseURL = BASE_URL) {
        this.baseURL = baseURL;
    }

    protected GET (path: string, params?: Params ) {
        return http.get(`${this.baseURL}${path}`, params)

    }

    protected POST (path: string, body: RequestBody | null, params?: Params ) {
    return http.post(`${this.baseURL}${path}`, body, params)

    }

    protected PUT (path: string, body: RequestBody | null, params?: Params ) {
    return http.put(`${this.baseURL}${path}`, body, params)

    }

    protected DELETE (path: string, body?: RequestBody | null, params?: Params ) {
    return http.del(`${this.baseURL}${path}`, body, params)

    }
}