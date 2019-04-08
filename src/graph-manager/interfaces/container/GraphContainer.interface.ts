import { GraphInputInterface } from './GraphInputItem.interface';
import { ItemInterface } from '../../../index';

export interface GraphContainerInterface<
  GraphItemInterface extends ItemInterface = ItemInterface
> {
  addBranch(input: GraphInputInterface<GraphItemInterface>): Promise<boolean>;
}
