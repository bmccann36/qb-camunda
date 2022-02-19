

export enum TOPIC {
    FIND_NEW_DATA = 'FIND_NEW_DATA',
    SET_OAUTH_FOR_ORG = 'SET_OAUTH_FOR_ORG',
    PUSH_NEW_CUSTOMERS = 'PUSH_NEW_CUSTOMERS',
    PUSH_NEW_IBT = 'PUSH_NEW_IBT',
    MARK_AS_SYNCED = 'MARK_AS_SYNCED',
    START_PROCESS_FOR_YARD = 'START_PROCESS_FOR_YARD',
}
// camunda rest api has unpredictable behavior with "_" character so these are named with camelCase
export enum PROCESS_VAR {
    NEW_INBOUND_TICKETS = 'newInboundTickets'
}

export enum MSG {
    SYNC_YARD_MSG = 'SYNC_YARD_MSG'
}
