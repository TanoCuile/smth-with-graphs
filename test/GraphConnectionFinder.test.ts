import { chai } from './env';
import { GraphConnectionFinder } from '../src/graph-manager/finder/GraphConnectionFinder';
import { GraphContainerMock, data2, data1 } from './mock/GraphContainer.mock';

describe('GraphConnectionFinder', async function () {
  const finder = new GraphConnectionFinder();
  const container = new GraphContainerMock();

  it('findConnection', async function () {
    const resp = await finder.findConnection(
      container,
      { key: 'alf' },
      { key: 'backie' },
    );

    chai.expect(resp.length).to.be.eq(2);
  });
});
