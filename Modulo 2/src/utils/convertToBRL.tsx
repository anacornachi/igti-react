export function convertToBRL(value: number) {
  value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}
