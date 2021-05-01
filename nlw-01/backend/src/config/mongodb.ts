import mongoose from 'mongoose';

export default async function connect() {
  try {
    const res = await mongoose.connect(
      `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_CLUSTER}-kvp6m.mongodb.net/${process.env.MONGO_DB_NAME}?retryWrites=true&w=majority`,
      {
        useNewUrlParser: true,
        useFindAndModify: true,
        useUnifiedTopology: true,
      }
    );

    if (res) {
      console.log('[application] mongodb connected');
    }
  } catch (e) {
    console.error(e);
  }
}
