import {PetSteps} from "./steps/petsSteps.ts"
import {UserSteps} from "./steps/userSteps.ts"

class StepsManager {
    petSteps: PetSteps  = new PetSteps ()
    userSteps: UserSteps = new UserSteps ()
}

export const stepsManager = new StepsManager ();