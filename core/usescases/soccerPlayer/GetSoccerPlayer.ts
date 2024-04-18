import { SoccerPlayer } from "../../entities/SoccerPlayer"
import { SoccerPlayerRepository } from "../../repositories/SoccerPlayersRepository"
import { Usecases } from "../Usecase"


type GetSoccerPlayerInput = {
    id: string
}

export class GetSoccerPlayer implements Usecases<GetSoccerPlayerInput, Promise<SoccerPlayer>>{
    constructor(
        private readonly _soccerPlayerRepository: SoccerPlayerRepository
    ){}

    async execute(input: GetSoccerPlayerInput): Promise<SoccerPlayer> {
        const soccerPlayer = await this._soccerPlayerRepository.getById(input.id)
        return soccerPlayer
    }
}