import React from 'react'
import styled from 'styled-components';
import { BoxSize, SizePriceTitle } from '../pages/EachProduct';

 const ProductBrand = styled.div`
   font-family: Raleway;
   font-size: 30px;
   font-style: normal;
   font-weight: 600;
   line-height: 27px;
   letter-spacing: 0em;
   text-align: left;
   margin-bottom: 16px;
 `;

 const ProductName = styled.div`
   font-family: Raleway;
   font-size: 30px;
   font-style: normal;
   font-weight: 400;
   line-height: 27px;
   letter-spacing: 0em;
   text-align: left;
 `;

 const ProductPrices = styled.div`
   font-family: Raleway;
   font-size: 24px;
   font-style: normal;
   font-weight: 700;
   line-height: 18px;
   letter-spacing: 0em;
   text-align: left;
   margin-top: 12px;
   margin-bottom: 12px;
 `;

function LeftEachShoppingProduct(props) {
  return (
    <div>
     
      <ProductBrand>{props.brand}</ProductBrand>
      <ProductName>{props.name}</ProductName>
      <ProductPrices>
        {/* new line */}
        {props.currentCurrency != null && <>{props.currentCurrency.symbol}</>}
        {props.amount}
      </ProductPrices>

      {props.attributes.map((attribute, index) => (
        <>
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