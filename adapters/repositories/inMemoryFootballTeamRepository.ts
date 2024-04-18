import { FootballTeam } from "../../core/entities/FootballTeam"
import { FootballTeamRepository } from "../../core/repositories/FootballTeamRepository"

export class InMemoryFootballTeamRepository implements FootballTeamRepository{
    map: Map<String, FootballTeam>

    constructor(map: Map<string, FootballTeam>) {
        this.map = map
    }

    async save(footballTeam: FootballTeam): Promise<FootballTeam>{
        await this.map.set(footballTeam.props.id, footballTeam)
        return footballTeam
    }

    async getById(id: string): Promise<FootballTeam>{
        const footballTeam = this.map.get(id)
        if(!footballTeam){
            throw new Error("footballTeam not found !")
        }
        return footballTeam
    }

    async deletedById(id: string) {
        this.map.delete(id)
        return
    }
}