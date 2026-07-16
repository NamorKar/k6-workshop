import { PetService } from "../apps/services/pet.ts";
import { UserService } from "../apps/services/user.ts";
import { StoreService } from "../apps/services/store.ts";

class RequestsManager {
    petService: PetService = new PetService();
    userService: UserService = new UserService();
    storeService: StoreService = new StoreService();
}

export const requestsManager = new RequestsManager();