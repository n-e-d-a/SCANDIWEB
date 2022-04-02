import React, { useState, useEffect, useContext } from "react";
import fetchProductData from "../api/fetchProductData";
// import EachProduct from "./EachProduct";
import Card from "../components/Card";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { WebContext } from "../context/webcontext";


const MainContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 40px;
  overflow-x: auto;
  margin-left: 100px;
  margin-bottom: 103px;
  text-decoration  :none ;
`;

const TitleWomen=styled.h2`
font-size: 42px;
font-weight: 400px;
margin-left: 101px;
margin-top: 80px;
`;

export default function Home() {
  // const [datas, setDatas] = useState([]);
  const { currencys,currentCurrency,currentCategory, setCurrentCategory, datas, setDatas } = useContext(WebContext)
  // useEffect(async () => {
  //   const mydata = await fetchProductData(currentCategory);
  //   setDatas(mydata);
  //   // console.log(datas);
  // }, []);
  useEffect(()=>{

  },[currentCurrency])
  return (
    <>
      <TitleWomen>{currentCategory}</TitleWomen>

      <MainContainer>
        {console.log(datas)}
        {datas.map((data, index) => (
          <div
            key={index}
            style={data.inStock ? { textDecoration: "none" } : { opacity:0.5}}
          >
            {!data.inStock && <div>out of stock</div>}
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
    </>
  );
}
