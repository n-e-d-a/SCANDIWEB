import React, { useState, useEffect, useContext } from "react";
import fetchCurrencies from "../api/fetchCurrencies";
import styled from "styled-components";
import { WebContext } from "../context/webcontext";

const DropDownCurrency = styled.div`
margin-top: 100px;

`;

const DropDownMenue = styled.div``;

function NavbarCurrencies(props) {

  // const [datas, setDatas] = useState([]);
  const [state,setState]=useState(false);
  const {currencys, setCurrencys,currentCurrency, setCurrentCurrency} = useContext(WebContext)

  // useEffect(async () => {
  //   const mydata = await fetchCurrencies();
  //   setDatas(mydata)
  // }, []);
  useEffect(()=>{
    if(currencys.length != 0){
      setCurrentCurrency(currencys[0])
    }
  },[currencys])


  return (
    <div>
      <DropDownCurrency
        onMouseEnter={() => setState(true)}
        onMouseLeave={() => setState(false)}
      >
        {/* {datas[0].symbol  }  V */}
        {currentCurrency != null && <>{currentCurrency.symbol}</>}
        <DropDownMenue>
          {state ? (
            currencys.map((data, index) => (
              <div>
                <li
                  onMouseEnter={() => setState(true)}
                  //   onClick={() => {
                  //     {data.label};
                  //    {data.symbol};
                  //   }}
                  key={index}
                  onClick={() => setCurrentCurrency(data)}
                  style={{ cursor: "pointer" }}
                >
                  {data.symbol} {data.label}
                </li>
              </div>
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