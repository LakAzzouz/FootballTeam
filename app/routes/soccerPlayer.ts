import express, {Request, Response} from "express"
import {v4} from "uuid"


import {InMemorySoccerPlayerRepository} from "../../adapters/repositories/inMemorySoccerPlayerRepository"
import {SoccerPlayer} from "../../core/entities/SoccerPlayer"

export const soccerPlayerRouter = express.Router()

export const mapSoccerPlayer = new Map<string, SoccerPlayer>()
const soccerPlayerRepository = new InMemorySoccerPlayerRepository(mapSoccerPlayer)

soccerPlayerRouter.post("/soccer_player", (req: Request, res: Response) =>{
    try{
    const id = v4()
    const body = req.body
    const {name, age, nationality, club, goodOrNot, position} = body

    const soccerPlayer = SoccerPlayer.create({
        name: name,
        age: age,
        nationality: nationality, 
        club: club,
        goodOrNot: goodOrNot,
        position: position
    })

    soccerPlayerRepository.save(soccerPlayer)

    return res.status(201).send(soccerPlayer)
} catch (error){
    return res.status(400).send(error)
}
})

soccerPlayerRouter.post("/soccer_player", (req: Request, res: Response) =>{
    try{
    const id = v4()
    const body = req.body
    const {name, age, nationality, club, goodOrNot, position} = body

    const soccerPlayer = SoccerPlayer.create({
        name: name,
        age: age,
        nationality: nationality,
        club: club,
        goodOrNot: goodOrNot,
        position: position})

    soccerPlayerRepository.save(soccerPlayer)

    return res.status(201).send(soccerPlayer)
} catch (error){
    return res.status(400).send(error)
}
})

soccerPlayerRouter.get("/soccer_player/:id", (req: Request, res: Response) =>{
    try{
    const id = req.params.id

    const soccerPlayer = soccerPlayerRepository.getById(id)

    return res.status(200).send(soccerPlayer)
} catch(error){
    if(error instanceof Error){
        return res.status(400).send(error.message)
    }}})

soccerPlayerRouter.patch("/soccer_player/:id", async (req: Request, res: Response) =>{
    try{
    const id = req.params.id
    const body = req.body
    const {name, age, nationality, club, goodOrNot, position} = body

    const soccerPlayer = await soccerPlayerRepository.getById(id)

    const newProfile = soccerPlayer.updateProfile(name, age, nationality, club, goodOrNot, position)

    soccerPlayerRepository.save(newProfile)

    return res.status(201).send(newProfile)
} catch(error){
    return res.status(400).send(error)
}})

soccerPlayerRouter.delete("/soccer_player/:id", (req: Request, res: Response) =>{
    try{
        const id = req.params.id
        
        soccerPlayerRepository.deleteById(id)
        const result = {
            result: "Profile deleted"
        }
        return res.status(200).send(result)
} catch(error){
    if(error instanceof Error){
        const result = {
            error: error.message
        }
        return res.status(400).send(result)
    }}})