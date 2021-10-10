import React, { useState } from "react";
import { Table, Button } from "react-bootstrap";
import { BsFillTrashFill } from "react-icons/bs";
import { useHistory, useRouteMatch } from "react-router-dom";
import "./CartDetails.css";

const CartDetails = () => {
  const history = useHistory();
  const { url } = useRouteMatch();
  const [products, setproducts] = useState(
    JSON.parse(localStorage.getItem("products")) || []
  );
  const [totalprice, settotalprice] = useState(
    products.reduce((sum, { totalprice }) => sum + totalprice, 0) || 0
  );

  const handleDelete = (id) => {
    const newProducts = products.filter((product) => product._id !== id);
    setproducts(newProducts);
    settotalprice(
      newProducts.reduce((sum, { totalprice }) => sum + totalprice, 0)
    );
  };

  const handleClearAll = () => {
    setproducts([]);
    //local-storage
    localStorage.removeItem("products");
    localStorage.removeItem("totalPrice");
  };

  const handleCheckout = () => {
    localStorage.setItem("totalPrice", totalprice);
    localStorage.setItem("products", JSON.stringify(products));
    history.push(`${url}/shippingadress`);
  };

  return (
    <>
      <div className="Cart-details">
        <h1>Cart Details</h1>
        {products.length > 0 ? (
          <Table borderless hover>
            <thead>
              <tr>
                <th>reference</th>
                <th>name</th>
                <th>image</th>
                <th>period</th>
                <th>price per day</th>
                <th>price</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>{product.reference}</td>
                  <td>{product.name}</td>
                  <td>
                    <img
                      src={product.img}
                      className="img-thumbnail"
                      alt={product.name}
                    />
                  </td>
                  <td>{`${product.startDate} --- ${product.endDate}`}</td>
                  <td>{product.pricePerDay}dt</td>
                  <td>{product.totalprice}dt</td>
                  <td>
                    <Button
                      variant="danger"
                      onClick={() => handleDelete(product._id)}
                    >
                      <BsFillTrashFill />
                    </Button>
                  </td>
                </tr>
              ))}
              <tr className="total-price">
                <td colSpan="5">total price</td>
                <td colSpan="2">{totalprice} DT</td>
              </tr>
            </tbody>
          </Table>
        ) : (
          <h1>No Products</h1>
        )}

        <div className="buttons">
          <Button
            variant="danger"
            onClick={handleClearAll}
            disabled={products.length < 1}
          >
            Clear All
          </Button>
          <Button
            variant="warning"
            onClick={handleCheckout}
            disabled={products.length < 1}
          >
            Checkout
          </Button>
        </div>
      </div>
    </>
  );
};

export default CartDetails;
