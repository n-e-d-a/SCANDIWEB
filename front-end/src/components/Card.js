import React from 'react'
import styled from 'styled-components';
import { useContext, useState, useEffect } from 'react';
import { WebContext } from '../context/webcontext';
import shop from "../images/cart-circule.svg";
import { Link } from 'react-router-dom';

const ContainerCard = styled.div`
  overflow: hidden;
  /* box-shadow: 0px 0px 15px -5px; */
  height: 444px;
  width: 386px;
  /* left: 0px;
  top: 0px; */
  border-radius: 0px;
  padding: 16px;
  &:hover {
    box-shadow: 0px 4px 35px 0px #a8acb030;

    cursor: pointer;
  }
`;
const ImageContainer = styled.div`
  overflow: hidden;
  /* height: 338px;
  width: 356px; */
  left: 0px;
  top: -5px;
  border-radius: 0px;
`;

const CardContent=styled.div`
margin: 1rem;
margin-top: 0.5rem;

`;

const CardTitle = styled.div`
  /* margin-bottom: 0.5rem; */
  font-family: Raleway;
  font-size: 18px;
  font-style: normal;
  font-weight: 300;
  line-height: 29px;
  letter-spacing: 0px;
  text-align: left;
  height: 29px;
  width: 354px;
  left: 0px;
  top: 0px;
  /* border-radius: nullpx; */
`;

const CardBody = styled.div`
  //styleName: --price-regular-font;
  font-family: Raleway;
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: 29px;
  letter-spacing: 0em;
  text-align: left;
  height: 29px;
  width: 58px;
  left: 0px;
  top: 0px;
  /* border-radius: nullpx; */
`;

function Card(props) {
  const [myprice, setMyprice] = useState("");
  const [showShoppingBag, setShowShoppingBag] = useState(false);
  const { currentCurrency, setCurrentCurrency } = useContext(WebContext);
  const handleOrder = () => {

  }
  useEffect(()=>{
    if (currentCurrency != null) {
      // console.log(currentCurrency.label)
      if (currentCurrency.label === 'USD') {
        setMyprice(props.price[0].amount);
      }
      if (currentCurrency.label === "GBP") {
        setMyprice(props.price[1].amount);
      }
      if (currentCurrency.label === "AUD") {
        setMyprice(props.price[2].amount);
      }
      if (currentCurrency.label === "JPY") {
        setMyprice(props.price[3].amount);
      }
      if (currentCurrency.label === "RUB") {
        setMyprice(props.price[4].amount);
      }
    }
  },[currentCurrency])
  return (
    <ContainerCard
      onMouseEnter={() => setShowShoppingBag(true)}
      onMouseLeave={() => setShowShoppingBag(false)}
    >
      <ImageContainer onClick={() => handleOrder()}>
        <img src={props.imageUrl} alt={props.id} width={356} height={338} />
      </ImageContainer>
      <CardContent>
        {showShoppingBag && (
            <img src={shop}></img>
        )}
        <CardTitle>{props.title}</CardTitle>
        <CardBody>
          {currentCurrency != null && <>{currentCurrency.symbol}</>}
          {myprice}
        </CardBody>
      </CardContent>
    </ContainerCard>
  );
}

export default Card

