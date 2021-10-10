import React from "react";
import { Col } from "react-bootstrap";
import { Card, Button } from "react-bootstrap";
import "./Product.css";

const Product = ({ product, handleonClick }) => {
  return (
    <Col sm={4} className="ihave">
      <Card className="card-have">
        <Card.Img
          className="card-image-have"
          variant="top"
          src={product.image}
        />
        <Card.Body className="card-body-have">
          <Card.Title className="card-labels-have">
            name : {product.name}
          </Card.Title>
          <Card.Title className="card-labels-have">
            reference : {product.reference}
          </Card.Title>
          <Card.Title className="card-labels-have">
            brand : {product.brand}
          </Card.Title>
          <Card.Title className="card-labels-have">
            category : {product.category}
          </Card.Title>
          <Card.Title className="card-labels-have">
            Price : {product.price}
          </Card.Title>
          <Button
            variant="warning"
            className="card-button-have"
            onClick={() => handleonClick(product._id)}
          >
            Show Details
          </Button>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default Product;
