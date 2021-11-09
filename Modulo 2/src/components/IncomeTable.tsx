import React from "react";
import { Table, Tbody, Tr, Td } from "@chakra-ui/react";
import investments from "../data/investments-2-1.json";
import { convertToBRL } from "../utils/convertToBRL";
import { months } from "../utils/months";

type Props = {
  id: string;
};

export default function IncomeTable({ id }: Props) {
  const reports = investments.reports
    .filter((item) => item.investmentId === id)
    .sort((a, b) => a.month - b.month);

  const tableRow = reports.map((item, key) => {
    const previousReport = key === 0 ? reports[key] : reports[key - 1];
    const result = item.value - previousReport.value;

    const percentage = (result / previousReport.value) * 100;
    return (
      <Tr key={key}>
        <Td>
          {months[item.month - 1].slice(0, 3)}/{item.year}
        </Td>
        <Td color={percentage > 0 ? "green.300" : "red.300"}>
          {convertToBRL(item.value)}
        </Td>
        <Td color={percentage > 0 ? "green.300" : "red.300"} isNumeric>
          {percentage.toFixed(2)}%
        </Td>
      </Tr>
    );
  });

  return (
    <Table variant="simple" h="full">
      <Tbody>{tableRow}</Tbody>
    </Table>
  );
}
