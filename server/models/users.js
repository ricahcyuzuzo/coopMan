import mongoose from "mongoose";

const usersSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  cooperative: String,
  email: String,
  password: String,
  type: String
});

const userModel = mongoose.model('users', usersSchema);

export default userModel;
