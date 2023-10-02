import { afterAll, beforeAll, beforeEach } from '@jest/globals';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';

let mongoServer: MongoMemoryServer;

beforeAll(async () => {
  process.env = {
    ...process.env,
    JWT_SECRET: 'JWT_SECRET',
  };

  mongoServer = await MongoMemoryServer.create({ instance: {} });
  await mongoose.connect(mongoServer.getUri());
});

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();
  await Promise.all(collections.map((collection) => collection.deleteMany({})));
});

afterAll(async () => {
  await mongoServer.stop();
  await mongoose.disconnect();
});
