import React from "react";
import axios from "axios";
import { Form, Button } from "react-bootstrap";
import { useState } from "react";
import Joi from "joi-browser";
import { useHistory } from "react-router-dom";
import "./SponsorEdit.css";

export const SponsorEdit = ({ sponsor }) => {
  const [error, setError] = useState("");
  const history = useHistory();

  //Sponsor
  const [sponsorE, setSponsorE] = useState({
    brand: sponsor.brand,
    startDate: sponsor.startDate,
    endDate: sponsor.endDate,
    price: sponsor.price,
  });

  //logo
  const [logo, setLogo] = useState(React.createRef());

  //Schema(Joi)
  const schema = {
    brand: Joi.string().required(),
    startDate: Joi.string().required(),
    endDate: Joi.string().required(),
    price: Joi.number().required(),
  };

  //Validate Form
  const validate = () => {
    const result = Joi.validate(sponsorE, schema, { abortEarly: false });
    if (!result.error) return false;
    return true;
  };

  //validate input form
  const validateProperty = (name, value) => {
    const obj = { [name]: value };
    const schemaProperty = { [name]: schema[name] };
    const { error } = Joi.validate(obj, schemaProperty);
    if (!error) return null;
    return { input: name, message: error.details[0].message };
  };

  // handle onchange input
  const handleChange = (e) => {
    const errorMessage = validateProperty(
      e.currentTarget.name,
      e.currentTarget.value
    );
    if (errorMessage) setError(errorMessage);
    else setError({});

    const sponsorChange = { ...sponsorE };
    sponsorChange[e.currentTarget.name] = e.currentTarget.value;
    setSponsorE(sponsorChange);
  };

  // handle-onchange-logo
  const handleLogoChange = (e) => {
    if (e.currentTarget.name === "logo") setLogo(e.target.files[0]);
  };

  //edit sponsor function
  const editSponsor = async ({ brand, startDate, endDate, price }) => {
    const data = new FormData();
    data.append("brand", brand);
    data.append("logo", logo);
    data.append("startDate", startDate);
    data.append("endDate", endDate);
    data.append("price", price);
    try {
      await axios.put(`/sponsors/edit/${sponsor._id}`, data);
    } catch (error) {
      console.log("failed to edit sponsor");
    }
  };

  // handle submit sponsor
  const handleSubmit = (e) => {
    e.preventDefault();
    editSponsor(sponsorE);
    setTimeout(function () {
      history.go(0);
    }, 3000);
  };

  return (
    <Form onSubmit={(e) => handleSubmit(e)}>
      <Form.Group>
        <Form.Label htmlFor="brand">Brand</Form.Label>
        <Form.Control
          id="brand"
          name="brand"
          type="text"
          onChange={handleChange}
          value={sponsorE.brand}
        />
        {error.input === "brand" && (
          <div className="alert alert-danger"> {error.message}</div>
        )}
        <Form.Label htmlFor="startDate">StartDate</Form.Label>
        <Form.Control
          id="startDate"
          name="startDate"
          type="text"
          onChange={handleChange}
          value={sponsorE.startDate}
        />
        {error.input === "startDate" && (
          <div className="alert alert-danger"> {error.message}</div>
        )}
        <Form.Label htmlFor="endDate">EndDate</Form.Label>
        <Form.Control
          id="endDate"
          name="endDate"
          type="text"
          onChange={handleChange}
          value={sponsorE.endDate}
        />
        {error.input === "endDate" && (
          <div className="alert alert-danger"> {error.message}</div>
        )}
        <Form.Label htmlFor="Price">Price</Form.Label>
        <Form.Control
          id="price"
          name="price"
          type="number"
          onChange={handleChange}
          value={sponsorE.price}
        />
        {error.input === "price" && (
          <div className="alert alert-danger"> {error.message}</div>
        )}
        <Form.Label htmlFor="logo">Select Sponsor Logo</Form.Label>
        <Form.Control
          id="logo"
          name="logo"
          type="file"
          reference={logo}
          onChange={handleLogoChange}
        />
      </Form.Group>
      <Button variant="warning" type="submit" disabled={validate()} block>
        Edit
      </Button>
    </Form>
  );
};

export default SponsorEdit;
