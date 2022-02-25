declare module 'intuit-oauth';

class OAuthClientSecret {
  realmId: string;
  access_token: string;
  expires_in: number;
  refresh_token: string;
  x_refresh_token_expires_in: number;
}
export interface QBToken {
  realmId: string;
  token_type: string;
  access_token: string;
  refresh_token: string;
  expires_in: number;
  x_refresh_token_expires_in: number;
  id_token: string;
  latency: number;
  createdAt: number;
}

export interface QBResponse<T extends object = object> {
  token: QBToken;
  getJson(): T;
}

class OAuthClient {
  constructor(options: object);

  authorizeUri(options: object): string;

  createToken(uri: string): { token: OAuthClientSecret };

  refreshUsingToken(token: string): Promise<QBResponse>;
}

// eslint-disable-next-line @typescript-eslint/class-name-casing
class scopes {
  static readonly Accounting = 'com.intuit.quickbooks.accounting';
  static readonly Payment = 'com.intuit.quickbooks.payment';
  static readonly Payroll = 'com.intuit.quickbooks.payroll';
  static readonly TimeTracking = 'com.intuit.quickbooks.payroll.timetracking';
  static readonly Benefits = 'com.intuit.quickbooks.payroll.benefits';
  static readonly Profile = 'profile';
  static readonly Email = 'email';
  static readonly Phone = 'phone';
  static readonly Address = 'address';
  static readonly OpenId = 'openid';
  static readonly Intuit_name = 'intuit_name';
}

export = OauthClient;

