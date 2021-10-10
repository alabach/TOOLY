import express from "express";
import Bill from "../models/Bill.js";

const Router = express.Router();

//Get-All-Bills-Payed
Router.get("/payed", async (req, res) => {
  const billspayed = [];
  const bills = await Bill.find({ payed: "yes" }).populate({
    path: "order_Id",
    populate: { path: "user_Id" },
  });
  bills.map((bill) => {
    billspayed.push({
      reference: bill._id,
      payementMedthod: bill.payementMedthod,
      billingAddress: bill.billingAddress,
      date: bill.order_Id.date,
      username: bill.order_Id.user_Id.userName,
      price: bill.order_Id.totalPrice,
    });
  });
  res.json(billspayed);
});

//Get-All-Bills-Not-Payed
Router.get("/notpayed", async (req, res) => {
  const billsnotpayed = [];
  const bills = await Bill.find({ payed: "no" }).populate({
    path: "order_Id",
    populate: { path: "user_Id" },
  });
  bills.map((bill) => {
    billsnotpayed.push({
      reference: bill._id,
      payementMedthod: bill.payementMedthod,
      billingAddress: bill.billingAddress,
      date: bill.order_Id.date,
      username: bill.order_Id.user_Id.userName,
      price: bill.order_Id.totalPrice,
    });
  });
  res.json(billsnotpayed);
});

//Add-Bill
Router.post("/", async (req, res) => {
  const bill = new Bill({
    order_Id: req.body.order_Id,
    payementMedthod: req.body.payementMedthod,
    payed: req.body.payed,
    billingAddress: {
      street: req.body.billingAddress.street,
      city: req.body.billingAddress.city,
      state: req.body.billingAddress.state,
      postalCode: req.body.billingAddress.postalCode,
    },
  });
  try {
    const addedBill = await bill.save();
    res.status(201).json(addedBill);
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
});

//Seed-Method
Router.post("/seed", async (req, res) => {
  const bill1 = new Bill({
    order_Id: "607fc6c948ee7518e86cf85e",
    payementMedthod: "cash",
    payed: "no",
    billingAdress: {
      street: "tunisia",
      city: "tunisia",
      state: "tunisia",
      postalCode: 1013,
    },
  });

  const bill2 = new Bill({
    order_Id: "607fc6c948ee7518e86cf861",
    payementMedthod: "online",
    payed: "yes",
    billingAdress: {
      street: "tunisia",
      city: "tunisia",
      state: "tunisia",
      postalCode: 1013,
    },
  });

  try {
    const addedBill1 = await bill1.save();
    const addedBill2 = await bill2.save();
    res.status(201).json("all bills are created");
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
});

export default Router;
