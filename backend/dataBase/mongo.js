import mongoose from "mongoose";

mongoose.connect(process.env.MONGODB_URL || "mongodb://localhost:27017/tooly", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});
export default mongoose;
