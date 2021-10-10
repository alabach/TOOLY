import mongoose from "mongoose";

export const orderSchema = mongoose.Schema({
  user_Id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  products: [
    {
      product_Id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      startDate: { type: Date, required: true },
      endDate: { type: Date, required: true },
      pricePerDay: { type: Number, required: true },
    },
  ],
  date: { type: Date, required: true, default: Date.now },
  totalPrice: { type: Number, required: true },
});

const Order = mongoose.model("Order", orderSchema);

export default Order;
