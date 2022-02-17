import {Client} from "camunda-external-task-client-js";


export enum TOPIC {
    GET_NOT_SYNCED_ENTITIES = 'GET_NOT_SYNCED_ENTITIES',
    SET_OAUTH_FOR_ORG = 'SET_OAUTH_FOR_ORG',
    PUSH_NEW_CUSTOMERS = 'PUSH_NEW_CUSTOMERS',
    PUSH_NEW_INVOICES = 'PUSH_NEW_INVOICES',
    MARK_AS_SYNCED = 'MARK_AS_SYNCED',
    START_PROCESS_FOR_YARD = 'START_PROCESS_FOR_YARD',
}

export interface Listener<T> {
    listen(client: Client, topic: T): void;
}
