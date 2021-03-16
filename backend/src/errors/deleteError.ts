// Ошибка "Ещё есть связанные сущности"
export class DeleteError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'DeleteError';
    }
}
