import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { WebContext } from "../context/webcontext";
import LeftEachShoppingProduct from "../components/LeftEachShoppingProduct";
import RightEachShoppingProduct from "../components/RightEachShoppingProduct";
import { useNavigate } from "react-router-dom";

const CartContainer = styled.div`
  text-align: left;
  margin-top: 80px;
  margin-left: 100px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 2rem;
  margin-right: 243px;
`;

const CartTitle = styled.div`
  font-family: Raleway;
  font-size: 32px;
  font-style: normal;
  font-weight: 700;
  line-height: 40px;
  letter-spacing: 0em;
  margin-top: 80px;
  margin-left: 100px;
  margin-right: 243px;
`;

const Line = styled.div`
  margin-left: 100px;
  margin-right: 243px;
`;

const Wrapper = styled.div`
  margin-top: 20px;
  margin-bottom: 20px;
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
  z-index: 0;
`;


function ShoppingCart() {
  const { state, orders, currentCurrency } = useContext(WebContext);
  const [myprice, setMyprice] = useState(0);
  const [addedOrders, setAddedOrders] = useState([]);
  const [repeated, setRepeated] = useState(false)
  const navigate = useNavigate()
  useEffect(() => {
    if (currentCurrency != null) {
      // console.log(currentCurrency.label);
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
  useEffect(()=>{

  },[orders])
  useEffect(() => {
    navigate('/shoppingcart')
  },[])
  return (
    <div style={state? {opacity: '60%', pointerEvents: 'none'}: {}}>
      {/* <CartTitle>
        CART
        <hr />
      </CartTitle> */}
      <Wrapper />

      {/* <Left> */}
      {orders.length != 0 && (
        <div>
          {orders.map((order, index) => (
            <>
              <CartContainer key={index}>
                <Left>
                  <LeftEachShoppingProduct
                    brand={order.brand}
                    name={order.name}
                    amount={order.prices[myprice].amount}
                    currentCurrency={currentCurrency}
                    attributes={order.attributes}
                    selectedAttributes={order.selectedAttributes}
                  />
                </Left>
                <Right>
                  <RightEachShoppingProduct
                    image={order.gallery[0]}
                    product={order}
                    images={order.gallery}
                  />
                </Right>
              </CartContainer>
              <Line>
                <hr />
              </Line>
            </>
          ))}
        </div>
      )}
    </div>
  );
}

export default ShoppingCart;
