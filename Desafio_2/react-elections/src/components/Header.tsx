import { Flex, Heading, Text } from "@chakra-ui/react";
import React from "react";
import Container from "./Container";

export default function Header() {
  return (
    <Flex
      w="100vw"
      h="50px"
      bg="top-header"
      color="main-text"
      letterSpacing="0.5px"
      align="center"
    >
      <Container>
        <Flex w="full" h="full" justify="space-between" align="center">
          <Heading as="h2" size="xl" color="detail" fontFamily="Caveat" w="50%">
            React Elections
          </Heading>
          <Text> ELEIÇÕES MUNICIPAIS</Text>
        </Flex>
      </Container>
    </Flex>
  );
}
