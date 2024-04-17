import {v4} from "uuid"
import { Position, SoccerPlayer } from "./SoccerPlayer"

type FootballTeamProperties = {
    id: string
    name: string
    manager: string
    soccerPlayers: SoccerPlayer[]
    createdAt: Date
    updatedAt: Date
}

export class FootballTeam {
    props: FootballTeamProperties
    constructor(footballTeamProperties: FootballTeamProperties) {
        this.props = footballTeamProperties
    }

    static create(props: {name: string, manager: string, soccerPlayers: SoccerPlayer[]}): FootballTeam {
        const footballTeam = new FootballTeam(
            {
            id: v4(),
            name: props.name,
            manager: props.manager,
            soccerPlayers: props.soccerPlayers,
            createdAt: new Date(),
            updatedAt: new Date()
            }
        )
        return footballTeam
    }

    updateManager(newManager: string): FootballTeam{
        this.props.manager = newManager
        return this
    }

    deletePlayer(playerId: string): FootballTeam{
        const soccerPlayers = this.props.soccerPlayers
        const soccerPlayersUpdated = soccerPlayers.filter(soccerPlayer => soccerPlayer.props.id !== playerId)
        this.props.soccerPlayers = soccerPlayersUpdated
        return this
    }

    selectPosition(position: string): SoccerPlayer[]{
        const soccerPlayers = this.props.soccerPlayers
        const playerSelected = soccerPlayers.filter(soccerPlayer => soccerPlayer.props.position === position)
        return playerSelected
    }

    selectStrikers(): SoccerPlayer[]{
        const soccerPlayers = this.props.soccerPlayers
        const playerSelected = soccerPlayers.filter(soccerPlayer => soccerPlayer.props.position === Position.STRIKER)
        return playerSelected
    }
}