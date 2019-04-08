export * from './finder/GraphConnectionFinder';
export * from './container/RelationGraphContainer';
export * from './loader/GraphLoader';
export * from './GraphManager';

import { GraphManager } from './GraphManager';
import { loader } from './loader/index';
import { finder } from './finder/index';

export const connectionManager = new GraphManager(loader, finder);
