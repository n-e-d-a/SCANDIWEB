// import { Link } from "react-router-dom";
import React, {useState, useEffect, useContext} from "react";
import fetchData from "../api/fetchData";
import logo from "../images/logo.svg";
import shop from "../images/shop.svg";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import NavbarCurrencies from "./NavbarCurrencies";
// import styled from "styled-components"
//  import { NavLink } from "react-router-dom";
 import { NavbarContainer,
   LeftContainer,
   RightContainer,
   CenterContainer,
   NavbarInnerContainer,
   NavbarLink, 
   NavbarCategory
} 
from "../styles/Navbar.style";
import { WebContext } from "../context/webcontext";
import ShoppingCart from "../pages/ShoppingCart";

export default function Navbar(){
    const {orders, currentCategory, setCurrentCategory, currentCurrency, setCurrentCurrency} = useContext(WebContext)
    const [datas, setDatas] = useState([]);
    const [state, setState] = useState(false);
    const [shopAmount, setShopAmount] = useState(0);
    // const [clicked, setClicked] = useState(false)
    useEffect(async () => {
      const mydata = await fetchData(currentCategory);
      setDatas(mydata);
    }, []);
    useEffect(() =>{
      var amount = 0
      orders.forEach(function(order){
        amount = amount + order.amount
      })
      setShopAmount(amount)
    },[orders])
    return (
      <NavbarContainer>
        {/* {console.log(datas[0])} */}

        <NavbarInnerContainer>
          <LeftContainer>
            {datas.map((data, index) => (
              <NavbarLink
                key={index}
                onClick={() => setCurrentCategory(data.name)}
                to="/"
              >
                {data.name}
              </NavbarLink>
            ))}
          </LeftContainer>
          <CenterContainer to="/">
            <NavbarLink to="/">
              <img src={logo} alt="logo" width="41px" height="41px" />
            </NavbarLink>
          </CenterContainer>
          <RightContainer style={{display:'flex'}}>
            <NavbarCurrencies/>
            <div style={{display:'flex'}}>
              {/* <Link to="/shoppingcart"> */}
                {shopAmount > 0 && <div>{shopAmount}</div>}
                <div 
                  onClick={()=>setState(!state)}
                >
                <img src={shop} alt="shop" width="25px" height="25px" />
                </div>
              {/* </Link> */}
            {!state ? <></>:
            <div style={{transform: 'scale(0.4,0.4)', height:400, overflowY: 'scroll' ,marginTop:400}}>
              <ShoppingCart style={{}}/>
              </div>}
            </div>

          </RightContainer>
        </NavbarInnerContainer>

        {/* <ul>
          <li>
            <NavLink activeClassName="active" to="/women">
               WOMEN
            </NavLink>
          </li>
          <li>
            <NavLink to="/men"> MEN </NavLink>
          </li>
          <li>
            <NavLink to="/kids"> KIDS </NavLink>
          </li>
        </ul>
        <NavLink to="/">
          <img src={logo} alt="logo" width="41px" height="41px" />
        </NavLink> */}
      </NavbarContainer>
    );
}

