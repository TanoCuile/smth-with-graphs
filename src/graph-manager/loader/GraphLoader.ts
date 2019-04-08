import { GraphLoaderInterface } from '../interfaces/GraphLoader.interface';
import { GraphLoaderSourceInterface } from '../interfaces/GraphLoaderSource.interface';
import { ItemInterface, GraphContainerInterface } from '../../index';
import { GraphInputInterface } from '../interfaces/index';

export class GraphLoader<
  GraphItemInterface extends ItemInterface = ItemInterface
> implements GraphLoaderInterface<GraphItemInterface> {
  async getBranch(
    source: GraphLoaderSourceInterface<GraphItemInterface>,
  ): Promise<GraphInputInterface<GraphItemInterface> | undefined> {
    const item = await source.getNextItem();
    if (!item) {
      return;
    }

    return await this.processChildren(source, {
      current: item,
      children: [] as GraphInputInterface<GraphItemInterface>[],
    });
  }

  private async processChildren(
    source: GraphLoaderSourceInterface<GraphItemInterface>,
    currentItem: GraphInputInterface<GraphItemInterface>,
  ) {
    const children = await source.getChildren(currentItem.current);
    for (const child of children) {
      currentItem.children.push(
        await this.processChildren(source, { current: child, children: [] }),
      );
    }
    return currentItem;
  }
}
