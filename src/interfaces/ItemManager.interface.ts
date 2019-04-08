import { ItemInterface } from './Item.interface';

export interface ItemManagerInterface {
  checkConnectionExist(connections: ItemInterface[]): Promise<boolean>;
}
