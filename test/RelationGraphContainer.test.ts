import { RelationGraphContainer, chai } from './env';
import { ItemInterface } from '../src';

const ITEM_KEY_1 = '1';
const ITEM_KEY_2 = '2';
const ITEM_KEY_3 = '3';
const ITEM_KEY_4 = '4';

describe('GraphContainer', async function () {
  const container = new RelationGraphContainer<ItemInterface>();

  it('add', async function () {
    chai
      .expect(
        await container.addBranch({
          current: {
            key: ITEM_KEY_1,
          },
          children: [],
        }),
      )
      .to.be.eq(true);
    chai
      .expect(
        await container.addBranch({
          current: {
            key: ITEM_KEY_1,
          },
          children: [],
        }),
      )
      .to.be.eq(false);
  });

  it('getItem', async function () {
    await container.addBranch({
      current: {
        key: ITEM_KEY_2,
      },
      children: [],
    });

    const item = await container.getItem(ITEM_KEY_2);
    chai.expect(item).to.not.be.eq(undefined);
    chai.expect(item).to.have.property('key');
    chai.expect((item as { key: string }).key).to.be.eq(ITEM_KEY_2);
  });

  it('getRelations', async function () {
    await container.addBranch({
      current: {
        key: ITEM_KEY_3,
      },
      children: [
        {
          current: { key: ITEM_KEY_1 },
          children: [
            {
              current: {
                key: ITEM_KEY_2,
              },
              children: [],
            },
          ],
        },
      ],
    });

    await container.addBranch({
      current: {
        key: ITEM_KEY_4,
      },
      children: [
        { current: { key: ITEM_KEY_1 }, children: [] },
        { current: { key: ITEM_KEY_3 }, children: [] },
      ],
    });

    const item3 = await container.getItem(ITEM_KEY_3);
    chai.expect(item3).to.not.be.eq(undefined);
    chai.expect(item3).to.have.property('key');
    chai.expect((item3 as { key: string }).key).to.be.eq(ITEM_KEY_3);
    const relations3 = await container.getRelations(item3 as ItemInterface);
    chai.expect(relations3).to.not.be.eq(undefined);
    chai.expect(relations3.relations).to.not.be.eq(undefined);
    chai.expect(relations3.relations.length).to.be.eq(2);
    chai
      .expect(
        relations3.relations.filter(
          (r) => [ ITEM_KEY_1, ITEM_KEY_2 ].indexOf(r.key) >= 0,
        ).length,
      )
      .to.be.eq(2);

    const item4 = await container.getItem(ITEM_KEY_4);
    chai.expect(item4).to.not.be.eq(undefined);
    chai.expect(item4).to.have.property('key');
    chai.expect((item4 as { key: string }).key).to.be.eq(ITEM_KEY_4);
    const relations4 = await container.getRelations(item4 as ItemInterface);
    chai.expect(relations4).to.not.be.eq(undefined);
    chai.expect(relations4.relations).to.not.be.eq(undefined);
    chai.expect(relations4.relations.length).to.be.eq(3);
    chai
      .expect(
        relations4.relations.filter(
          (r) => [ ITEM_KEY_1, ITEM_KEY_2, ITEM_KEY_3 ].indexOf(r.key) >= 0,
        ).length,
      )
      .to.be.eq(3);
  });
});
