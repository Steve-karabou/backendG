import CustomError from "./customError";

export default class ClientError extends CustomError {

    constructor(message: string) {
        super(message, 400)
    }
} 