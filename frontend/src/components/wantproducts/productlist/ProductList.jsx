import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Product from "../product/Product";
import { useHistory, useRouteMatch } from "react-router-dom";

import Axios from "axios";
import "./ProductList.css";

const ProductList = () => {
  const [user_id, setuser_id] = useState("507e3725f430a2101068f1cf");
  const [brands, setbrands] = useState([]);
  const [categories, setCategories] = useState([
    "diy",
    "gardening",
    "electricity",
    "plombery",
    "lighting",
    "all",
  ]);
  const [maxPrice, setmaxPrice] = useState(0);
  const [minPrice, setminPrice] = useState(0);
  const [brand, setbrand] = useState("all");
  const [category, setcategory] = useState("all");

  const [products, setproducts] = useState([]);

  const { path, url } = useRouteMatch();
  const history = useHistory();

  useEffect(() => {
    const source = Axios.CancelToken.source();

    const fetchdatabrands = async () => {
      try {
        const { data } = await Axios.get("/products/allbrands", {
          cancelToken: source.token,
        });
        setbrands(data);
      } catch (error) {
        if (Axios.isCancel(error)) {
          console.log("component will unmount");
        } else {
          throw error;
        }
      }
    };

    const fetchdataproduct = async () => {
      try {
        if (
          brand === "all" &&
          category === "all" &&
          minPrice === 0 &&
          maxPrice === 0
        ) {
          const { data } = await Axios.get(`/products/all/${user_id}`, {
            cancelToken: source.token,
          });
          setproducts(data);
          source.cancel();
        } else {
          const { data } = await Axios.get(
            `/products/all/filtred/${user_id}?category=${category}&brand=${brand}&minprice=${minPrice}&maxprice=${maxPrice}`,
            {
              cancelToken: source.token,
            }
          );
          setproducts(data);
        }
      } catch (error) {
        if (Axios.isCancel(error)) {
          console.log("error");
        } else {
          throw error;
        }
      }
    };

    fetchdatabrands();
    fetchdataproduct();

    return () => {
      console.log("unmount");
      source.cancel();
    };
  }, [brand, category, maxPrice, minPrice, user_id]);

  const handleOnChange = (e) => {
    if (e.currentTarget.name === "category") setcategory(e.currentTarget.value);
    if (e.currentTarget.name === "brand") setbrand(e.currentTarget.value);
    if (e.currentTarget.name === "minPrice") setminPrice(e.currentTarget.value);
    if (e.currentTarget.name === "maxPrice") setmaxPrice(e.currentTarget.value);
  };

  const handleonClick = (id) => {
    history.push(`/iwant/productdetails/${id}`);
  };

  return (
    <>
      <Container fluid>
        <Row className="list-product-row">
          <Col sm={3}>
            <div className="list-product-row-filters">
              <div className="brand-filter">
                <h1>Brand</h1>
                {brands.map((branditem) => (
                  <div key={branditem}>
                    <input
                      className="radio"
                      type="radio"
                      name="brand"
                      id="brand"
                      value={branditem}
                      onChange={(e) => handleOnChange(e)}
                    />
                    <label className="label" htmlFor="brand">
                      {branditem}
                    </label>
                  </div>
                ))}
              </div>
              <div className="category-filter">
                <h1>category</h1>
                {categories.map((categoryitem) => (
                  <div key={categoryitem}>
                    <input
                      className="radio"
                      type="radio"
                      name="category"
                      id="category"
                      value={categoryitem}
                      onChange={(e) => handleOnChange(e)}
                    />
                    <label className="label" htmlFor="category">
                      {categoryitem}
                    </label>
                  </div>
                ))}
              </div>
              <div className="price-filter">
                <h1>price</h1>
                <label htmlFor="minPrice">Min price :</label>
                <input
                  className="price-input-min"
                  type="number"
                  name="minPrice"
                  id="minPrice"
                  value={minPrice}
                  onChange={(e) => handleOnChange(e)}
                />

                <label htmlFor="maxPrice">Max price :</label>
                <input
                  className="price-input-max"
                  type="number"
                  name="maxPrice"
                  id="maxPrice"
                  value={maxPrice}
                  onChange={(e) => handleOnChange(e)}
                />
              </div>
            </div>
          </Col>
          <Col sm={9}>
            <Container fluid className="p-0 ">
              <Row className="row-all-products">
                {products.map((product) => (
                  <Product
                    key={product._id}
                    product={product}
                    handleonClick={handleonClick}
                  />
                ))}
              </Row>
            </Container>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ProductList;
