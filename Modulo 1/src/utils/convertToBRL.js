export const convertToBRL = (money) => {
  const exchange = money * 5.5;
  return exchange.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
};
