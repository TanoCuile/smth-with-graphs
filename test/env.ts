process.env.NODE_ENV = 'test';
process.env.DEBUG = 'test-suit,test-suit:*';
// process.env.HOST = 'localhost';
// process.env.PORT = '3000';
// process.env.ENVIRONMENT = 'test';
// process.env.LAST_MODEL_NAME = 'AutoDE-models-2019-02-13.rda';
// process.env.PREDICTION_QUEUE_INTERVAL = '5';

export const isWin = process.platform === 'win32';

import {} from 'mocha';
import chai from 'chai';

import chaiHttp from 'chai-http';
import chaiThings from 'chai-things';
import chaiSpies from 'chai-spies';

chai.use(chaiHttp);
chai.use(chaiThings);
chai.use(chaiSpies);

export * from '../src';

export { chai };
