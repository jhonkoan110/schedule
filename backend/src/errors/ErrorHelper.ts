import * as express from 'express';

export class ErrorHelper {
    public static deleteHandle(res: express.Response, error: Error) {
        if (error.name === 'NotFoundError') {
            res.status(404).json(error.message);
        } else if (error.name === 'DeleteError') {
            res.status(400).json(error.message);
        } else {
            res.status(500).json(error.message);
        }
    }

    public static notFoundHandle(res: express.Response, error: Error) {
        if (error.name === 'NotFoundError') {
            res.status(404).json(error.message);
        } else {
            res.status(500).json(error);
        }
    }

    public static accessHandle(res: express.Response, error: Error) {
        if (error.name === 'AccessError') {
            res.status(403).json(error.message);
        } else {
            res.status(500).json(error);
        }
    }
}
