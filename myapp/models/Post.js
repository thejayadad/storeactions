import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
      text: {
        type: String,
        required: [true, 'Text is required.'],
      },
      tag: {
        type: String,
        required: [true, 'Tag is required.'],
      }
}, {timestamps: true})

export default mongoose?.models?.Post || mongoose.model("Post", PostSchema)