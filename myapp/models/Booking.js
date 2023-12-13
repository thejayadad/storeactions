import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema({
    place: {type:mongoose.Schema.Types.ObjectId, required:true, ref:'Place'},
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    pickUp: {type:Date, required:true},
    dropOff: {type:Date, required:true},
    name: {type:String, required:true},
    phone: {type:String, required:true},
    price: Number,
}, {timestamps: true})

export default mongoose?.models?.Booking || mongoose.model("Booking", BookingSchema)