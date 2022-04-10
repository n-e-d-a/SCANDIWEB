import React, { useContext, useState, useEffect } from "react";
import {  useLocation } from "react-router-dom";
import styled from "styled-components";
import { WebContext } from "../context/webcontext";


const SingleProduct = styled.section`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  overflow-x: auto;
  margin-top: 60px;
`;

const LeftSection = styled.div`
  display: flex;
  gap: 10px;
  .li {
    text-decoration: none;
    list-style: none;
  }
`;

const MainSection = styled.div``;

const RightSection = styled.div`
  margin-left: 100px;
`;

const ProductID = styled.div`
  font-size: 30px;
  font-weight: 600;
  line-height: 27px;
  letter-spacing: 0em;
  text-align: left;
`;

const ProductName = styled.div`
  font-size: 30px;
  font-weight: 400;
  line-height: 27px;
  letter-spacing: 0em;
  text-align: left;
  margin-top: 16px;
`;

export const SizePriceTitle = styled.div`
display: flex;

  font-family: Roboto Condensed;
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: 18px;
  letter-spacing: 0em;
  text-align: left;
  margin-top: 43px;
`;

export const BoxSize = styled.div`
  height: 45px;
  width: 63px;
  border: 1px solid black;
  display: flex;
  justify-content: center;
  /* margin-top: 8px; */
  margin-right: 12px;
  align-items: center;
  text-align: center;
  cursor: pointer;
  &:hover{
    background-color: black;
    color: white;
  }
`;


const Price = styled.div`
  font-family: Raleway;
  font-size: 24px;
  font-weight: 700;
  line-height: 18px;
  letter-spacing: 0em;
  text-align: left;
  margin-top: 20px;
`;

const Button = styled.button`
  padding: 16px 93.5px;
  background-color: #5ece7b;
  margin-top: 20px;
  color: white;
  border: none;
  /* cursor: pointer; */
  &:hover {
    background-color: #55bb6f;
  }
`;

const Description = styled.p`
  font-family: Roboto;
  font-size: 16px;
  font-weight: 400;
  line-height: 26px;
  letter-spacing: 0em;
  text-align: left;
  height: 103px;
  width: 292px;
  margin-top: 40px;
`;

const AttributeTitle = styled.div`
  font-family: Roboto Condensed;
  font-size: 18px;
  font-weight: 700;
  line-height: 18px;
  letter-spacing: 0em;
  text-align: left;
  margin-top:43px;
  margin-bottom: -20px;
`;

const Attribute=styled.div`
display: flex;
flex-direction: column;
`;

function EachProduct() {
  const location = useLocation();
  const product = location.state?.product;
  const { state, currentCurrency, setCurrentCurrency, orders, setOrders, addOrder } =
    useContext(WebContext);
  const [currentImage, setCurrentImage] = useState(product.gallery[0]);
  const [myprice, setMyprice] = useState("");
  const [selectedAttributes, setSelectedAttributes] = useState([]);
  // const [selectedAttr, setSelectedAttr] = useState(null)
  useEffect(() => {
    if (currentCurrency != null) {
      // console.log(currentCurrency.label);
      if (currentCurrency.label === "USD") {
        setMyprice(product.prices[0].amount);
      }
      if (currentCurrency.label === "GBP") {
        setMyprice(product.prices[1].amount);
      }
      if (currentCurrency.label === "AUD") {
        setMyprice(product.prices[2].amount);
      }
      if (currentCurrency.label === "JPY") {
        setMyprice(product.prices[3].amount);
      }
      if (currentCurrency.label === "RUB") {
        setMyprice(product.prices[4].amount);
      }
    }
  }, [currentCurrency]);
  const handleOrder = () => {
    if (product.inStock){
      const newProduct = {
        ...product,
        selectedAttributes,
      };
      addOrder(newProduct)
    }
  };
  const handleAttributeSelect = (name, value) => {
      const attr = selectedAttributes.find(selectedAttribute=> selectedAttribute.attributeName === name)
      if (attr === null){
        setSelectedAttributes([
        ...selectedAttributes,
        {
          attributeName: name,
          selectedAttributeValue: value,
        },
      ]);}else{
        const newAttr = {
          attributeName: name,
          selectedAttributeValue: value
        }
        const newSelectedAttributes = selectedAttributes.filter(function (selectedAttribute) {
          return selectedAttribute.attributeName != name;
        });
        setSelectedAttributes([...newSelectedAttributes, newAttr])
      }
      
  };
 
  return (
    <div style={state? {opacity: '60%', pointerEvents: 'none'}: {}}>
      <SingleProduct>
        <LeftSection>
          <ul>
            {product.gallery.map((image, index) => (
              <li
                style={{ listStyleType: "none" }}
                onClick={() => setCurrentImage(image)}
              >
                <img src={image} alt="" width="100" height="100" />
              </li>
            ))}
          </ul>
        </LeftSection>
        <MainSection>
          {" "}
          <img src={currentImage} alt="" width="800" height="600" />{" "}
        </MainSection>
        <RightSection>
          <ProductID>{product.id}</ProductID>
          <ProductName>{product.name}</ProductName>
          {product.attributes.map((attribute, index) => (
            <Attribute>
              <AttributeTitle>{attribute.name}</AttributeTitle>
              {/* {() => setSelectedAttr(selectedAttributes.find(selectedAttribute=>selectedAttribute.attributeName === attribute.name))} */}
              {/* {console.log(selectedAttr)} */}
              <SizePriceTitle key={index}>
                {attribute.items.map((item, index) => (
                  <BoxSize
                    key={index}
                    onClick={() =>
                      handleAttributeSelect(attribute.name, item.value)
                    }
                    style={
                      selectedAttributes.some(
                        (selectedAttribute) =>
                          selectedAttribute.attributeName === attribute.name &&
                          selectedAttribute.selectedAttributeValue ===
                            item.value
                      )
                        ? { backgroundColor: "black", color: "white" }
                        : {}
                    }
                  >
                    {item.displayValue}
                  </BoxSize>
                ))}
              </SizePriceTitle>
            </Attribute>
          ))}
          <SizePriceTitle>PRICE:</SizePriceTitle>
          <Price>
            {myprice} {currentCurrency != null && <>{currentCurrency.symbol}</>}
          </Price>
          {/* {console.log(product.inStock)} */}
          <Button
            onClick={handleOrder}
            style={product.inStock ? { cursor:"pointer" } : { cursor: "not-allowed" }}
          >
            ADD TO CART
          </Button>
          <Description
            dangerouslySetInnerHTML={{ __html: product.description }}
          />
        </RightSection>
      </SingleProduct>
    </div>
  );
}

export default EachProduct;
