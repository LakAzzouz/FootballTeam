export class Manager {
    value: string

    constructor(value: string){
        this.value = value
    }

    static pepOrLuis(managerName: string): string{
        const validManagerNames = ["Guardiola", "Enrique"]
        if(!validManagerNames.includes(managerName)){
        throw new Error("The manager is invalid")
        }
        return managerName
    }
}