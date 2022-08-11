import mongoose from 'mongoose';

const soldSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  produce: Object,
  price: Number,
  quantity: Number,
});

const soldModel = mongoose.model('sold', soldSchema);
export default soldModel;
