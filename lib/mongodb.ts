import { MongoClient } from 'mongodb'

const uri = process.env.MONGODB_URI || ''

const client = new MongoClient(uri)
const clientPromise = uri ? client.connect() : Promise.reject('Missing MONGODB_URI')

export default clientPromise