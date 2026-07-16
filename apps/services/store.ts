import { Params, RequestBody } from "k6/http";
import { BaseRequests } from "./baseRequests.ts";

export class StoreService extends BaseRequests {

    getInventory(params?: Params) {

        return this.GET(`/v2/store/inventory`, params)
    }

    placeOrder(body: RequestBody, params?: Params) {
        return this.POST(`/v2/store/order`, body, params)
    }

    findOrderById(orderId: String, params?: Params) {
        return this.GET(`/v2/store/order/${orderId}`, params)
    }

    deleteOrder(orderId: string, body?: RequestBody | null, params?: Params) {
        return this.DELETE(`/v2/store/order/${orderId}`, body, params)
    }
}