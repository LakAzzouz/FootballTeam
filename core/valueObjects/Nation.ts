import { Nationality } from "../entities/SoccerPlayer"

export class Nation {
    value: Nationality

    constructor(value: Nationality){
        this.value = this.isValid(value)
    }
        isValid(nationality: Nationality): Nationality{
            if(nationality != Nationality.ENG){
                throw new Error("The nationality is incorrect")
            }
        return nationality
    }


}