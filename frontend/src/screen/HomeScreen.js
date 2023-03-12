import React, { useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import Product from "../component/Product";
import Loader from "../component/Loader";
import Message from "../component/Message";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/productActions";
import { useParams } from "react-router-dom";

const HomeScreen = () => {
  const dispatch = useDispatch();

  const { keyword } = useParams();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  useEffect(() => {
    dispatch(listProducts(keyword));
  }, [dispatch, keyword]);

  return (
    <>
      <h1>LATEST PRODUCTS</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          {products?.map((product) => (
            <Col key={product._id} sm={12} lg={4} md={6} xl={3}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
      )}
    </>
  );
};

export default HomeScreen;
