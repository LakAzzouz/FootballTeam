import { FootballTeam } from "../../entities/FootballTeam"
import { FootballTeamRepository } from "../../repositories/FootballTeamRepository"
import { Usecases } from "../Usecase"

type GetFootballTeamInput = {
    id: string
}

export class GetFootballTeam implements Usecases<GetFootballTeamInput, Promise<FootballTeam>>{
    constructor(
        private readonly _footballTeamRepository: FootballTeamRepository
    ){}

    async execute(input: GetFootballTeamInput): Promise<FootballTeam>{
        const footballTeam = this._footballTeamRepository.getById(input.id)
        return footballTeam
    }
}