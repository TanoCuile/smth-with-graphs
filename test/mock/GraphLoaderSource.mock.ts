import { GraphLoaderSourceInterface, ItemInterface } from '../env';

export const ITEM_KEY_1 = '1';
export const ITEM_KEY_2 = '1';

export const ITEM_CHILDREN_KEY_1 = '1.1';
export const ITEM_CHILDREN_KEY_111 = '1.1.1';
export const ITEM_CHILDREN_KEY_2 = '1.2';
export const ITEM_CHILDREN_KEY_21 = '2.1';
export const ITEM_CHILDREN_KEY_22 = '2.2';
interface MockBranchInterface {
  key: string;
  children: MockBranchInterface[];
}

export class GraphLoaderSourceMock
  implements GraphLoaderSourceInterface<ItemInterface> {
  protected rawConnections?: any[];
  protected currentChunk: number = -1;
  protected branches: MockBranchInterface[] = [
    {
      key: ITEM_KEY_1,
      children: [
        {
          key: ITEM_CHILDREN_KEY_1,
          children: [],
        },
        {
          key: ITEM_CHILDREN_KEY_2,
          children: [],
        },
      ],
    },
    {
      key: ITEM_CHILDREN_KEY_1,
      children: [
        {
          key: ITEM_CHILDREN_KEY_111,
          children: [],
        },
      ],
    },
    {
      key: ITEM_KEY_2,
      children: [
        {
          key: ITEM_CHILDREN_KEY_21,
          children: [],
        },
        {
          key: ITEM_CHILDREN_KEY_22,
          children: [],
        },
      ],
    },
  ];

  constructor() {}

  async getNextItem(): Promise<ItemInterface | undefined> {
    this.currentChunk += 1;

    return {
      key: this.branches[this.currentChunk].key,
    };
  }

  async getChildren(parent: ItemInterface): Promise<ItemInterface[]> {
    const relationsItem = this.branches.find(
      (branch) => branch.key === parent.key,
    );
    if (relationsItem) {
      return relationsItem.children;
    }
    return [];
  }
}
