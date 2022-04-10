import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import { WebContext } from "../context/webcontext";
// import { BoxSize } from "../pages/EachProduct";
import SimpleImageSlider from "react-simple-image-slider";

const Box = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: 0px;
`;

const AddMinus = styled.div`
  height: 24px;
  width: 24px;
  font-weight: 25px;
  font-size: 25px;
  border: 1px solid black;
  display: flex;
  justify-content: center;
  margin-right: 12px;
  align-items: center;
  text-align: center;
  cursor: pointer;
  &:hover {
    background-color: black;
    color: white;
  }
`;

function RightEachShoppingProduct(props) {
  const { orders, setOrders, addOrder, removeOrder } = useContext(WebContext);
  const handleIncrement = () => {
    const newOrder = props.product;
    addOrder(newOrder);
  };
  const handleDecrement = () => {
  
    removeOrder(props.product);
  };
  return (
    <>
      <Box>
        <AddMinus style={{ marginBottom: 50 }} onClick={handleIncrement}>
          +
        </AddMinus>
        <div style={{ marginBottom: 30, marginTop: -30, marginLeft: 10 }}>
          {props.product.amount}
        </div>
        <AddMinus onClick={handleDecrement}>-</AddMinus>
      </Box>
      <SimpleImageSlider
        width={85}
        height={85}
        images={props.images}
        showBullets={false}
        showNavs={true}
        navSize={18}
        navMargin={0}
      />
    </>
  );
}

export default RightEachShoppingProduct;
