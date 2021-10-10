import mongoose from "mongoose";

const deliverSchema = mongoose.Schema({
  deliveryAgent_Id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  order_Id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Order",
    required: true,
  },
  deliveryAdress: {
    street: String,
    city: String,
    state: String,
    postalCode: Number,
  },
  deliveryMode: {
    type: String,
    enum: ["OneToOne", "delivery"],
  },
  state: {
    type: String,
    enum: ["delivred", "notyet"],
    default: "notyet",
  },
});

const Delivery = mongoose.model("Delivery", deliverSchema);

export default Delivery;
