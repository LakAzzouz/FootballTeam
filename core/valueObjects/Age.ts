export class Age {
    value: number

    constructor(value: number) {
        this.value = this.isValid(value)
    }

    isValid(age: number): number {
        if(age < 18){
            throw new Error("This age is incorrect")
        }
        return age
    }
}