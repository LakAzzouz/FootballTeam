import express, {Request, Response} from "express";
import {v4} from "uuid";
import {InMemoryFootballTeamRepository} from "../../adapters/repositories/inMemoryFootballTeamRepository";
import { FootballTeam } from "../../core/entities/FootballTeam";
import { InMemorySoccerPlayerRepository } from "../../adapters/repositories/inMemorySoccerPlayerRepository";
import { mapSoccerPlayer } from "./soccerPlayer";
import { CreateFootballTeam } from "../../core/usescases/footballTeam/CreateFootballTeam";
import { GetFootballTeam } from "../../core/usescases/footballTeam/GetFootballTeam";
import { DeleteFootballTeam } from "../../core/usescases/footballTeam/DeleteFootballTeam";

export const footballTeamRouter = express.Router();
const map = new Map <string, FootballTeam>();
const footballTeamRepository = new InMemoryFootballTeamRepository(map);
const soccerPlayersRepository = new InMemorySoccerPlayerRepository(mapSoccerPlayer);
const createFootballTeam = new CreateFootballTeam(footballTeamRepository, soccerPlayersRepository)
const getFootballTeam = new GetFootballTeam(footballTeamRepository)
const deletedFootballTeam = new DeleteFootballTeam(footballTeamRepository)

//Ce qui compose un api Rest => verbe / url / statut

footballTeamRouter.post("/football_team/soccerPlayer", async (req: Request, res: Response) =>{ 
    try{
    const id = v4();
    const body = req.body;
    const {name, manager, soccerPlayersIds} = body;

    const footballTeam = await createFootballTeam.execute({
        id: id,
        name: name,
        manager: manager,
        soccerPlayersIds: soccerPlayersIds
    })

    return res.status(201).send(footballTeam.props)
} catch(error){
if(error instanceof Error){
    return res.status(400).send(error.message)
}}})

footballTeamRouter.get("/football_team/:id", async (req: Request, res: Response) =>{
    try{
    const id = req.params.id

    const footballTeam = await getFootballTeam.execute({
        id: id
    })

    return res.status(200).send(footballTeam.props)
} catch(error: any){
    return res.status(400).send(error.message)
}})

footballTeamRouter.delete("/football_team/:id/soccerPlayer/:soccerPlayerId", (req: Request, res: Response) =>{
    try{
    const id = req.params.id
    const playerToDeleteId = req.params.soccerPlayerId

    deletedFootballTeam.execute({
        footballTeamId: id,
        playerId: playerToDeleteId
    })

    const result = {
        playerIdDeleted : `This player with id :${playerToDeleteId} is deleted`
    }

    return res.status(200).send(result)
}catch(error: any){
    return res.status(400).send(error.message)
}})

/*footballTeamRouter.patch("/football_team/:id/manager", (req: Request, res: Response)=> {
    try{
    const id = req.params.id
    const body = req.body
    const {manager} = body

    const footballTeam = footballTeamRepository.getById(id)
    console.log(footballTeam)

    const updateProfile = footballTeam.updateManager(manager)
    console.log(footballTeam)

    footballTeamRepository.save(updateProfile)

    return res.status(201).send(footballTeam)
}catch(error: any){
    return res.status(400).send(error.message)
}})

footballTeamRouter.get("/football_team/:id/selectPlayerByPosition", (req: Request, res: Response)=> {
    try{
    const id = req.params.id
    const position = req.body.position

    const footballTeam = footballTeamRepository.getById(id)

    const soccerPlayersSelected = footballTeam.selectPosition(position)
    const soccerPlayersFiltered = soccerPlayersSelected.map(soccerPlayer => soccerPlayer.props)

    return res.status(200).send(soccerPlayersFiltered)

}catch(error: any){
    return res.status(400).send(error.message)
}})

footballTeamRouter.get("/football_team/:id/selectPlayerStriker", (req: Request, res: Response)=> {
    try{
    const id = req.params.id

    const footballTeam = footballTeamRepository.getById(id)

    const soccerPlayersSelected = footballTeam.selectStrikers()
    const soccerPlayersFiltered = soccerPlayersSelected.map(soccerPlayer => soccerPlayer.props)

    return res.status(200).send(soccerPlayersFiltered)

}catch(error: any){
    return res.status(400).send(error.message)
}})*/