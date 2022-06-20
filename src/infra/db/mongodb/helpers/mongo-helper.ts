import { Collection, MongoClient, ObjectId } from 'mongodb'

export const mongoHelper = {
  client: null as unknown as MongoClient,
  uri: null as unknown as string,

  async connect (uri: string): Promise<void> {
    this.uri = uri
    this.client = new MongoClient(uri, {})
  },

  async disconnect (): Promise<void> {
    await this.client.close()
    this.client = null
  },

  async getCollection (name: string): Promise<Collection> {
    if (!this.client) {
      await this.connect(this.uri)
    }
    return this.client.db().collection(name)
  },

  map: (collection: any, insertedId: ObjectId): any => {
    return Object.assign({}, collection, { id: insertedId })
  }
}
