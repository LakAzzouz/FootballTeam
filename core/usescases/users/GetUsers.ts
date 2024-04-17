import { User } from "../../entities/User"
import { UserRepository } from "../../repositories/UserRepository"
import { Usecases } from "../Usecase"

type GetUserInput = {
    id: string
}

export class GetUsers implements Usecases<GetUserInput, Promise<User>> {
    constructor(
        private readonly userRepository: UserRepository
    ){}

    async execute(input: GetUserInput): Promise<User> {
        const user = await this.userRepository.getById(input.id)

        return user
    }
}