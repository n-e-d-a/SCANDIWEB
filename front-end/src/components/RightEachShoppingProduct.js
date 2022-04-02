import React, { useContext, useEffect } from 'react'
import styled from 'styled-components';
import { WebContext } from '../context/webcontext';
import { BoxSize } from '../pages/EachProduct';
import SimpleImageSlider from "react-simple-image-slider";


const Box = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: 20px;
`;

function RightEachShoppingProduct(props) {
  const {orders, setOrders, addOrder, removeOrder} = useContext(WebContext)
  const handleIncrement = () => {
    const newOrder = props.product
    addOrder(newOrder)
  }
  const handleDecrement = () => {
    // const exists = orders.some(order =>( order === props.product))
    // console.log(exists)
    // console.log(myOrder)
    // console.log("passing product",props.product)
    removeOrder(props.product)
  }
  return (
    <>
      <Box>
        <BoxSize
          style={{
            width: 45,
            height: 45,
            marginBottom: 94,
            fontSize: 50,
            fontWeight: 50,
            cursor: 'pointer'
          }}
          onClick={handleIncrement}
        >
          +
        </BoxSize>
        <div style={{marginBottom: 30}}>{props.product.amount}</div>
        <BoxSize
          style={{ width: 45, height: 45, fontSize: 50, fontWeight: 50, cursor: 'pointer' }}
          onClick={handleDecrement}
        >
          -
        </BoxSize>
      </Box>
        <SimpleImageSlider
        width={200}
        height={200}
        images={props.images}
        showBullets={true}
        showNavs={true}
        />
    </>
  );
}

export default RightEachShoppingProduct