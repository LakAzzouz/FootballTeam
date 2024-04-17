import { User } from "../../entities/User"
import { PasswordGateway } from "../../gateways/PasswordGateways"
import { UserRepository } from "../../repositories/UserRepository"
import { Usecases } from "../Usecase"

type SignInInput = {
    email: string
    password: string
}

export class SignIn implements Usecases<SignInInput, Promise<User>> {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly passwordGateway: PasswordGateway
    ) {}
    
    async execute(input: SignInInput): Promise<User> {
        const user = await this.userRepository.getByEmail(input.email)

        const isMatching = this.passwordGateway.compare(input.password, user.password)
        if(!isMatching){
            throw new Error("wrong_password")
        }
        return user
    }
}

