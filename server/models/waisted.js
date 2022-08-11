import mongoose from 'mongoose';

const wastedSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  produce: Object,
  quantity: Number,
  trimester: String,
});

const wastedModel = mongoose.model('wasted', wastedSchema);

export default wastedModel;
