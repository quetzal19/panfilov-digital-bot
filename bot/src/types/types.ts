export interface IClient {
  id: number;
  type: string;
  name: string;
  contacts: string;
  message: string;
  page: string;
}

export interface IInitialParams {
  port: string;
  token: string;
  chatID: string;
  apiPrefix: string;
}
