import 'server-only'

import { MongoClient } from 'mongodb'

const state = globalThis

export async function getMongoClient() {
  if (!process.env.MONGO_URL) throw new Error('MONGO_URL is not configured')
  if (!state.__lusoraeMongoClientPromise) {
    const client = new MongoClient(process.env.MONGO_URL, {
      maxPoolSize: 12,
      minPoolSize: 0,
      maxIdleTimeMS: 60_000,
      serverSelectionTimeoutMS: 8_000,
    })
    state.__lusoraeMongoClientPromise = client.connect().catch((error) => {
      state.__lusoraeMongoClientPromise = null
      throw error
    })
  }
  return state.__lusoraeMongoClientPromise
}

export async function getDb() {
  if (!process.env.DB_NAME) throw new Error('DB_NAME is not configured')
  const client = await getMongoClient()
  return client.db(process.env.DB_NAME)
}
