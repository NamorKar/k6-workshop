import {PetSteps} from "./steps/petsSteps.ts"
import {UserSteps} from "./steps/userSteps.ts"
import {StoreSteps} from "./steps/storeSteps.ts"

class StepsManager {
    petSteps: PetSteps  = new PetSteps ()
    userSteps: UserSteps = new UserSteps ()
    storeSteps: StoreSteps = new StoreSteps ()
}

export const stepsManager = new StepsManager ();