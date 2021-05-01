import mongoose from 'mongoose';

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      // unique: true,
    },
    whatsapp: {
      type: String,
      required: true,
    },
    latitude: {
      type: Number,
      required: true,
    },
    longitude: {
      type: Number,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    uf: {
      type: String,
      minlength: 2,
      maxlength: 2,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Point', schema);
