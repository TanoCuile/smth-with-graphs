import {
  GraphRelationsContainerInterface,
  GraphItemContainerInterface,
  ItemInterface,
  GraphContainerInterface,
} from './../env';
import {
  GraphRelationsInterface,
  GraphInputInterface,
} from '../../src/interfaces';

interface MockDataInterface {
  key: string;
  relations: MockDataInterface[];
}

export const data1: {
  [key: string]: MockDataInterface;
} = {
  alf: {
    key: 'alf',
    relations: [
      {
        key: 'fred',
        relations: [],
      },
      {
        key: 'tom',
        relations: [
          {
            key: 'backie',
            relations: [],
          },
        ],
      },
    ],
  },
  tom: {
    key: 'tom',
    relations: [
      {
        key: 'backie',
        relations: [],
      },
    ],
  },
  fred: {
    key: 'fred',
    relations: [
      {
        key: 'arti',
        relations: [],
      },
    ],
  },
  arti: {
    key: 'arti',
    relations: [
      {
        key: 'tod',
        relations: [],
      },
    ],
  },
  tod: {
    key: 'tod',
    relations: [
      {
        key: 'backie',
        relations: [],
      },
    ],
  },
  backie: {
    key: 'backie',
    relations: [],
  },
};

export const data2: {
  [key: string]: MockDataInterface;
} = {
  alf: {
    key: 'alf',
    relations: [
      {
        key: 'fred',
        relations: [],
      },
      {
        key: 'tom',
        relations: [
          {
            key: 'backie',
            relations: [],
          },
        ],
      },
    ],
  },
  tom: {
    key: 'tom',
    relations: [
      {
        key: 'backie',
        relations: [],
      },
    ],
  },
  fred: {
    key: 'fred',
    relations: [
      {
        key: 'arti',
        relations: [],
      },
    ],
  },
  arti: {
    key: 'arti',
    relations: [
      {
        key: 'tod',
        relations: [],
      },
    ],
  },
  tod: {
    key: 'tod',
    relations: [
      {
        key: 'backie',
        relations: [],
      },
    ],
  },
  backie: {
    key: 'backie',
    relations: [],
  },
};

export class GraphContainerMock
  implements
    GraphRelationsContainerInterface,
    GraphItemContainerInterface,
    GraphContainerInterface {
  protected data: {
    [key: string]: MockDataInterface;
  } = data1;

  addBranch(input: GraphInputInterface<ItemInterface>): Promise<boolean> {
    throw new Error('Method not implemented.');
  }

  putRelations(data: { [key: string]: MockDataInterface }) {
    this.data = data;
  }

  async getItem(key: string): Promise<ItemInterface> {
    return this.data[key];
  }

  async getRelations(item: ItemInterface): Promise<GraphRelationsInterface> {
    return this.data[item.key]
      ? this.data[item.key] || { relations: [] }
      : { relations: [] };
  }
}
