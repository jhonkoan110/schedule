// Ошибка "Ещё есть связанные сущности"

import CustomError from './CustomError';

export class DeleteError extends CustomError {
    constructor(public status: number, public message: string) {
        super();
    }
}
