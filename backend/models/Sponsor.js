import mongoose from "mongoose";

const sponsorSchema = mongoose.Schema({
  brand: { type: String, require: true, unique: true, maxlength: 30 },
  logo: { type: String, require: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  price: { type: Number, require: true, default: 1000 },
  state: {
    type: String,
    enum: ["active", "notactive"],
    default: "active",
  },
});

const Sponsor = mongoose.model("Sponsor", sponsorSchema);

export default Sponsor;
