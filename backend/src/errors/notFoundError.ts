import CustomError from './CustomError';

export class NotFoundError extends CustomError {
    constructor(public status: number, public message: string) {
        super();
    }
}
