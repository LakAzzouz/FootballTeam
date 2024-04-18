import { Manager } from "../valueObjects/Manager"

export class FootballManager {
    id: string
    name: string
    age: number
    birthDay: Date
    nationality: string

    constructor(id: string, name: string, age: number, birthDay: Date, nationality: string) {
        this.id = id
        this.name = name
        this.age = age
        this.birthDay = birthDay
        this.nationality = nationality
    }

    static create(id: string, name: string, age: number, birthDay: Date, nationality: string): FootballManager{
        const footballManager = new FootballManager(
            id,
            Manager.pepOrLuis(name),
            age,
            birthDay,
            nationality
        )
        return footballManager
    }

    updateProfile(newName: string, newAge: number, newBirthDay: Date, newNationality: string): FootballManager {
        this.name = newName
        this.age = newAge
        this.birthDay = newBirthDay
        this.nationality = newNationality
        return this
    }
}