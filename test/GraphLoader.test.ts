import { chai } from './env';
import { ItemInterface, GraphLoader } from '../src';
import { GraphContainerMock } from './mock/GraphContainer.mock';
import {
  GraphLoaderSourceMock,
  ITEM_KEY_1,
  ITEM_CHILDREN_KEY_1,
  ITEM_CHILDREN_KEY_111,
  ITEM_CHILDREN_KEY_2,
} from './mock/GraphLoaderSource.mock';

describe('GraphLoader', async function () {
  const loader = new GraphLoader<ItemInterface>();
  const source = new GraphLoaderSourceMock();

  it('getBranch', async function () {
    const branch1 = await loader.getBranch(source);
    const branch2 = await loader.getBranch(source);

    chai.expect(branch1).to.be.not.eq(undefined);
    chai.expect(branch2).to.be.not.eq(undefined);

    if (branch1) {
      chai.expect(branch1.current.key).to.be.eq(ITEM_KEY_1);
      chai.expect(branch1).to.have.property('children');
      chai.expect(branch1.children.length).to.be.eq(2);
      chai.expect(branch1.children[0].current.key).to.be.eq(ITEM_CHILDREN_KEY_1);
      chai.expect(branch1.children[0]).to.have.property('children');
      chai.expect(branch1.children[0].children.length).to.be.eq(1);
      chai
        .expect(branch1.children[0].children[0].current.key)
        .to.be.eq(ITEM_CHILDREN_KEY_111);
      chai.expect(branch1.children[1].current.key).to.be.eq(ITEM_CHILDREN_KEY_2);
      chai.expect(branch1.children[1]).to.have.property('children');
      chai.expect(branch1.children[1].children.length).to.be.eq(0);
    }
  });
});
