import React, {useState, useEffect, useContext} from "react";
import fetchData from "../api/fetchData";
import logo from "../images/logo.svg";
import shop from "../images/shop.svg";
// import { Link } from "react-router-dom";
import { NavLink, useNavigate } from "react-router-dom";
import NavbarCurrencies from "./NavbarCurrencies";
import styled from "styled-components";
import { WebContext } from "../context/webcontext";
// import ShoppingCart from "../pages/ShoppingCart";
import ShoppingCartNavbar from "./ShoppingCartNavbar"

const NavbarContainer = styled.div`
  flex: 1;
  display: flex;
  position: sticky;
  padding: 0px 88px 32px 90px;
  justify-content: space-between;
  margin-top: 30px;
  /* margin-bottom: 40px; */
 `;

 const NavbarMenue = styled.div`
   display: flex;
   width: 100%;
   justify-content: space-between;
   align-items: center;
 `;

export const NavbarLink = styled(NavLink)`
  font-weight: 400px;
  text-decoration: none;
  margin: 16px;
  cursor: pointer;
  &:hover {
    color: #5ece7b;
    border-bottom: 2px solid #5ece7b;
    padding-bottom: 30px;
  }
  &:active {
    color: #5ece7b;
    border-bottom: 2px solid #5ece7b;
    padding-bottom: 30px;
  }
`;

const NavbarShopCart = styled.div`
  margin-right: 180px;
  top: 50px;
  height: 400px;
  width: 325px;
  max-height: 540px;
  overflow-y: scroll;
  overflow-x:hidden;
  background-color: #ffffff;
  display: block;
  position:absolute; 
  border: 1px solid black;
  z-index: 2;
`;

const Right=styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

`;

const NavCurrency = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 80px;
  margin-bottom: 5px;
  position: absolute;
`;
const Amount = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: black;
  text-align: center;
  padding-bottom: 2px;
  color: white;
  width: 22px;
  border-radius: 50px;
  position: absolute;
  z-index: 3;
  height: 22px;
  margin-left: 40px;
  margin-bottom: 25px;
`
const Center = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 120px;
`;
const Categories = styled.div`
  
`

export default function Navbar(){
    const {orders, currentCategory, setCurrentCategory, currentCurrency, setCurrentCurrency, state, setState} = useContext(WebContext)
    const [datas, setDatas] = useState([]);
    const [shopAmount, setShopAmount] = useState(0);
    const navigate = useNavigate();
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
    useEffect(()=>{
      navigate(`/${currentCategory}`)
    },[currentCategory])
    return (
      <NavbarContainer>
        <NavbarMenue>
          <Categories style={state? {opacity: '60%', pointerEvents: 'none'}: {}}>
            {datas.map((data, index) => (
              <NavbarLink
                key={index}
                onClick={() => {setCurrentCategory(data.name)}}
                style={
                  data.name === currentCategory
                    ? {
                        color: "#5ece7b",
                        borderBottom: "2px solid #5ece7b",
                        paddingBottom: "30px",
                      }
                    : {}
                }
                to="/"
              >
                {data.name.toUpperCase()}
              </NavbarLink>
            ))}
          </Categories>
          <Center to="/" style={state? {opacity: '60%', pointerEvents: 'none'}: {}}>
            <NavbarLink to="/">
              <img
                src={logo}
                alt="logo"
                width="41px"
                height="41px"
              />
            </NavbarLink>
          </Center>

          <Right>
            <NavCurrency style={state? {opacity: '60%', pointerEvents: 'none'}: {}}>
              <NavbarCurrencies />
            </NavCurrency>
            
            {shopAmount > 0 && <Amount>{shopAmount}</Amount>}
            <div
              onClick={() => setState(!state)}
              style={{position: 'absolute'}}
              // onMouseOut={() => setState(!state)}
            >
              <img src={shop} alt="shop" width="25px" height="25px" style={{cursor:'pointer', marginLeft: '15px'}}/>
            </div>
            {!state ? (
                <></>
                ) : (
                <NavbarShopCart>
                  <ShoppingCartNavbar amount={shopAmount} />
                </NavbarShopCart>
            )}
           
          </Right>
        </NavbarMenue>
      </NavbarContainer>
    );
}

