import { FootballTeam } from "../../entities/FootballTeam"
import { FootballTeamRepository } from "../../repositories/FootballTeamRepository"
import { SoccerPlayerRepository } from "../../repositories/SoccerPlayersRepository"
import { Usecases } from "../Usecase"

type CreateFootballTeamInput = {
    id: string
    name: string,
    manager: string,
    soccerPlayersIds: string[]
}

export class CreateFootballTeam implements Usecases<CreateFootballTeamInput, Promise<FootballTeam>>{
    constructor(
        private readonly _footballTeamRepository: FootballTeamRepository,
        private readonly _soccerPlayersRepository: SoccerPlayerRepository
    ){}

    async execute(input: CreateFootballTeamInput): Promise<FootballTeam> {

    const soccerPlayers = await this._soccerPlayersRepository.getByIds(input.soccerPlayersIds);

    const footballTeam = FootballTeam.create({
        name: input.name,
        manager: input.manager,
        soccerPlayers: soccerPlayers
    })

    this._footballTeamRepository.save(footballTeam)

    return footballTeam
    }
}