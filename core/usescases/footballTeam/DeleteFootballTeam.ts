import { FootballTeam } from "../../entities/FootballTeam"
import { FootballTeamRepository } from "../../repositories/FootballTeamRepository"
import { Usecases } from "../Usecase"

type DeleteFootballTeamInput = {
    footballTeamId: string
    playerId: string
}

export class DeleteFootballTeam implements Usecases<DeleteFootballTeamInput, Promise<void>>{
    constructor(
        private readonly _footballTeamRepository: FootballTeamRepository
    ){}

    async execute(input: DeleteFootballTeamInput): Promise<void>{
        const footballTeam = this._footballTeamRepository.getById(input.footballTeamId)

        const footballTeamUpdated = (await footballTeam).deletePlayer(input.playerId)

        this._footballTeamRepository.save(footballTeamUpdated)
        return 
    }
}