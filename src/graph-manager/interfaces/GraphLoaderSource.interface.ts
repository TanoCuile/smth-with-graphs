import { ItemInterface } from '../../interfaces/Item.interface';

export interface GraphLoaderSourceInterface<
  GraphItemInterface extends ItemInterface = ItemInterface
> {
  getNextItem(): Promise<GraphItemInterface | undefined>;
  getChildren(parent: GraphItemInterface): Promise<GraphItemInterface[]>;
}
