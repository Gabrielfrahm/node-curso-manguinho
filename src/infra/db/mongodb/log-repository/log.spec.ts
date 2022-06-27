import { Collection } from 'mongodb'
import { mongoHelper } from '../helpers/mongo-helper'
import { LogMongoRepository } from './log'

describe('Account Mongo Repository', () => {
  let errorCollection: Collection

  const makeSut = (): LogMongoRepository => {
    return new LogMongoRepository()
  }

  beforeAll(async () => {
    await mongoHelper.connect(global.__MONGO_URI__)
  })

  afterAll(async () => {
    await mongoHelper.disconnect()
  })

  beforeEach(async () => {
    errorCollection = await mongoHelper.getCollection('errors')
    await errorCollection.deleteMany({})
  })

  it('Should create an error log on success', async () => {
    const sut = makeSut()
    await sut.log('any_error')
    const count = await errorCollection.countDocuments()
    expect(count).toBe(1)
  })
})
