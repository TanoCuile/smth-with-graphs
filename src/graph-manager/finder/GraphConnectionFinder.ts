import { GraphConnectionFinderInterface } from '../interfaces/GraphConnectionFinder.interface';
import { GraphRelationsContainerInterface } from '../interfaces/container/GraphRelationsContainer.interface';
import { ItemInterface } from '../../interfaces/Item.interface';
import { GraphItemContainerInterface } from '../interfaces/container/GraphItemContainer.interface';

export class GraphConnectionFinder implements GraphConnectionFinderInterface {
  async findConnection(
    container: GraphRelationsContainerInterface & GraphItemContainerInterface,
    fromItem: ItemInterface,
    toItem: ItemInterface,
  ): Promise<ItemInterface[]> {
    return (
      (await this.checkNextItem(container, fromItem.key, toItem.key)) || []
    );
  }

  protected async checkNextItem(
    container: GraphRelationsContainerInterface & GraphItemContainerInterface,
    fromKey: string,
    toKey: string,
  ): Promise<ItemInterface[] | undefined> {
    const relations = await container.getRelations({ key: fromKey });
    for (const relation of relations.relations) {
      if (relation.key === toKey) {
        return [ (await container.getItem(relation.key)) as ItemInterface ];
      }
    }

    let smallestPath: any;

    for (const relation of relations.relations) {
      const foundConnection = await this.checkNextItem(
        container,
        relation.key,
        toKey,
      );

      if (
        foundConnection &&
        (!smallestPath || foundConnection.length < smallestPath.length)
      ) {
        smallestPath = foundConnection;
      }
    }

    if (!smallestPath) {
      return;
    }

    smallestPath.unshift((await container.getItem(fromKey)) as ItemInterface);

    return smallestPath;
  }
}
