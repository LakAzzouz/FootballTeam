import { SoccerPlayer } from "../entities/SoccerPlayer"

export interface SoccerPlayerRepository {
    save(soccerPlayer: SoccerPlayer): Promise<void>    

    getById(id: string): Promise<SoccerPlayer>

    deleteById(id: string): Promise<void>
       
    getByIds(ids: string[]): Promise<SoccerPlayer[]>

}