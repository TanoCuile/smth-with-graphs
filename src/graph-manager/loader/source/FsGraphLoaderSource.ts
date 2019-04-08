import { GraphLoaderSourceInterface } from '../../interfaces/GraphLoaderSource.interface';
import { ItemInterface } from '../../../interfaces/Item.interface';
import { join } from 'path';
import { readFileSync } from 'fs';

export class FsGraphLoaderSource<
  GraphItemInterface extends ItemInterface = ItemInterface
> implements GraphLoaderSourceInterface<GraphItemInterface> {
  protected pathToFile: string;
  protected rawConnections?: any[];
  protected currentChunk: number = -1;

  constructor(pathToGraphFile?: string) {
    this.pathToFile =
      pathToGraphFile || join(process.cwd(), 'resources', 'connections.json');
  }

  async getNextItem(): Promise<GraphItemInterface | undefined> {
    if (!this.rawConnections) {
      this.rawConnections = await this.loadData();
      if (!this.rawConnections) {
        throw new Error('No source data');
      }
    }

    this.currentChunk += 1;

    return;
  }

  async getChildren(parent: GraphItemInterface): Promise<GraphItemInterface[]> {
    return [];
  }

  protected loadData() {
    return JSON.parse(readFileSync(this.pathToFile).toString());
  }
}
