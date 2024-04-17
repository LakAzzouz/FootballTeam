import {v4} from "uuid"
import {User} from "../../core/entities/User"
import { error } from "console";
import { UserRepository } from "../../core/repositories/UserRepository";

export class InMemoryUserRepository implements UserRepository {
    map : Map<string, User>

    constructor(map: Map<string, User>) {
        this.map = map
    }

    async save(user: User): Promise<User>{
        await this.map.set(user.id, user); 
        return user
    }

    async getByEmail(email: string): Promise<User>{
        const users = Array.from(this.map.values()) // récup les données

        const userExist = users.find(user => user.email === email) // Vérifie si le mail correspond 
        if(!userExist){
            throw new Error("User not found")
        }
        return userExist
    }

    async getById(id: string): Promise<User>{
        const user = this.map.get(id)
        if(!user){
            throw new Error("User not found")
        }
        return user
    }

    async delete(id: string): Promise<void>{
        const userDeleted = this.map.delete(id)
        if(!userDeleted){
            throw new Error("User not found") 
        }
        return
    }
}