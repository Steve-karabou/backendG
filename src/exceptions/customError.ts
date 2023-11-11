export default class CustomError extends Error {
    message!: string;
    status!: Number;

    constructor(message: string, status: number = 500) {
       super(message);
       this.message = message;
       this.status = status; 
    }


}