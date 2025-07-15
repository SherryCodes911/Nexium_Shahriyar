import mongoose, { Connection } from 'mongoose'

const MONGODB_URI = process.env.MONGO_URI!

if (!MONGODB_URI) {
  throw new Error('❌ Please define the MONGO_URI environment variable in .env.local')
}

// ✅ Correctly type the global cache
interface MongooseCache {
  conn: Connection | null
  promise: Promise<typeof mongoose> | null
}

// ✅ Avoid TS7017 error by extending globalThis properly
declare global {
  // This makes global.mongoose safe to use across hot reloads
  var mongoose: MongooseCache
}

let cached = global.mongoose || (global.mongoose = { conn: null, promise: null })

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

// ✅ Your schema and model
const fullTextSchema = new mongoose.Schema({
  blog_url: { type: String, required: true },
  full_text: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
})

export const FullText =
  mongoose.models.FullText || mongoose.model('FullText', fullTextSchema)
