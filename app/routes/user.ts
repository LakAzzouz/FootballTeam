import express, {Request, Response} from "express" 
import {v4} from "uuid"
import bcrypt from "bcrypt"
import {InMemoryUserRepository} from "../../adapters/repositories/inMemoryUserRepository"
import { User } from "../../core/entities/User"
import { CreateUser } from "../../core/usescases/users/CreateUser"
import { BCryptGateway } from "../../adapters/gateways/BCryptGateaway" 
import { SignIn } from "../../core/usescases/users/SignIn"
import { UpdateUser } from "../../core/usescases/users/UpdateUser"
import { DeleteUser } from "../../core/usescases/users/DeleteUser"
import { GetUsers } from "../../core/usescases/users/GetUsers"

export const router = express.Router()

const salt = 10 

const map = new Map<string, User>() 

const userRepository = new InMemoryUserRepository(map)
const cryptoGateway = new BCryptGateway()
const createUser = new CreateUser(cryptoGateway, userRepository)
const signIn = new SignIn(userRepository, cryptoGateway)
const updateUser = new UpdateUser(userRepository)
const deleteUser = new DeleteUser(userRepository)
const getUser = new GetUsers(userRepository)


router.post("/signup", async (req: Request, res: Response) => {
    try{
        const id = v4();
        const body = req.body;
        const {email, password} = body
   
        const user = await createUser.execute({
            id: id,
            email: email,
            password: password
        })

        const result = {
            id: user.id,
            email: user.email
        }

        return res.status(201).send(result)
    } catch (error){
        if(error instanceof Error)
            return res.status(400).send(error.message)
}})

router.post("/signin", async (req: Request, res: Response) => {
    try{
        const body = req.body
        const {email, password} = body

        const user = await signIn.execute({
            email: email,
            password: password
        })

        const result = {
            id: user.id,
            email: user.email
        }

        return res.status(200).send(result)
    } catch (error){
        if (error instanceof Error && error.message === "wrong_password"){
            return res.status(400).send(error.message)
        }
    return res.sendStatus(400)
}})

router.patch("/:id", async (req: Request, res: Response) => {
    try{
        const body = req.body;
        const newEmail: string = body.email;
        const id = req.params.id;

        const user = await updateUser.execute({
            id: id,
            email: newEmail
        })

        const result = {
            id: user.id,
            email: user.email
        }

        return res.status(200).send(result)
    }catch(error){
        if(error instanceof Error){
            res.status(400).send(error.message)
}}})

router.delete("/delete/:id", async (req: Request, res: Response) => {
    try{
        const id = req.params.id;

        const result = await deleteUser.execute({
            id: id
        })

        return res.status(200).send(result)
    }catch(error){
        if(error instanceof Error){
            res.status(400).send(error.message)
}}})

router.get("/users/:id", async (req: Request, res: Response) => {
    try{
        const id = req.params.id;
 
        const result = await getUser.execute({
            id: id,
        })

        return res.status(200).send(result)
}catch(error){
    if(error instanceof Error){
        res.status(400).send(error.message)
    }
}})