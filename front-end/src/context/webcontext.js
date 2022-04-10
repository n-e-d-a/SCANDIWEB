import { createContext, useState, useEffect } from "react";
import fetchCurrencies from "../api/fetchCurrencies";
// import fetchData from "../api/fetchData";
import fetchProductData from "../api/fetchProductData";

export const WebContext = createContext();

const WebProvider = ({ children }) => {
  const [currentCurrency, setCurrentCurrency] = useState();
  const [currentCategory, setCurrentCategory] = useState('all');
  const [state, setState] = useState(false);
  const [totalPrice, setTotalPrice] = useState(() => {
    const price = localStorage.getItem("totalPrice")
    const initialValue = JSON.parse(price)
    return initialValue || 0;
  })
  const [amount, setAmount] = useState(1)
  const [orders, setOrders] = useState(() => {
  // getting stored value
  const savedorders = localStorage.getItem("orders");
  const initialValue = JSON.parse(savedorders);
  return initialValue || [];
  })
  const [datas, setDatas] = useState([]);
  const [currencys, setCurrencys] = useState([]);
  const comparison = (obj1, obj2) => {
    for (let item in obj1) {
      if (obj1[item] !== obj2[item]) {
        return false;
      }
    }
    return true;
  };
  const addOrder = (newProduct) => {
    const newPrice = totalPrice + newProduct.prices[0].amount
    setTotalPrice(newPrice)
    localStorage.setItem("totalPrice", JSON.stringify(newPrice));
    // console.log(newPrice)
    const exists = orders.some(order=> order.id === newProduct.id && comparison(order.selectedAttributes, newProduct.selectedAttributes)===true)
    // console.log(exists)
    if (exists){
      const p = orders.find(order=> order.id === newProduct.id && comparison(order.selectedAttributes, newProduct.selectedAttributes)===true)
      // var newAmount = newProduct.amount + 1
      // console.log(p.amount)
      const product = {
        ...newProduct,
        amount: p.amount + 1
      }
      const newOrders = orders.filter(function (order) {
        return order != p;
      });
      // console.log("p", p)
      // console.log("oldproduct", product);
      setOrders([...newOrders, product]);
      localStorage.setItem("orders", JSON.stringify([...newOrders, product]));
    }else{
      const product = {
        ...newProduct,
        amount: 1
      }
      // console.log("newproduct", product);
      setOrders([...orders, product]);
      localStorage.setItem("orders", JSON.stringify([...orders, product]));
    }
   
  }
  const removeOrder = (product) => {
    const newPrice = totalPrice - product.prices[0].amount
    console.log(newPrice)
    setTotalPrice(newPrice)
    localStorage.setItem("totalPrice", JSON.stringify(newPrice));
    console.log(newPrice)
    if (product.amount===1){
      const newOrders = orders.filter(function (order) {
        return order != product;
      });
      // console.log("p", product)
      // console.log("oldproduct", product);
      setOrders([...newOrders]);
      localStorage.setItem("orders", JSON.stringify([...newOrders]));
    }
    if (product.amount > 1){
      const newProduct = {
        ...product,
        amount: product.amount - 1 
      }
      // console.log("newproduct", newProduct)
      const newOrders = orders.filter(function (order) {
        return order != product;
      });
      setOrders([...newOrders, newProduct]);
      localStorage.setItem("orders", JSON.stringify([...newOrders, newProduct]));
    }
  }
  useEffect(async () => {
      const mydata = await fetchProductData(currentCategory);
      setDatas(mydata);
      // console.log(datas);
  }, []);
  useEffect(async () => {
      const mydata = await fetchCurrencies();
      setCurrencys(mydata);
      // console.log(datas);
  }, []);
  useEffect(async () => {
    const mydata = await fetchProductData(currentCategory);
    setDatas(mydata);
    // console.log(datas);
  }, [currentCategory]);
  useEffect (()=>{
    fetchProductData(currentCategory)
  },[currentCategory])
  return (
    <WebContext.Provider
      value={{
        currentCurrency,
        setCurrentCurrency,
        currentCategory,
        setCurrentCategory,
        datas,
        setDatas,
        currencys,
        setCurrencys,
        orders,
        setOrders,
        addOrder,
        removeOrder,
        totalPrice,
        state,
        setState
      }}
    >
      {children}
    </WebContext.Provider>
  );
};
export default WebProvider;
