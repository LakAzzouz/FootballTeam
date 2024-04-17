import {v4} from "uuid"
import { FootballManager } from "../../core/entities/FootballManager"

export class InMemoryFootballManagertRepository {
    map : Map<string, FootballManager>

    constructor(map: Map<string, FootballManager>) {
        this.map = map
    }

    save(footballManager: FootballManager): void{
        this.map.set(footballManager.id, footballManager)
        return
    }

    getById(id: string): FootballManager{
        const footballManager = this.map.get(id)
        if(!footballManager){
            throw new Error("footballManager not found")
        }
        return footballManager
    }

    delete(id: string): string{
        const result = this.map.delete(id)
        if (result){
            return "Manager_deleted"
        }
        else {
        return "Manager_not_found"
        }
    }
}