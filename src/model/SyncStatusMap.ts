/**
 * each property corresponds to an entity that needs syncing
 * each value is a string array or ids
 * this interface may be used to track a batch of successful or a batch of not successful sync transactions
 * it isn't meant to track both statuses at once
 */
export interface SyncStatusMap {
  inboundTickets: string[];
}
