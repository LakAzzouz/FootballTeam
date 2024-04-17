import {v4} from "uuid"
import { FootballTeam } from "../../core/entities/FootballTeam"
import { soccerPlayerRouter } from "../../app/routes/soccerPlayer"

export class InMemoryFootballTeamRepository {
    map: Map<String, FootballTeam>

    constructor(map: Map<string, FootballTeam>) {
        this.map = map
    }

    save(footballTeam: FootballTeam): FootballTeam{
        this.map.set(footballTeam.props.id, footballTeam)
        return footballTeam
    }

    getById(id: string): FootballTeam{
        const footballTeam = this.map.get(id)
        if(!footballTeam){
            throw new Error("footballTeam not found !")
        }
        return footballTeam
    }

    deletedById(id: string) {
        this.map.delete(id)
        return
    }
}