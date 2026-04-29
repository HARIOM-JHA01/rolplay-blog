import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

const isPlaceholderUri = (uri: string | undefined): boolean => {
  if (!uri) return true;
  return uri.includes('<username>') || uri.includes('<password>') || uri.includes('<cluster>');
};

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  // eslint-disable-next-line no-var
  var mongoose: MongooseCache | undefined;
}

const cached: MongooseCache = global.mongoose ?? {
  conn: null,
  promise: null,
};

if (!global.mongoose) {
  global.mongoose = cached;
}

async function dbConnect(): Promise<typeof mongoose | null> {
  if (isPlaceholderUri(MONGODB_URI)) {
    console.warn('MONGODB_URI is not properly configured. Database operations will not work.');
    return null;
  }

  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      maxPoolSize: 10,
    };

    cached.promise = mongoose.connect(MONGODB_URI!, opts).then((mongoose) => {
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default dbConnect;
