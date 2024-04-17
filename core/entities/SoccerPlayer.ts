import {v4} from "uuid"

export enum Position{
    STRIKER = "striker",
    DEFENDER = "defender",
    GOALKEEPER = "goalkeeper"
}

type SoccerPlayerProperties = {
    id: string
    name: string
    age: number
    nationality: string
    club: string
    goodOrNot: boolean,
    position: Position
}

export class SoccerPlayer {
    props: SoccerPlayerProperties
    constructor(soccerPlayerProperties: SoccerPlayerProperties) {
        this.props = soccerPlayerProperties
    }

    static create(props: {name: string, age: number, nationality: string, club: string, goodOrNot: boolean, position: Position}): SoccerPlayer{
        const soccerPlayer = new SoccerPlayer({
            id: v4(),
            name: props.name,
            age: props.age,
            nationality: props.nationality,
            club: props.club,
            goodOrNot: props.goodOrNot,
            position: props.position
    })
        return soccerPlayer
    }

    updateProfile(newName: string, newAge:number, newNationality: string, newClub: string, goodOrNot: boolean, position: Position): SoccerPlayer{
        this.props.name = newName,
        this.props.age = newAge,
        this.props.nationality = newNationality,
        this.props.club = newClub,
        this.props.goodOrNot = goodOrNot,
        this.props.position = position
        return this
    }
}