import mongoose from 'mongoose';

const schema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Item', schema);
