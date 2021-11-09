import React from "react";
import IncomeTable from "./IncomeTable";
import { Flex, Heading, Text } from "@chakra-ui/react";
import investments from "../data/investments-2-1.json";
import { convertToBRL } from "../utils/convertToBRL";

type Report = {
  id: string;
  investmentId: string;
  month: number;
  year: number;
  value: number;
};

export function totalYield(list: Report[]) {
  const valueList = list.map((item) => item.value);

  const first = valueList[0];
  const last = valueList[valueList.length - 1];

  const result = last - first;

  const percentage = (result / first) * 100;

  return (
    <Flex fontSize="md" gridGap="5px">
      Rendimento total:
      <Text fontSize="md" color={result < 0 ? "red.300" : "green.300"}>
        {convertToBRL(result)}
      </Text>{" "}
      |
      <Text fontSize="md" color={result < 0 ? "red.300" : "green.300"}>
        {percentage.toFixed(2)}%
      </Text>
    </Flex>
  );
}

type Props = {
  id: string;
  description: string;
};

export default function Card({ id, description }: Props) {
  const reports = investments.reports
    .filter((item) => item.investmentId === id)
    .sort((a, b) => a.month - b.month);

  return (
    <Flex
      w="100%"
      h="800px"
      borderRadius="10px"
      border="1px"
      borderColor="white"
      color="white"
      p="25px"
      direction="column"
      justify="between"
      align="center"
      gridGap="30px"
    >
      <Flex
        direction="column"
        justify="between"
        align="center"
        w="100vw"
        gridGap="10px"
      >
        <Heading as="h2" fontSize="2xl" fontWeight="semibold">
          {description}
        </Heading>
        {totalYield(reports)}
      </Flex>
      <IncomeTable id={id} />
    </Flex>
  );
}
