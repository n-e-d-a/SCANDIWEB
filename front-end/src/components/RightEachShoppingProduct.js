import React, { useContext } from 'react'
import styled from 'styled-components';
import { WebContext } from '../context/webcontext';
// import { BoxSize } from '../pages/EachProduct';
import SimpleImageSlider from "react-simple-image-slider";


const Box = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const AddMinus = styled.div`
  height: 45px;
  width: 45px;
  font-weight: 50px;
  font-size: 50px;
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
  const {orders, setOrders, addOrder, removeOrder} = useContext(WebContext)
  const handleIncrement = () => {
    const newOrder = props.product
    addOrder(newOrder)
  }
  const handleDecrement = () => {
  
    removeOrder(props.product)
  }
  return (
    <div style={{display: 'flex'}}>
      <Box>
        <AddMinus style={{ marginBottom: 94 }} onClick={handleIncrement}>
          +
        </AddMinus>
        <div style={{ marginBottom: 30, marginTop: -60 , marginLeft:19}}>
          {props.product.amount}
        </div>
        <AddMinus onClick={handleDecrement}>-</AddMinus>
      </Box>
      <SimpleImageSlider
      // style={{zIndex:0}}
        width={200}
        height={200}
        images={props.images}
        showBullets={false}
        showNavs={true}
        navSize={30}
        navMargin={0}
      />
    </div>
  );
}

export default RightEachShoppingProduct