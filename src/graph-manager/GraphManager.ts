import { ItemManagerInterface } from '../interfaces/ItemManager.interface';
import { ItemInterface } from '../interfaces/Item.interface';
import { GraphLoaderInterface } from './interfaces/GraphLoader.interface';
import { GraphConnectionFinderInterface } from './interfaces/GraphConnectionFinder.interface';
import { FsGraphLoaderSource } from './loader/source/FsGraphLoaderSource';
import { RelationGraphContainer } from './container/RelationGraphContainer';

export class GraphManager implements ItemManagerInterface {
  constructor(
    protected loader: GraphLoaderInterface,
    protected finder: GraphConnectionFinderInterface,
  ) {}
  async checkConnectionExist(connections: ItemInterface[]): Promise<boolean> {
    const container = new RelationGraphContainer();
    const branch = await this.loader.getBranch(new FsGraphLoaderSource());
    if (branch) {
      container.addBranch(branch);
    }

    for (let i = 1; i < connections.length; i += 1) {
      const connection = await this.finder.findConnection(
        container,
        connections[i - 1],
        connections[i],
      );

      if (connection.length === 0) {
        return false;
      }
    }

    return true;
  }
}
