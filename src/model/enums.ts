import { InboundTicketEntity } from '../entity/InboundTicketEntity';

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
  YARD_ID = 'yardId',
  QB_CREDENTIALS = 'qbCredentials',
  NEW_INBOUND_TICKETS = 'newInboundTickets',
  INBOUND_TICKET = 'inboundTicket',
  SYNCED_IBT_IDS = 'syncedIbtIds',
  NOT_SYNCED_IBTS = 'notSyncedIBTs',
  PROCESS_HAS_ERRORS = 'processHasErrors'
}

export interface QBProccessVars {
  newInboundTickets: InboundTicketEntity[],
  inboundTicket: InboundTicketEntity,
  syncedIbtIds: string[],
  notSyncedIbts: InboundTicketEntity[],
  processHasErrors: boolean
}

export enum BPM_ERR_CODE {
  SYNC_FAIL_ERROR = 'SYNC_FAIL_ERROR',
  QB_COMMUNICATION_ERROR = 'QB_COMMUNICATION_ERROR'
}

export enum MSG {
  SYNC_YARD_MSG = 'SYNC_YARD_MSG'
}
