import { SoccerPlayer } from "../../entities/SoccerPlayer"
import { SoccerPlayerRepository } from "../../repositories/SoccerPlayersRepository"
import { Usecases } from "../Usecase"

type DeleteSoccerPlayerInput = {
    id: string
}

export class DeleteSoccerPlayer implements Usecases<DeleteSoccerPlayerInput, Promise<void>>{
    constructor(
        private readonly _soccerPlayerRepository: SoccerPlayerRepository
    ){}

    async execute(input: DeleteSoccerPlayerInput): Promise<void>{
        this._soccerPlayerRepository.deleteById(input.id)
        const result = {
            result: "Profile deleted"
        }
        return
    }
}
