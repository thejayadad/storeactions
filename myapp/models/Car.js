import mongoose from "mongoose";

const CarSchema = new mongoose.Schema({
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    title: String,
    address: String,
    photos: [String],
    desc: String,
    extraInfo: String,
    pickUp: Number,
    dropOff: Number,
    carSeats: Number,
    price: Number,
}, {timestamps: true})

export default mongoose?.models?.Car || mongoose.model("Car", CarSchema)