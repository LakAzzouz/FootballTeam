export class Club {
    value: string

    constructor(value: string){
    this.value = value
    }

    static isAuthorized(value: string): string{
        if(value !== "Madrid"){
            throw new Error("False club")
        }
        return value
    } 
}