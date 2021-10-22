export const getAllProducts = async () => {
  const request = await fetch(
    "https://makeup-api.herokuapp.com/api/v1/products.json"
  );
  const response = await request.json();
  return response;
};
