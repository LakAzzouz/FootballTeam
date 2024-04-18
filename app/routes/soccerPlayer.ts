import express, {Request, Response} from "express"
import {v4} from "uuid"


import {InMemorySoccerPlayerRepository} from "../../adapters/repositories/inMemorySoccerPlayerRepository"
import {SoccerPlayer} from "../../core/entities/SoccerPlayer"
import { CreateSoccerPlayer } from "../../core/usescases/soccerPlayer/CreateSoccerPlayer"
import { GetSoccerPlayer } from "../../core/usescases/soccerPlayer/GetSoccerPlayer"
import { UpdateSoccerPlayer } from "../../core/usescases/soccerPlayer/UpdateSoccerPlayer"
import { DeleteSoccerPlayer } from "../../core/usescases/soccerPlayer/DeleteSoccerPlayer"

export const soccerPlayerRouter = express.Router()

export const mapSoccerPlayer = new Map<string, SoccerPlayer>()
const soccerPlayerRepository = new InMemorySoccerPlayerRepository(mapSoccerPlayer)
const createSoccerPlayer = new CreateSoccerPlayer(soccerPlayerRepository)
const getSoccerPlayer = new GetSoccerPlayer(soccerPlayerRepository)
const updateSoccerPlayer = new UpdateSoccerPlayer(soccerPlayerRepository)
const deletedSoccerPlayer = new DeleteSoccerPlayer(soccerPlayerRepository)

soccerPlayerRouter.post("/soccer_player", async (req: Request, res: Response) =>{
    try{
        const id = v4()
        const body = req.body
        const {name, age, nationality, club, goodOrNot, position} = body

        const soccerPlayer = await createSoccerPlayer.execute({
            id: id,
            name: name,
            age: age,
            nationality: nationality,
            club: club,
            goodOrNot: goodOrNot,
            position: position
        })

    return res.status(201).send(soccerPlayer.props)
} catch (error){
    if(error instanceof Error)
    return res.status(400).send(error.message)
}})

soccerPlayerRouter.post("/soccer_player", async (req: Request, res: Response) =>{
    try{
    const id = v4()
    const body = req.body
    const {name, age, nationality, club, goodOrNot, position} = body

    const soccerPlayer = await createSoccerPlayer.execute({
        id: id,
        name: name,
        age: age,
        nationality: nationality,
        club: club,
        goodOrNot: goodOrNot,
        position: position
    })

    return res.status(201).send(soccerPlayer.props)
} catch (error){
    return res.status(400).send(error)
}
})

soccerPlayerRouter.get("/soccer_player/:id", async (req: Request, res: Response) =>{
    try{
        const id = req.params.id

        const soccerPlayer = await getSoccerPlayer.execute({
            id: id
        })

        return res.status(200).send(soccerPlayer.props)
} catch(error){
    if(error instanceof Error){
        return res.status(400).send(error.message)
    }}})

soccerPlayerRouter.patch("/soccer_player/:id", async (req: Request, res: Response) =>{
    try{
        const id = req.params.id
        const body = req.body
        const {name, age, nationality, club, goodOrNot, position} = body

        const soccerPlayer = await updateSoccerPlayer.execute({
            id: id,
            name: name,
            age: age,
            nationality: nationality,
            club: club,
            goodOrNot: goodOrNot,
            position: position
        })

        return res.status(201).send(soccerPlayer.props)
} catch(error){
    return res.status(400).send(error)
}})

soccerPlayerRouter.delete("/soccer_player/:id", (req: Request, res: Response) =>{
    try{
        const id = req.params.id
        
        deletedSoccerPlayer.execute({
            id: id
        })

        const result = {
            userDeletedId : id
        }

        return res.status(200).send(result)
} catch(error){
    if(error instanceof Error){
        const result = {
            error: error.message
        }
        return res.status(400).send(result)
    }}})