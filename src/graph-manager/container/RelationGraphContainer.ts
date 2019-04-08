import { GraphRelationsContainerInterface } from '../interfaces/container/GraphRelationsContainer.interface';
import { GraphRelationsInterface } from '../interfaces/container/GraphRelations.interface';
import { ItemInterface } from '../../interfaces/Item.interface';
import { GraphInputInterface } from '../interfaces/container/GraphInputItem.interface';
import { GraphItemContainerInterface } from '../interfaces/container/GraphItemContainer.interface';
import { GraphContainerInterface } from '../interfaces/container/GraphContainer.interface';

export class RelationGraphContainer<
  GraphItemInterface extends ItemInterface = ItemInterface
>
  implements
    GraphRelationsContainerInterface<GraphItemInterface>,
    GraphItemContainerInterface<GraphItemInterface>,
    GraphContainerInterface<GraphItemInterface> {
  protected data: { [key: string]: GraphItemInterface } = {};

  protected relations: {
    [key: string]: ItemInterface[];
  } = {};

  async getItem(key: string): Promise<GraphItemInterface | undefined> {
    return this.data[key];
  }

  async getRelations(item: ItemInterface): Promise<GraphRelationsInterface> {
    return {
      relations: ([] as ItemInterface[]).concat(this.relations[item.key]),
    } as GraphRelationsInterface;
  }

  async addBranch(
    input: GraphInputInterface<GraphItemInterface>,
  ): Promise<boolean> {
    if (!this.data[input.current.key]) {
      this.addChildren(input.current, input.children);

      return true;
    }
    return false;
  }

  protected addChildren(
    current: GraphItemInterface,
    children: GraphInputInterface<GraphItemInterface>[],
  ) {
    this.data[current.key] = current;

    if (!this.relations[current.key]) {
      this.relations[current.key] = [];
    }

    for (const child of children) {
      this.relations[current.key].push({ key: child.current.key });
      this.relations[current.key] = this.relations[current.key]
        .concat(this.addChildren(child.current, child.children))
        .reduce(
          (total, relationItem) => {
            if (!total.find((item) => item.key === relationItem.key)) {
              total.push(relationItem);
            }
            return total;
          },
          [] as ItemInterface[],
        );
    }

    return this.relations[current.key];
  }
}
