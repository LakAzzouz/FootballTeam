import { User } from "../../entities/User"
import { UserRepository } from "../../repositories/UserRepository"
import { Usecases } from "../Usecase"

type UpdateUserInput = {
    id: string
    email: string
}

export class UpdateUser implements Usecases<UpdateUserInput, Promise<User>>{
    constructor(
    private readonly userRepository: UserRepository
    ){}

    async execute(input: UpdateUserInput): Promise<User> {
        const user = await this.userRepository.getById(input.id)

        user.updateEmail(input.email)

        return user
    }
}