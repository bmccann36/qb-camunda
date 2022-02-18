import dotenv from 'dotenv'
dotenv.config()
console.log(process.env.TYPEORM_ENTITIES)
import {createConnection, Connection} from 'typeorm';


import NewDataService from './NewDataService';


let target: NewDataService;
let conn: Connection;

beforeAll(async () => {
    conn = await createConnection();
    target = new NewDataService(conn);
})

describe('#NewDataService', () => {
    it('gets new data to be synced from DB', async () => {
        await target.getNewData()
    })
})
