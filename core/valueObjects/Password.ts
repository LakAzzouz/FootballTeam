export class Password {
    value: string

    constructor(value: string){
        this.value = value
    }

    static passwordLenght(value: string): string{
        if(value.length > 10){
            throw new Error("The password is too long")
        }
        return value
    }
}