import React from "react";
import IncomeTable from "./IncomeTable";
import { Flex, Heading, Text } from "@chakra-ui/react";

type Props = {
  id: string;
  description: string;
};

export default function Card({ id, description }: Props) {
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
        <Text fontSize="md">Rendimento total: valor em real - %</Text>
      </Flex>
      <IncomeTable id={id} />
    </Flex>
  );
}
