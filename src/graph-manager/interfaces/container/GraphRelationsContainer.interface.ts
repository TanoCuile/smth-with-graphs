import { ItemInterface } from '../../../interfaces/Item.interface';
import { GraphRelationsInterface } from './GraphRelations.interface';

export interface GraphRelationsContainerInterface<
  GraphItemInterface extends ItemInterface = ItemInterface
> {
  getRelations(item: GraphItemInterface): Promise<GraphRelationsInterface>;
}
