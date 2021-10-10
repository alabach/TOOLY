import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Joi from "joi-browser";
import { useHistory, useParams } from "react-router-dom";
import Axios from "axios";
import "./MyProductEdit.css";

const MyProductEdit = () => {
  const history = useHistory();
  const { id } = useParams();
  //Product
  const [product, setproduct] = useState({
    name: "",
    reference: "",
    category: "",
    description: "",
    brand: "",
    tutorial: "",
    pricePerDay: 0,
  });
  //images
  const [image1, setimage1] = useState(React.createRef());
  const [image2, setimage2] = useState(React.createRef());
  const [image3, setimage3] = useState(React.createRef());
  const [image4, setimage4] = useState(React.createRef());
  //error
  const [error, seterror] = useState("");

  //Use-Effect
  useEffect(() => {
    const source = Axios.CancelToken.source();
    const fetchdata = async () => {
      try {
        const { data } = await Axios.get(`/products/${id}`, {
          cancelToken: source.token,
        });
        setproduct(data);
      } catch (error) {
        if (Axios.isCancel(error)) {
          console.log(error);
        } else {
          throw error;
        }
      }
    };

    fetchdata();

    return () => {
      source.cancel();
    };
  }, [id]);

  //Schema(Joi)
  const schema = {
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

  const editProduct = async ({
    tutorial,
    pricePerDay,
    category,
    description,
  }) => {
    const data = new FormData();
    if (image1 != null || image1 !== undefined) data.append("image1", image1);
    if (image2 != null || image2 !== undefined) data.append("image2", image2);
    if (image3 != null || image3 !== undefined) data.append("image3", image3);
    if (image4 != null || image4 !== undefined) data.append("image4", image4);
    data.append("tutorial", tutorial);
    data.append("pricePerDay", pricePerDay);
    data.append("category", category);
    data.append("description", description);

    try {
      await Axios.put(`/products/editproduct/${id}`, data);
    } catch (error) {
      console.log("probleme");
    }
  };
  //Handle-OnSubmit
  const handleSubmit = (e) => {
    e.preventDefault();
    editProduct(product);
    history.goBack();
  };

  //Handle-OnClick-Back
  const handleBack = () => {
    history.goBack();
  };

  return (
    <>
      <h1 className="edit-product-title">add new product</h1>
      <form className="edit-product-formulaire" onSubmit={handleSubmit}>
        <div className="edit-product-first-step">
          <div className="form-group">
            <label htmlFor="name">name</label>
            <input
              id="name"
              name="name"
              type="text"
              className="form-control"
              value={product.name}
              disabled={true}
            />
          </div>
          <div className="form-group">
            <label htmlFor="brand">brand</label>
            <input
              id="brand"
              name="brand"
              type="text"
              className="form-control"
              value={product.brand}
              disabled={true}
            />
          </div>
          <div className="form-group">
            <label htmlFor="reference">reference</label>
            <input
              id="reference"
              name="reference"
              type="text"
              className="form-control"
              value={product.reference}
              disabled={true}
            />
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
              <option value="Gardening">Gardning</option>
              <option value="DIY">DIY</option>
              <option value="Plombry">Plombry</option>
              <option value="Electricity">Electricity</option>
              <option value="Painting">Painting</option>
              <option value="Lighting">Lighting</option>
            </select>
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
        <div className="edit-product-second-step">
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
              className="edit-product-buttons-submit"
              onClick={handleBack}
            >
              back
            </Button>
            <Button
              variant="warning"
              type="submit"
              className="edit-product-buttons-submit"
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

export default MyProductEdit;
