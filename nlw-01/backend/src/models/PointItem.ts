import mongoose from 'mongoose';

const schema = new mongoose.Schema(
  {
    _point_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Point',
      required: true,
    },
    _item_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Item',
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model('PointItem', schema);
