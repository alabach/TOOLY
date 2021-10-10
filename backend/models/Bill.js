import mongoose from "mongoose";

const billSchema = mongoose.Schema({
  order_Id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Order",
    required: true,
  },
  payementMedthod: { type: String, enum: ["cash", "online"] },
  payed: { type: String, enum: ["yes", "no"] },
  billingAdress: {
    street: String,
    city: String,
    state: String,
    postalCode: Number,
  },
});

const Bill = mongoose.model("Bill", billSchema);

export default Bill;
