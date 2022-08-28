import mongoose from "mongoose";

const mongoConnect = () => {
  mongoose.connect('mongodb://localhost:27017/cooperative_management', {
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
