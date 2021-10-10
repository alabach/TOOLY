import React, { useState } from "react";
import { Button } from "react-bootstrap";
import Joi from "joi-browser";
import Axios from "axios";
import { useHistory } from "react-router-dom";
import "./AddProduct.css";

export const AddProduct = () => {
  const history = useHistory();
  //Product
  const [product, setproduct] = useState({
    user_Id: "607e3725f430a2101068f1cf",
    name: "",
    reference: "",
    category: "",
    description: "",
    brand: "",
    tutorial: "",
    pricePerDay: 20,
  });
  //images
  const [image1, setimage1] = useState(React.createRef());
  const [image2, setimage2] = useState(React.createRef());
  const [image3, setimage3] = useState(React.createRef());
  const [image4, setimage4] = useState(React.createRef());
  //error
  const [error, seterror] = useState("");
  //Schema(Joi)
  const schema = {
    user_Id: Joi.string().required(),
    name: Joi.string().min(3).max(15).required(),
    reference: Joi.string().min(3).max(15).required(),
    description: Joi.string().min(10).max(200).required(),
    category: Joi.required(),
    brand: Joi.string().min(3).max(15).required(),
    tutorial: Joi.string().required(),
    pricePerDay: Joi.number().required(),
  };
  //Validate-Form
  const validate = () => {
    const result = Joi.validate(product, schema, { abortEarly: false });
    console.log(result);
    if (!result.error) return false;
    return true;
  };
  //Validate-Input-Form
  const validateProperty = (name, value) => {
    const obj = { [name]: value };
    const schemaProperty = { [name]: schema[name] };
    const { error } = Joi.validate(obj, schemaProperty);
    if (!error) return null;
    return { input: name, message: error.details[0].message };
  };

  //Handle-onChange-Input
  const handleChange = (e) => {
    const errorMessage = validateProperty(
      e.currentTarget.name,
      e.currentTarget.value
    );
    if (errorMessage) seterror(errorMessage);
    else seterror({});

    const productChange = { ...product };
    productChange[e.currentTarget.name] = e.currentTarget.value;
    setproduct(productChange);
  };
  //Handle-OnChange-Images
  const hanndleImageChange = (e) => {
    if (e.currentTarget.name === "image1") setimage1(e.target.files[0]);
    if (e.currentTarget.name === "image2") setimage2(e.target.files[0]);
    if (e.currentTarget.name === "image3") setimage3(e.target.files[0]);
    if (e.currentTarget.name === "image4") setimage4(e.target.files[0]);
  };
  //Async-Add-Product
  const addProduct = async ({
    reference,
    name,
    brand,
    tutorial,
    pricePerDay,
    category,
    description,
    user_Id,
  }) => {
    const data = new FormData();
    data.append("image1", image1);
    data.append("image2", image2);
    data.append("image3", image3);
    data.append("image4", image4);
    data.append("user_Id", user_Id);
    data.append("reference", reference);
    data.append("name", name);
    data.append("brand", brand);
    data.append("tutorial", tutorial);
    data.append("pricePerDay", pricePerDay);
    data.append("category", category);
    data.append("description", description);

    try {
      await Axios.post("/products/addproduct", data);
    } catch (error) {
      console.log("probleme");
    }
  };
  //Handle-OnSubmit
  const handleSubmit = (e) => {
    e.preventDefault();
    addProduct(product);
    history.goBack();
  };

  //Handle-OnClick-Back
  const handleBack = () => {
    history.goBack();
  };

  return (
    <>
      <h1 className="add-product-title">add new product</h1>
      <form className="add-product-formulaire" onSubmit={handleSubmit}>
        <div className="add-product-first-step">
          <div className="form-group">
            <label htmlFor="name">name</label>
            <input
              id="name"
              name="name"
              type="text"
              className="form-control"
              value={product.name}
              onChange={handleChange}
            />
            {error.input === "name" && (
              <div className="alert alert-danger"> {error.message}</div>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="brand">brand</label>
            <input
              id="brand"
              name="brand"
              type="text"
              className="form-control"
              value={product.brand}
              onChange={handleChange}
            />
            {error.input === "brand" && (
              <div className="alert alert-danger"> {error.message}</div>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="reference">reference</label>
            <input
              id="reference"
              name="reference"
              type="text"
              className="form-control"
              value={product.reference}
              onChange={handleChange}
            />
            {error.input === "reference" && (
              <div className="alert alert-danger"> {error.message}</div>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="description">description</label>
            <textarea
              id="description"
              name="description"
              rows="3"
              className="form-control"
              value={product.description}
              onChange={handleChange}
            ></textarea>
            {error.input === "description" && (
              <div className="alert alert-danger"> {error.message}</div>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="gategory">gategory</label>
            <select
              className="form-control"
              id="category"
              name="category"
              value={product.category}
              onChange={handleChange}
            >
              <option value="Gardening">Gardening</option>
              <option value="DIY">DIY</option>
              <option value="Plombry">Plombry</option>
              <option value="Electricity">Electricity</option>
              <option value="Painting">Painting</option>
              <option value="Lighting">Lighting</option>
            </select>
            {error.input === "category" && (
              <div className="alert alert-danger"> {error.message}</div>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="pricePerDay">Price per day</label>
            <input
              id="pricePerDay"
              name="pricePerDay"
              type="number"
              className="form-control"
              value={product.pricePerDay}
              onChange={handleChange}
            />
            {error.input === "pricePerDay" && (
              <div className="alert alert-danger"> {error.message}</div>
            )}
          </div>
        </div>
        <div className="add-product-second-step">
          <div className="form-group">
            <label htmlFor="image1" className="input-images-labels">
              import image 1
            </label>
            <input
              type="file"
              id="image1"
              name="image1"
              className="form-control images-input"
              reference={image1}
              onChange={hanndleImageChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="image2" className="input-images-labels">
              import image 2
            </label>
            <input
              type="file"
              id="image2"
              name="image2"
              className="form-control images-input"
              reference={image2}
              onChange={hanndleImageChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="image3" className="input-images-labels">
              import image 3
            </label>
            <input
              type="file"
              id="image3"
              name="image3"
              className="form-control images-input"
              reference={image3}
              onChange={hanndleImageChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="image4" className="input-images-labels">
              import image 4
            </label>
            <input
              type="file"
              id="image4"
              name="image4"
              className="form-control images-input"
              reference={image4}
              onChange={hanndleImageChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="tutorial">tutorial</label>
            <input
              id="tutorial"
              name="tutorial"
              type="text"
              className="form-control"
              value={product.tutorial}
              onChange={handleChange}
            />
            {error.input === "tutorial" && (
              <div className="alert alert-danger"> {error.message}</div>
            )}
          </div>
          <div className="formulaire-buttons">
            <Button
              variant="dark"
              className="add-product-buttons-submit"
              onClick={handleBack}
            >
              back
            </Button>
            <Button
              variant="warning"
              type="submit"
              className="add-product-buttons-submit"
              disabled={validate()}
            >
              submit
            </Button>
          </div>
        </div>
      </form>
    </>
  );
};
