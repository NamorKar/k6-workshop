import { check, group } from "k6";
import { requestsManager } from "../requestsManager.ts";
import { Order } from "../types/typeOrder.ts";
// @ts-ignore
import { randomIntBetween } from "../../framework/k6Libs/k6Utils.js"

export class StoreSteps {

    getInventory<T extends object>(stepData: T = {} as T) {

        return group('getInventory', function () {


            const resp = requestsManager.storeService.getInventory();


            check(resp, { 'status equals 200': (r) => r.status === 200 });
            console.log(`response Body: ${resp.body}`);


            const petsInventory = JSON.parse(resp.body as string);
            const availablePetInventory = petsInventory.available;
            console.log(`Found Available pet inventory qty: ${availablePetInventory}`);
            return { ...stepData, availablePetInventory };

        });
    }

    placeOrder<T extends { petId: number }>(stepData: T) {

        const { petId } = stepData

        return group('placeOrder', function () {

            // Generate order data
            const orderId: number = randomIntBetween(1, 9)
            const shipDate: string = new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString() //Now date + 10 days

            // Generate request body
            const bodyObj: Order = {
                "id": orderId,
                "petId": petId,
                "quantity": 1,
                "shipDate": shipDate,
                "status": "placed",
                "complete": true
            }

            const params = {
                headers: {
                    accept: `application/json`,
                    "content-type": `application/json`,
                },
            };

            const resp = requestsManager.storeService.placeOrder(JSON.stringify(bodyObj), params)

            const order = JSON.parse(resp.body as string);
            const orderStatus = order.status

            check(resp, {
                'placeOrder status equals 200': (r) => r.status === 200,
                'placeOrder status is placed': () => orderStatus === 'placed'
            });
            console.log(`Order is placed, order id : ${orderId}`);

            return { ...stepData, orderId, bodyObj };



        });
    };

    findOrderbyId<T extends { orderId: number }>(stepData: T) {

        const { orderId } = stepData

        return group('findOrderbyId', function () {

            const resp = requestsManager.storeService.findOrderById((String(orderId)))

            check(resp, { 'findOrderbyId status equals 200': (r) => r.status === 200 });

            return { ...stepData };

        });
    }


    deleteOrder<T extends { orderId: number }>(stepData: T) {

        const { orderId } = stepData

        return group('deleteOrder', function () {


            const params = {
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                },
            };

            const resp = requestsManager.storeService.deleteOrder(String(orderId), null, params)

            check(resp, {
                'deleteOrder status equals 200': (r) => r.status === 200,
            });

            return { ...stepData };

        });
    }

}