import mongoose from 'mongoose';

const produceSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
  quantity: Number,
  cooperative: Object,
  fertilizer: Object,
  pesticide: Object,
  created_at: String,
  updated_at: String,
});

const produceModel = mongoose.model('produces', produceSchema);

export default produceModel;
