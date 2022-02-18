import {Client} from 'camunda-external-task-client-js';


export enum TOPIC {
    FIND_NEW_DATA = 'FIND_NEW_DATA',
    SET_OAUTH_FOR_ORG = 'SET_OAUTH_FOR_ORG',
    PUSH_NEW_CUSTOMERS = 'PUSH_NEW_CUSTOMERS',
    PUSH_NEW_PURCHASES = 'PUSH_NEW_PURCHASES',
    MARK_AS_SYNCED = 'MARK_AS_SYNCED',
    START_PROCESS_FOR_YARD = 'START_PROCESS_FOR_YARD',
}

export enum MSG {
    SYNC_YARD_MSG = 'SYNC_YARD_MSG'
}

export interface Listener<T> {
    listen(client: Client, topic: T): void;
}
