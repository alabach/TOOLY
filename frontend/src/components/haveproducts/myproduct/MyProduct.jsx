import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { Card, Col, Button } from "react-bootstrap";

const MyProduct = ({ product, handleEditProduct, handleDeleteProduct }) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Delete Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this product ? this product won't be
          visible to site visitors
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              handleDeleteProduct(product._id);
              handleClose();
            }}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      <Col sm={3}>
        <Card className="card">
          <Card.Img className="card-image" variant="top" src={product.image} />
          <Card.Body className="card-body">
            <Card.Title className="card-labels">
              name : {product.name}
            </Card.Title>
            <Card.Title className="card-labels">
              reference : {product.reference}
            </Card.Title>
            <Card.Title className="card-labels">
              brand : {product.brand}
            </Card.Title>
            <Card.Title className="card-labels">
              category : {product.category}
            </Card.Title>
            <Card.Title className="card-labels">
              Price : {product.price}
            </Card.Title>
            <Button
              variant="warning"
              className="card-button"
              onClick={() => handleEditProduct(product._id)}
            >
              Edit
            </Button>
            <Button
              variant="danger"
              className="card-button"
              onClick={handleShow}
            >
              Delete
            </Button>
          </Card.Body>
        </Card>
      </Col>
    </>
  );
};

export default MyProduct;
