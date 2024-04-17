import { v4 } from "uuid"
import { UserRepository } from "../../repositories/UserRepository"
import { Usecases } from "../Usecase"
import { User } from "../../entities/User"
import { PasswordGateway } from "../../gateways/PasswordGateways"
import bcrypt from "bcrypt"

type CreateUserInput = {
    id: string,
    email: string,
    password: string
}

export class CreateUser implements Usecases<CreateUserInput, Promise<User>> {
    constructor(
        private readonly _passwordGateway: PasswordGateway,
        private readonly _userRepository: UserRepository
    ){}

    async execute(input: CreateUserInput): Promise<User> {
        const hashedPassword = this._passwordGateway.hashPassword(input.password, 10)
    
        const user = User.create(v4(), hashedPassword, input.email)

        await this._userRepository.save(user)

        return user
    }
}