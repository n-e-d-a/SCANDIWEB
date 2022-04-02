import { useContext } from "react";
import { WebContext } from "../context/webcontext";


const fetchProductData = async (currentcategory) => {
  var extraQuery=""
  if (currentcategory === "all"){
    extraQuery = ""
  }
  if (currentcategory === "tech"){
    extraQuery = "(input: {title: \"tech\"})";
  }
  if (currentcategory === "clothes"){
    extraQuery = "(input: {title: \"clothes\"})";
  }
  const URL = "http://localhost:4000/graphql";
  const dataQuery = `
    {
            category${extraQuery}{
            name
            products{
                id
                name
                inStock
                gallery
                description
                category
                brand
               	prices{
                	currency{
                    label
                    symbol
                  }
                  amount
              	}
              attributes{
                id
                name
                type
                items{
                  displayValue
                  value
                  id
                }
              }
            }
        }
    }
  `;
  const result = await fetch(URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      query: dataQuery,
    }),
  });

  const resultData = await result.json();
  const finalData = await resultData.data.category.products;
  return finalData;
};

export default fetchProductData;
