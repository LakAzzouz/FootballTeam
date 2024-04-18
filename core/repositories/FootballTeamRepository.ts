import {FootballTeam} from "../entities/FootballTeam"

export interface FootballTeamRepository {
    save(footballTeam: FootballTeam): Promise<FootballTeam>

    getById(id: string): Promise<FootballTeam>

    deletedById(id: string): Promise<void>
}