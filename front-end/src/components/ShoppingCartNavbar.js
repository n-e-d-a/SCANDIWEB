import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { WebContext } from "../context/webcontext";
// import LeftEachShoppingProduct from "../components/LeftEachShoppingProduct";
import LeftEachShopNav from "../components/LeftEachShopNav";
// import RightEachShoppingProduct from "../components/RightEachShoppingProduct";
import RightEachShopNav from "../components/RightEachShopNav";
import {  NavLink } from "react-router-dom";

const CartContainer = styled.div`
  text-align: left;
  margin-top: 10px;
  margin-left: 16px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 2rem;
  background-color: #ffffff;
  z-index: 2;
  `;

const Title = styled.div`
  font-family: Raleway;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  margin-left: 16px;
  margin-bottom: 5px;
  
`;


const Left = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  justify-content: space-between;
`;

const Right = styled.div`
  
  display: flex;
  justify-content: space-between;
  align-items: center;
 
`;

const Button = styled.button`
  padding: 12px 30px;
  margin-left: 13px;
  background-color: white;
 
`;

const Total=styled.div`

`;

const Main = styled.div`
`;

function ShoppingCart(props) {
  const { orders, currentCurrency, totalPrice } = useContext(WebContext);
  const [myprice, setMyprice] = useState(0);
  const [addedOrders, setAddedOrders] = useState([]);
  const [repeated, setRepeated] = useState(false);
  useEffect(() => {
    if (currentCurrency != null) {
      
      if (currentCurrency.label === "USD") {
        setMyprice(0);
      }
      if (currentCurrency.label === "GBP") {
        setMyprice(1);
      }
      if (currentCurrency.label === "AUD") {
        setMyprice(2);
      }
      if (currentCurrency.label === "JPY") {
        setMyprice(3);
      }
      if (currentCurrency.label === "RUB") {
        setMyprice(4);
      }
    }
  }, [currentCurrency]);
  useEffect(() => {}, [orders]);
  return (
    <Main>
      <Title>My Bag, {props.amount} items</Title>
      
      {orders.length != 0 && (
        <div>
          {orders.map((order, index) => (
            <>
              <CartContainer key={index}>
                <Left>
                 
                  <LeftEachShopNav
                    brand={order.brand}
                    name={order.name}
                    amount={order.prices[myprice].amount}
                    currentCurrency={currentCurrency}
                    attributes={order.attributes}
                    selectedAttributes={order.selectedAttributes}
                  />
                </Left>
                <Right>
                  <RightEachShopNav
                    image={order.gallery[0]}
                    product={order}
                    images={order.gallery}
                  />
                </Right>
              </CartContainer>
            </>
          ))}
        </div>
      )}
      <Title style={{ marginButtom: 38, marginTop: 50 }}>
        {" "}
        Total:{totalPrice}
      </Title>
      
      <NavLink to="/shoppingcart" style={{ textDecoration: "none", cursor: "pointer" }}>
        <Button style={{ marginLeft: 10, cursor: 'pointer' }}>
        
            {" "}
            VIEW BAG
        </Button>
      </NavLink>
      <Button
        style={{ backgroundColor: "#5ECE7B", color: "white", border: "none" }}
      >
        CHECK OUT
      </Button>
    </Main>
  );
}

export default ShoppingCart;
