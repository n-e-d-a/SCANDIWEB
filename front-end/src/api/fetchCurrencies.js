const fetchCurrencies = async () => {
  const URL = "http://localhost:4000/graphql";
  const dataQuery = `
    {
        currencies{
        label
        symbol
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
  const finalData = await resultData.data.currencies;
  return finalData;
};

export default fetchCurrencies;
