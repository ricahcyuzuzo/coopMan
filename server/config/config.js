import mongoose from "mongoose";

const mongoConnect = () => {
  mongoose.connect('mongodb+srv://coopman:kigali123@cluster0.jnorhku.mongodb.net/?retryWrites=true&w=majority', {
    useUnifiedTopology: true,
    useNewUrlParser: true
  });

  mongoose.connection
    .once('open', () => console.log('DB is connected successfully'))
    .on('error', (error) => {
      console.log('Error ', error);
    });
}

export default mongoConnect;
