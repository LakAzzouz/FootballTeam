import { User } from "../../entities/User"
import { UserRepository } from "../../repositories/UserRepository"
import { Usecases } from "../Usecase"


type DeleteUserInput = {
    id: string
}

export class DeleteUser implements Usecases<DeleteUserInput, Promise<User>> { // mettre usecases au singulier
    constructor(
        private readonly _userRepository: UserRepository
    ){}

    async execute(input: DeleteUserInput): Promise<User> {
        const user = await this._userRepository.getById(input.id)
    
        this._userRepository.delete(input.id)

        return user
    }
}