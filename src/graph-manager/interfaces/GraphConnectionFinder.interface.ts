import { ItemInterface } from '../../interfaces/Item.interface';
import { GraphRelationsContainerInterface } from './container/GraphRelationsContainer.interface';

export interface GraphConnectionFinderInterface {
  findConnection(
    container: GraphRelationsContainerInterface,
    fromItem: ItemInterface,
    toItem: ItemInterface,
  ): Promise<ItemInterface[]>;
}
