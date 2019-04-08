import { GraphLoaderSourceInterface } from './GraphLoaderSource.interface';
import { ItemInterface, GraphInputInterface } from '../../interfaces/index';

export interface GraphLoaderInterface<
  GraphItemInterface extends ItemInterface = ItemInterface
> {
  getBranch(
    source: GraphLoaderSourceInterface<GraphItemInterface>,
  ): Promise<GraphInputInterface<GraphItemInterface> | undefined>;
}
