import mongoose from "mongoose";
const postSchema = mongoose.Schema({
  title: String,
  creator: String,
  name:String,
  message: String,
  tags: [String],
  selectedFile: {
    type: mongoose.SchemaTypes.Mixed,
  },
  likes: {
    type: [String],
    default: [],
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});
const PostMessage = mongoose.model("PostMessage", postSchema);
export default PostMessage;
