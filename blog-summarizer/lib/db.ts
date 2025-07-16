import mongoose, { Connection } from 'mongoose'

const MONGODB_URI = process.env.MONGO_URI!

if (!MONGODB_URI) {
  throw new Error('Please define the MONGO_URI environment variable in .env.local')
}

interface MongooseCache {
  conn: Connection | null
  promise: Promise<typeof mongoose> | null
}

declare global {
  var mongoose: MongooseCache
}

const cached = global.mongoose || (global.mongoose = { conn: null, promise: null })

export default async function dbConnect() {
  if (cached.conn) return cached.conn

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
    })
  }

  cached.conn = (await cached.promise).connection
  return cached.conn
}

const fullTextSchema = new mongoose.Schema({
  blog_url: { type: String, required: true },
  full_text: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
})

export const FullText =
  mongoose.models.FullText || mongoose.model('FullText', fullTextSchema)
