import express from "express";
import User from "../models/User.js";

const Router = express.Router();

//Seed-Method
Router.post("/seed", async (req, res) => {
  const user1 = new User({
    firstName: "radhouan",
    lastName: "khouadja",
    userName: "radhouankh",
    email: "radhouankhouadja@gmail.com",
    address: {
      street: "rue",
      city: "ariana",
      state: "arianasoghra",
      postalCode: 2093,
    },
    images: {
      profileImage:
        "//www.yoursite.com/random_images_folder_path/mypicture.jpg",
      firstVerificationImage:
        "//www.yoursite.com/random_images_folder_path/mypicture.jpg",
      secondVerificationImage:
        "//www.yoursite.com/random_images_folder_path/mypicture.jpg",
      require: true,
    },
    birthDate: "1990-10-27",
    identityCard: "09741887",
    phoneNumber: 55231990,
    sexe: "male",
    type: "client",
  });

  const user2 = new User({
    firstName: "feres",
    lastName: "mechemech",
    userName: "feresmc",
    email: "feresmechmecha@gmail.com",
    address: {
      street: "rue",
      city: "ariana",
      state: "arianasoghra",
      postalCode: 2093,
    },
    images: {
      profileImage:
        "//www.yoursite.com/random_images_folder_path/mypicture.jpg",
      firstVerificationImage:
        "//www.yoursite.com/random_images_folder_path/mypicture.jpg",
      secondVerificationImage:
        "//www.yoursite.com/random_images_folder_path/mypicture.jpg",
      require: true,
    },
    birthDate: "1996-10-27",
    identityCard: "66666666",
    phoneNumber: 24319797,
    sexe: "male",
    type: "agent",
  });

  try {
    const addedUser1 = await user1.save();
    const addedUser2 = await user2.save();
    res.status(200).json("added all users");
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
});

export default Router;
