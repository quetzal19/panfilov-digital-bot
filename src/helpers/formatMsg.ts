import { IClient } from 'src/types/types';

export function formatClientMsg(entry: IClient) {
  return `${entry.name} ${entry.contacts}\n${entry.message}`;
}
