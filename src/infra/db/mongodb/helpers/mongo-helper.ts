import { Collection, MongoClient, ObjectId } from 'mongodb'

export const mongoHelper = {
  client: null as unknown as MongoClient,

  async connect (uri: string): Promise<void> {
    this.client = await MongoClient.connect(uri, {})
  },

  async disconnect (): Promise<void> {
    await this.client.close()
  },

  getCollection (name: string): Collection {
    return this.client.db().collection(name)
  },

  map: (collection: any, insertedId: ObjectId): any => {
    return Object.assign({}, collection, { id: insertedId })
  }
}
