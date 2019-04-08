import { ItemInterface } from '../../../interfaces/index';

export interface GraphItemContainerInterface<
  GraphItemInterface extends ItemInterface = ItemInterface
> {
  getItem(key: string): Promise<GraphItemInterface | undefined>;
}
