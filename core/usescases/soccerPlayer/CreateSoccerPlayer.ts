import { Nationality, Position, SoccerPlayer } from "../../entities/SoccerPlayer"
import { SoccerPlayerRepository } from "../../repositories/SoccerPlayersRepository"
import { Nation } from "../../valueObjects/Nation"
import { Age } from "../../valueObjects/age"
import { Usecases } from "../Usecase"
import { Club } from "../../valueObjects/Club"
import { GoodOrNot } from "../../valueObjects/GoodOrNot"

type CreateSoccerPlayerInput = {
    id: string,
    name: string,
    age: number,
    nationality: Nationality, 
    club: string,
    goodOrNot: string,
    position: Position
}

export class CreateSoccerPlayer implements Usecases<CreateSoccerPlayerInput, Promise<SoccerPlayer>> {
    constructor (
        private readonly _soccerPlayerrepository: SoccerPlayerRepository
    ){}

    async execute(input: CreateSoccerPlayerInput): Promise<SoccerPlayer>{
        
        const ageChecked = new Age(input.age).value
        const nationalityChecked = new Nation(input.nationality).value
        const clubChecked = Club.isAuthorized(input.club)
        const goodOrNot = GoodOrNot.isValid(input.goodOrNot)

        const soccerPlayer = SoccerPlayer.create({
            name: input.name,
            age: ageChecked,
            nationality: nationalityChecked, 
            club: clubChecked,
            goodOrNot: goodOrNot,
            position: input.position
        })
    
        this._soccerPlayerrepository.save(soccerPlayer)

        return soccerPlayer
    }
}