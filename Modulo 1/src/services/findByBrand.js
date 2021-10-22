export const findByBrand = async (query) => {
  console.log(query);
  const request = await fetch(
    `https://makeup-api.herokuapp.com/api/v1/products.json?brand=${query}`
  );
  const response = await request.json();
  return response;
};
