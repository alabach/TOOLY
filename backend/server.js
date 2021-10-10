import express from "express";
import dotenv from "dotenv";
import dataBase from "./dataBase/mongo.js";
import billsRoute from "./routes/billRoute.js";
import orderRoute from "./routes/orderRoute.js";
import userRoute from "./routes/userRoute.js";
import productRoute from "./routes/productRoute.js";
import claimRoute from "./routes/claimRoute.js";
import DeliveryRoute from "./routes/deliveryRoute.js";

//config
dotenv.config();
const app = express();

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routing
app.use("/bills", billsRoute);
app.use("/orders", orderRoute);
app.use("/users", userRoute);
app.use("/products", productRoute);
app.use("/claims", claimRoute);
app.use("/deliveries", DeliveryRoute);

//port-config
const port = process.env.PORT || 5000;
app.get("/", (req, res) => res.send("serve is ready ....."));
app.listen(port, () =>
  console.log(`server is listening at http://localhost:${port}`)
);
