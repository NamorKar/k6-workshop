import { stepsManager } from "../../apps/stepsManager.ts";


export const options = {
  vus: 1,
  iterations: 1,
  duration: '1m',
};

export default function() {

const getInventory = stepsManager.storeSteps.getInventory();
const placeOrder = stepsManager.storeSteps.placeOrder({petId: 134});
const findOrder = stepsManager.storeSteps.findOrderbyId(placeOrder);
const deleteOrder = stepsManager.storeSteps.deleteOrder(findOrder);

console.log('Store journey test data: ' + JSON.stringify(deleteOrder))

}

