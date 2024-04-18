import { v4 } from "uuid"
import { UserRepository } from "../../repositories/UserRepository"
import { Usecases } from "../Usecase"
import { User } from "../../entities/User"
import { PasswordGateway } from "../../gateways/PasswordGateways"
import { Password } from "../../valueObjects/Password"
import { Email } from "../../valueObjects/Email"

type CreateUserInput = {
    id: string,
    email: string,
    password: string
    //phone: string
}

export class CreateUser implements Usecases<CreateUserInput, Promise<User>> {
    constructor(
        private readonly _passwordGateway: PasswordGateway,
        private readonly _userRepository: UserRepository
    ){}

    async execute(input: CreateUserInput): Promise<User> {

        const mailChecked = Email.gmailChecked(input.email)
        const passwordValidated = Password.passwordLenght(input.password)
        
        const hashedPassword = this._passwordGateway.hashPassword(passwordValidated, 10)
    
        const user = User.create(v4(), hashedPassword, mailChecked)

        await this._userRepository.save(user)

        return user
    }
}