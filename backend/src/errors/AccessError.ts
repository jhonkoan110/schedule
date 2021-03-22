export class AccessError extends Error {
    private _status: number;

    constructor(status: number, message: string) {
        super(message);
        this._status = status;
        this.name = 'AccessError';
    }

    public get status() {
        return this._status;
    }
}
