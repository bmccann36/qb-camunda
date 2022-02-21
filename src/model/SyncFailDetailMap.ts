

export interface SyncFailDetails {
  id: string;
  errorDetails: object;
  errorMessage: string;
  stackTrace?: object;
}

export interface SyncFailDetailMap {
  inboundTickets: SyncFailDetails[]
}
