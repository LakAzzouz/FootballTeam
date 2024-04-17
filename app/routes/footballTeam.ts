import express, {Request, Response} from "express";
import {v4} from "uuid";
import {InMemoryFootballTeamRepository} from "../../adapters/repositories/inMemoryFootballTeamRepository";
import { FootballTeam } from "../../core/entities/FootballTeam";
import { InMemorySoccerPlayerRepository } from "../../adapters/repositories/inMemorySoccerPlayerRepository";
import { mapSoccerPlayer } from "./soccerPlayer";


export const footballTeamRouter = express.Router();
const map = new Map <string, FootballTeam>();
const footballTeamRepository = new InMemoryFootballTeamRepository(map);
const soccerPlayersRepository = new InMemorySoccerPlayerRepository(mapSoccerPlayer);

//Ce qui compose un api Rest => verbe / url / statut

footballTeamRouter.post("/football_team/soccerPlayer", async (req: Request, res: Response) =>{ 
    try{
    const id = v4();
    const body = req.body;
    // récupérer un tableau de soccerPlayer ID dans le body
    const {name, manager, soccerPlayersIds} = body;

    // récup dans la map les soccersPlayerById
    const soccerPlayers = await soccerPlayersRepository.getByIds(soccerPlayersIds);

    const footballTeam = FootballTeam.create({
        name: name,
        manager: manager,
        soccerPlayers: soccerPlayers // donner les soccerPlayer récupérer 
    })

    footballTeamRepository.save(footballTeam)
    return res.status(201).send(footballTeam.props)
} catch(error){
if(error instanceof Error){
    return res.status(400).send(error.message)
}}})

footballTeamRouter.get("/football_team/:id", (req: Request, res: Response) =>{
    try{
    const id = req.params.id

    const footballTeam = footballTeamRepository.getById(id)

    return res.status(200).send(footballTeam)
} catch(error: any){
    return res.status(400).send(error.message)
}})

footballTeamRouter.delete("/football_team/:id/soccerPlayer/:soccerPlayerId", (req: Request, res: Response) =>{
    try{
    const id = req.params.id
    const playerToDeleteId = req.params.soccerPlayerId

    const footballTeam = footballTeamRepository.getById(id)

    // enleve l'id du joueur .filter
    const footballTeamUpdated = footballTeam.deletePlayer(playerToDeleteId)

    // save par dessus
    footballTeamRepository.save(footballTeamUpdated)
    
    const result = {
        result: "Joueur supprimé",
        footballTeam: footballTeamUpdated.props
    }
    return res.status(200).send(result)
}catch(error: any){
    return res.status(400).send(error.message)
}})

footballTeamRouter.patch("/football_team/:id/manager", (req: Request, res: Response)=> {
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
}})
