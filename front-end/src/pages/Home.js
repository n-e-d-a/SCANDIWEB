import React, { useEffect, useContext } from "react";
// import fetchProductData from "../api/fetchProductData";
// import EachProduct from "./EachProduct";
import Card from "../components/Card";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { WebContext } from "../context/webcontext";


const MainContainer = styled.div`
  flex: 1;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-items: center;
  gap: 40px;
  overflow-x: auto;
  margin-left: 100px;
  margin-bottom: 103px;
  text-decoration  :none ;
  position: relative;
  z-index: 0;
`;

const Title=styled.h2`
font-size: 42px;
font-weight: 400px;
margin-left: 101px;
margin-top: 80px;
text-decoration: none;
`;

const OutOfStock = styled.div`
  position: absolute;
  padding-top: 190px;
  padding-left: 120px;
  font-family: Raleway;
  font-size: 24px;
  font-weight: 400;
  line-height: 38px;
  letter-spacing: 0px;
  text-align: left;
`;

export default function Home() {
  
  const { currencys,currentCurrency,currentCategory, setCurrentCategory, datas, setDatas, state } = useContext(WebContext)
  
  useEffect(()=>{

  },[currentCurrency])
  return (
    <div style={state? {opacity: '60%', pointerEvents: 'none', zIndex: 0}: {}}>
      <Title>{currentCategory.toUpperCase()}</Title>

      <MainContainer>
        {console.log(datas)}
        {datas.map((data, index) => (
          <div
            key={index}
            style={data.inStock ? { textDecoration: "none" } : { opacity: 0.5 }}
          >
            {!data.inStock && (
              <OutOfStock >out of stock</OutOfStock>
            )}
            <Link to="/product" state={{ product: data }}>
              <Card
                title={data.name}
                imageUrl={data.gallery}
                price={data.prices}
                product={data}
              />
            </Link>
          </div>
        ))}
      </MainContainer>
    </div>
  );
}
