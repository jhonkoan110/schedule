export class NotFoundError extends Error {
    private _status: number;

    constructor(status: number, message: string) {
        super(message);
        this._status = status;
        this.name = 'NotFoundError';
    }

    public get status() {
        return this._status;
    }
}
