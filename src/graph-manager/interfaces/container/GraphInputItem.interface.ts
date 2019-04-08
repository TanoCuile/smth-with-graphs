import { ItemInterface } from '../../../interfaces/Item.interface';

export interface GraphInputInterface<
  GraphItemInterface extends ItemInterface = ItemInterface
> {
  children: GraphInputInterface<GraphItemInterface>[];
  current: GraphItemInterface;
}
