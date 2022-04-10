import React from "react";
import styled from "styled-components";
import {  SizePriceTitle } from "../pages/EachProduct";


const ProductBrand = styled.div`
  font-family: Raleway;
  font-size: 16px;
  font-style: normal;
  font-weight: 300;
  line-height: 25.6px;
  letter-spacing: 0em;
  text-align: left;
  margin-bottom: 16px;
`;

const ProductName = styled.div`
  font-family: Raleway;
  font-size: 16px;
  
  font-weight: 300;
  line-height: 25.6px;
  letter-spacing: 0em;
  text-align: left;
`;

const ProductPrices = styled.div`
  font-family: Raleway;
  font-size: 16px;
  font-weight: 500;
  line-height: 25.6px;
  text-align: left;
  margin-top: 5px;
  margin-bottom: 27px;
`;

const BoxSize = styled.div`
font-size: 10px;
font-weight: 300px;
  height: 24px;
  width: 24px;
  border: 1px solid black;
  display: flex;
  justify-content: center;
  /* margin-top: 8px; */
  margin-right: 8px;
  align-items: center;
  text-align: center;
  cursor: pointer;
  &:hover {
    background-color: black;
    color: white;
  }
`;

function LeftEachShoppingProduct(props) {
  return (
    <div>
      {/* <LeftShoppingCart> */}
      <ProductBrand>{props.brand}</ProductBrand>
      <ProductName>{props.name}</ProductName>
      <ProductPrices>
        {/* new line */}
        {props.currentCurrency != null && <>{props.currentCurrency.symbol}</>}
        {props.amount}
      </ProductPrices>

      {props.attributes.map((attribute, index) => (
        <>
          {/* <div style={{}}>{attribute.name}</div> */}
          <SizePriceTitle>
            {attribute.items.map((item, index) => (
              <BoxSize
                key={index}
                style={
                  props.selectedAttributes.some(
                    (selectedAttribute) =>
                      selectedAttribute.attributeName === attribute.name &&
                      selectedAttribute.selectedAttributeValue === item.value
                  )
                    ? { backgroundColor: "black", color: "white" }
                    : {}
                }
              >
                {item.displayValue}
              </BoxSize>
            ))}
          </SizePriceTitle>
        </>
      ))}

    </div>
  );
}

export default LeftEachShoppingProduct;
