import { Flex } from "@chakra-ui/layout";
import React from "react";
import investments from "../data/investments-2-1.json";
import Card from "./Card";

export default function Content() {
  return (
    <>
      <Flex bg="#01464d" w="100vw">
        <Flex maxW="7xl" margin="auto" wrap="wrap" gridGap="20px" my="30px">
          {investments.investments.map((item, key) => (
            <Card id={item.id} description={item.description} key={key} />
          ))}
        </Flex>
      </Flex>
    </>
  );
}
