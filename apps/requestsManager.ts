import { PetService } from "../apps/services/pet.ts";
import { UserService } from "../apps/services/user.ts";

class RequestsManager {
    petService: PetService = new PetService();
    userService: UserService = new UserService();
}

export const requestsManager = new RequestsManager();