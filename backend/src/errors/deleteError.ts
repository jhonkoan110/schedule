// Ошибка "Ещё есть связанные сущности"

export class DeleteError extends Error {
    private _status: number;

    constructor(status: number, message: string) {
        super(message);
        this._status = status;
        this.name = 'DeleteError';
    }

    public get status() {
        return this._status;
    }
}
