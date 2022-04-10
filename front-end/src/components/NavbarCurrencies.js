import React, { useState, useEffect, useContext } from "react";
// import fetchCurrencies from "../api/fetchCurrencies";
import styled from "styled-components";
import { WebContext } from "../context/webcontext";
import vectordown from "../images/Vector-down.svg"
import vectorup from "../images/Vector-up.svg"
const DropDownCurrency = styled.div`
  display: block;
  background-color: white;
  position: absolute;
  cursor: pointer;
`;
const Currency = styled.div`
  padding: 10px;
  &:hover{
    background-color: black;
    color: white;
  }
  `
const CurrencyMenu = styled.div`
  display: flex;
  width: 100px;
  justify-content: center;
  align-items: center;
  background-color: white;
`

const DropDownMenue = styled.div`
  display: block;
  position: absolute;
  margin-top: 2px;
  right: -45px;
  z-index: 0;
  li {
    text-decoration: none;
    list-style: none;
  }
`;

function NavbarCurrencies(props) {

  
  const [state,setState]=useState(false);
  const {currencys, setCurrencys,currentCurrency, setCurrentCurrency} = useContext(WebContext)

  useEffect(()=>{
    if(currencys.length != 0){
      setCurrentCurrency(currencys[0])
    }
  },[currencys])


  return (
    <div style={{display:'flex',marginBottom: '10px'}}>
        <img
                src={state ? vectorup : vectordown}
                alt="vector"
                width="10px"
                height="10px" 
                style={{marginLeft: '14px', marginTop: '5px',}}
                
        />
      <DropDownCurrency
        onMouseEnter={() => setState(true)}
        onMouseLeave={() => setState(false)}
      >
        {/* {datas[0].symbol  }  V */}
        <div style={{marginRight: '5px'}}>{currentCurrency != null && <>{currentCurrency.symbol}</>}</div>
       
        <DropDownMenue >
          {state ? (
            currencys.map((data, index) => (
              <CurrencyMenu>
                <Currency
                  onMouseEnter={() => setState(true)}
                  key={index}
                  onClick={() => setCurrentCurrency(data)}
                  style={{ cursor: "pointer" }}
                >
                  {data.symbol} {data.label}
                </Currency>
              </CurrencyMenu>
            ))
          ) : (
            <></>
          )}
        </DropDownMenue>
      </DropDownCurrency>
    </div>
  );
}

export default NavbarCurrencies