import {v4} from "uuid"

export enum Position{
    STRIKER = "striker",
    DEFENDER = "defender",
    GOALKEEPER = "goalkeeper"
}

export enum Nationality {
    FRA = "Français",
    ENG = "Anglais",
    POR = "Portugais"
}

type SoccerPlayerProperties = {
    id: string
    name: string
    age: number
    nationality: Nationality
    club: string
    goodOrNot: string,
    position: Position
}

export class SoccerPlayer {
    props: SoccerPlayerProperties
    constructor(soccerPlayerProperties: SoccerPlayerProperties) {
        this.props = soccerPlayerProperties
    }

    static create(props: {name: string, age: number, nationality: Nationality, club: string, goodOrNot: string, position: Position}): SoccerPlayer{
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

    updateProfile(newName: string, newAge:number, newNationality: Nationality, newClub: string, goodOrNot: string, position: Position): SoccerPlayer{
        this.props.name = newName,
        this.props.age = newAge,
        this.props.nationality = newNationality,
        this.props.club = newClub,
        this.props.goodOrNot = goodOrNot,
        this.props.position = position
        return this
    }
}