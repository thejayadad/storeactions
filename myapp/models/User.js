import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: [true, 'Email already exists!'],
        required: [true, 'Email is required!'],
      },
      username: {
        type: String,
        required: [true, 'Username is required!'],
        unique: true

      },
      image: {
        type: String,
      }
}, {timestamps: true})

export default mongoose?.models?.User || mongoose.model("User", UserSchema)