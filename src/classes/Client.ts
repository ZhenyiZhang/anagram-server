import {Response} from 'express';

interface Client {
    id: number,
    res: Response
}

export default Client;