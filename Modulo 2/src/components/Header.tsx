import React from "react";
import { Flex, Heading } from "@chakra-ui/react";

export default function Header() {
  return (
    <Flex h="95px" w="100" bg="#01464d" justify="center">
      <Flex h="100%" w="full" align="center" justify="center" color="white">
        <Heading as="h2" size="xl">
          React Investments
        </Heading>
      </Flex>
    </Flex>
  );
}
