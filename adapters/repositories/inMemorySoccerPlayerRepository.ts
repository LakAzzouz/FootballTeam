import {v4} from "uuid";
import { SoccerPlayer } from "../../core/entities/SoccerPlayer";
import { SoccerPlayerRepository } from "../../core/repositories/SoccerPlayersRepository";


export class InMemorySoccerPlayerRepository implements SoccerPlayerRepository{
    map: Map<string, SoccerPlayer>

    constructor(map: Map<string, SoccerPlayer>) {
        this.map = map
    }

    async save(soccerPlayer: SoccerPlayer): Promise<void>{
        await this.map.set(soccerPlayer.props.id, soccerPlayer)
        return 
    }

    async getById(id: string): Promise<SoccerPlayer>{
        const soccerPlayer = this.map.get(id)
        if(!soccerPlayer){
            throw new Error("SoccerPlayer not found !")
        }
        return soccerPlayer
    }

    async deleteById(id: string): Promise<void>{
        const playerDeleted = this.map.delete(id)
        if(!playerDeleted){
            throw new Error ("SoccerPlayer not found !")
        }
        return 
    }

    async getByIds(ids: string[]): Promise<SoccerPlayer[]>{
        // créer une variable (let) 
        let soccerPlayers: SoccerPlayer[] = []
        //faire une boucle for pour prendre chaque id de soccerplayer & rajouter le soccerplayer
        for(const id of ids) {
            const soccerPlayer = this.map.get(id)
            if(!soccerPlayer){
                throw new Error("SoccerPlayer not found !")
            }
            soccerPlayers.push(soccerPlayer)
        }
        //renvoyer le tableau
        return soccerPlayers
    }
}