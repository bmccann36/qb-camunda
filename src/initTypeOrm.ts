import { createConnection } from 'typeorm';

const host: string = process.env.TYPEORM_HOST ? process.env.TYPEORM_HOST : 'localhost';
const port: number = process.env.TYPEORM_PORT ? Number(process.env.TYPEORM_PORT) : 5432;
const database: string = process.env.TYPEORM_DATABASE ? process.env.TYPEORM_DATABASE : 'postgres';
const username: string = process.env.TYPEORM_USERNAME ? process.env.TYPEORM_USERNAME : 'postgres';
const password: string = process.env.TYPEORM_PASSWORD ? process.env.TYPEORM_PASSWORD : 'example';

export default function () {
    // entity path is resolved dynamically so ts-node or node can be used
    const entities = [
        `${__dirname}/entity/*.js`,
        `${__dirname}/entity/*.ts`
    ];
    return createConnection({
        type: 'postgres',
        host,
        port,
        username,
        password,
        database,
        entities
    });
}
