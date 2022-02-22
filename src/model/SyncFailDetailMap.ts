
export interface SyncFailDetails<T> {
  failedEntity: T;
  errorDetails: object;
  errorMessage: string;
  stackTrace?: object;
}




