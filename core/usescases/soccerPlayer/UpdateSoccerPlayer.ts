import { Nationality, Position, SoccerPlayer } from "../../entities/SoccerPlayer"
import { SoccerPlayerRepository } from "../../repositories/SoccerPlayersRepository"
import { Usecases } from "../Usecase"

type UpdateSoccerPlayerInput = {
    id: string
    name: string,
    age: number,
    nationality: Nationality,
    club: string,
    goodOrNot: string,
    position: Position
}

export class UpdateSoccerPlayer implements Usecases<UpdateSoccerPlayerInput, Promise<SoccerPlayer>>{
    constructor(
        private readonly _soccerPlayerRepository: SoccerPlayerRepository
    ){}

        async execute(input: UpdateSoccerPlayerInput): Promise<SoccerPlayer> {
            const soccerPlayer = await this._soccerPlayerRepository.getById(input.id)

            const newProfile = soccerPlayer.updateProfile(input.name, input.age, input.nationality, input.club, input.goodOrNot, input.position)
        
            this._soccerPlayerRepository.save(newProfile)

            return soccerPlayer
        }
}