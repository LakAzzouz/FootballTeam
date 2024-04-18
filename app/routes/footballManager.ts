import express, {Request, Response} from "express"
import {v4} from "uuid"

import {InMemoryFootballManagertRepository} from "../../adapters/repositories/inMemoryFootballManagerRepository"
import { FootballManager } from "../../core/entities/FootballManager"

export const footballManagerRouter = express.Router()

const map = new Map<string, FootballManager>() 
const managerRepository = new InMemoryFootballManagertRepository(map)

/*footballManagerRouter.post("/football_manager", (req: Request, res: Response) => {
    try{
    const id = v4();
    const body = req.body;
    const {name, nationality, age, birthDay} = body

    const footballManager = FootballManager.create(id, name, age, new Date(birthDay), nationality)

    managerRepository.save(footballManager)
    
    return res.status(201).send(footballManager)
}   catch (error){
    return res.status(400).send(error)
}})

footballManagerRouter.patch("/football_manager/:id", (req: Request, res: Response) => {
    try{
    const id = req.params.id;
    const body = req.body;
    const {name, nationality, age, birthDay} = body

    const footballManager = managerRepository.getById(id)

    const FootballManagerUpdated = footballManager.updateProfile(name, age, new Date(birthDay), nationality)

    managerRepository.save(FootballManagerUpdated)

    return res.status(201).send(FootballManagerUpdated)
}   catch (error){
    return res.status(400).send(error)
}})

footballManagerRouter.get("/football_manager/:id", (req: Request, res: Response) => {
    try {
    const id = req.params.id;

    const footballManager = managerRepository.getById(id)

    return res.status(200).send(footballManager)
}   catch (error){
    return res.status(400).send(error)
}})

footballManagerRouter.delete("/football_manager/:id", (req: Request, res: Response) => {
    try{
    const id = req.params.id;

    const result = managerRepository.delete(id)

    const deleteResult= {
        result: result
    }

    return res.status(200).send(deleteResult)
}   catch (error){
    return res.status(400).send(error)
}})*/