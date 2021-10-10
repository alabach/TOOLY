import express from "express";
import Delivery from "../models/Delivery.js";

const Router = express.Router();

//Get-All-Orders-delivred
Router.get("/delivred", async (req, res) => {
  const delivred = [];
  const orders = await Delivery.find({ state: "delivred" }).populate({
    path: "order_Id",
    populate: { path: "user_Id" },
  });
  orders.map((order) => {
    delivred.push({
      reference: order.order_Id._id,
      username: order.order_Id.user_Id.userName,
      date: order.order_Id.date,
      totalprice: order.order_Id.totalPrice,
      deliveryaddress: order.deliveryAddress,
    });
  });
  res.json(delivred);
});

//Get-All-Orders-Not-delivred-One-To-One
Router.get("/onetoone", async (req, res) => {
  const onetoone = [];
  const orders = await Delivery.find({
    state: "notyet",
    deliveryMode: "OneToOne",
  }).populate({
    path: "order_Id",
    populate: { path: "user_Id" },
  });
  orders.map((order) => {
    onetoone.push({
      reference: order.order_Id._id,
      username: order.order_Id.user_Id.userName,
      date: order.order_Id.date,
      totalprice: order.order_Id.totalPrice,
      deliveryaddress: order.deliveryAddress,
    });
  });
  res.json(onetoone);
});

//Get-All-Orders-Not-delivred-Delivery

Router.get("/delivery", async (req, res) => {
  const delivery = [];
  const orders = await Delivery.find({
    state: "notyet",
    deliveryMode: "delivery",
  }).populate({ path: "order_Id", populate: { path: "user_Id" } });
  orders.map((order) => {
    delivery.push({
      reference: order.order_Id._id,
      username: order.order_Id.user_Id.userName,
      date: order.order_Id.date,
      totalprice: order.order_Id.totalPrice,
      deliveryaddress: order.deliveryAddress,
    });
  });
  res.json(delivery);
});

//Add-Delivery
Router.post("/", async (req, res) => {
  const delivery = new Delivery({
    order_Id: req.body.order_Id,
    deliveryAddress: {
      street: req.body.deliveryAddress.street,
      city: req.body.deliveryAddress.city,
      state: req.body.deliveryAddress.state,
      postalCode: req.body.deliveryAddress.postalCode,
    },
    deliveryMode: req.body.deliveryMode,
  });

  try {
    const addedDelivery = await delivery.save();
    res.status(201).json(addedDelivery);
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
});

//Seed-Method
Router.post("/seed", async (req, res) => {
  const delivery1 = new Delivery({
    order_Id: "607fc6c948ee7518e86cf85e",
    deliveryAdress: {
      street: "hedi medeni",
      city: "jaafer",
      state: "ariana",
      postalCode: 2083,
    },
    deliveryMode: "OneToOne",
    state: "notyet",
  });

  const delivery2 = new Delivery({
    order_Id: "607fc6c948ee7518e86cf861",
    deliveryAdress: {
      street: "saleh ben youssef",
      city: "menzah9",
      state: "tunis",
      postalCode: 2064,
    },
    deliveryMode: "delivery",
    state: "delivred",
  });

  const delivery3 = new Delivery({
    order_Id: "607fc6c948ee7518e86cf864",
    deliveryAdress: {
      street: "mohi din klibi",
      city: "petite ariana",
      state: "ariana",
      postalCode: 2074,
    },
    deliveryMode: "delivery",
    state: "notyet",
  });

  try {
    const addedDelivery1 = await delivery1.save();
    const addedDelivery2 = await delivery2.save();
    const addedDelivery3 = await delivery3.save();
    res.status(201).json("all deliverys are created");
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
});

export default Router;
