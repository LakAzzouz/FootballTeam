export class Email {
    value: string

    constructor(value: string){
        this.value = value
    }

    static gmailChecked(value: string): string{
        const arr = value.split("@")
        const result = `@${arr[arr.length -1]}`

        if( result !== "@gmail.com"){
            throw new Error("The mail was finish by '@gmail.com'")
        }
        return value
    }
}