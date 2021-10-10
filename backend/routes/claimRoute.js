import express from "express";
import Claim from "../models/Claim.js";

const Router = express.Router();

//Get-Claims-Not-Treated
Router.get("/nottreated", async (req, res) => {
  const nottreatedclaims = [];
  const claims = await Claim.find({ state: "notresolved" }).populate("user_Id");
  claims.map((claim) => {
    nottreatedclaims.push({
      reference: claim.id,
      username: claim.user_Id.userName,
      about: claim.about,
      description: claim.description,
      date: claim.date,
      state: claim.state,
    });
  });
  res.json(nottreatedclaims);
});
//Get-Claims-Treated
Router.get("/treated", async (req, res) => {
  const treatedclaims = [];
  const claims = await Claim.find({ state: "resolved" }).populate("user_Id");
  claims.map((claim) => {
    treatedclaims.push({
      reference: claim.id,
      username: claim.user_Id.userName,
      about: claim.about,
      description: claim.description,
      date: claim.date,
    });
  });
  res.json(treatedclaims);
});

//Seed-Method
Router.post("/seed", async (req, res) => {
  const claim1 = new Claim({
    user_Id: "607e3725f430a2101068f1cf",
    description:
      "i didn't found what i need ,you need to add more products and categories",
    about: "general",
  });

  const claim2 = new Claim({
    user_Id: "607e3725f430a2101068f1cf",
    description:
      "i think that the product with reference xxxx have a cost to much expensive and buying it would be much better",
    about: "product",
  });

  try {
    const addedClaim1 = await claim1.save();
    const addedClaim2 = await claim2.save();
    res.status(201).json("all claims are created");
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
});

export default Router;
