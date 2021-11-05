import React from "react";
import { Table, Tbody, Tr, Td } from "@chakra-ui/react";
import investments from "../data/investments-2-1.json";

type Props = {
  id: string;
};

export default function IncomeTable({ id }: Props) {
  const reports = investments.reports
    .filter((item) => item.investmentId === id)
    .sort((a, b) => a.month - b.month);

  const tableRow = reports.map((item) => (
    <Tr>
      <Td>
        {item.month}/{item.year}
      </Td>
      <Td>
        {item.value.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        })}
      </Td>
      <Td isNumeric>0,00%</Td>
    </Tr>
  ));

  return (
    <Table variant="simple" h="full">
      <Tbody>{tableRow}</Tbody>
    </Table>
  );
}
