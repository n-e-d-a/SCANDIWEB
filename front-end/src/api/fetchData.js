const fetchData = async () => {
  const URL = "http://localhost:4000/graphql";
  const dataQuery = `
  {
 
      categories{
          name
        products{
          id
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
  const finalData = await resultData.data.categories;
  return finalData;
};

export default fetchData;
