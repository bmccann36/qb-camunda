import { InboundTicketEntity } from '../entity/InboundTicketEntity';

export interface SyncFailDetails<T> {
  failedEntity: T;
  errorDetails: object;
  errorMessage: string;
  stackTrace?: object;
}

/**
 * each of these keys can be attached as a process variable to the
 * Camunda process instance. SyncFailDetailMap is not a single process variable,
 * rather each key within it may be a process variable on the process instance
 */
export interface SyncFailDetailMap {
  notSyncedIBTs: SyncFailDetails<InboundTicketEntity>[];
  notSyncedCustomers: SyncFailDetails<any>[]; // todo type this when there is a customer type
}

/**
 * this represents the KEY:VALUE pair of a process variables that will
 * be attached to the Camunda process instance
 * i.e. syncFailedIBTs = [failedEntity1, failedEntity2...]
 *      syncFailedVendors = [failedEntity1, failedEntity2...]
 */
export type FailedEntityProcessVar<T> =
  Map<keyof SyncFailDetailMap, SyncFailDetails<T>[]>
