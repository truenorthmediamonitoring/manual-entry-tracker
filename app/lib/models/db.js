import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

export default async function dbConnect() {
  if (mongoose.connection.readyState >= 1) return;
  return mongoose.connect(MONGODB_URI);
}

// const connectDB = async () => {
//     if (mongoose.connection.readyState === 1) {
//         return mongoose.connection.asPromise();
//     }
//     return await mongoose.connect(process.env.MONGODB_URI);
// };

// export default connectDB;