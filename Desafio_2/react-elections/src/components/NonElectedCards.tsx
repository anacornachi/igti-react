import {
  Flex,
  AspectRatio,
  Image,
  Heading,
  Text,
  Badge,
} from "@chakra-ui/react";
import React from "react";

type Props = {
  nonelected: {
    id: string;
    name: string;
    username: string;
    votes?: number;
  }[];
};

export default function NonElectedCards({ nonelected }: Props) {
  return (
    <Flex
      bg="top-header"
      border="2px"
      borderColor="detail"
      borderRadius="15px"
      w="20%"
      h="1/3"
      p="10px"
      direction="column"
    >
      <AspectRatio w="full" h="60%" ratio={4 / 3}>
        <Image
          src="https://exame.com/wp-content/uploads/2018/10/thor-ragnarok-filme-cultura-vip.jpg"
          alt="naruto"
          objectFit="cover"
          borderRadius="15px"
        />
      </AspectRatio>
      <Flex align="center" direction="column" p="5px" gridGap="10px">
        <Heading as="h3" fontSize="30px">
          {}
        </Heading>
        <Text fontSize="12px">{} votos</Text>
        <Badge
          bg="orange.500"
          h="30px"
          w="100px"
          p="5px 10px"
          borderRadius="15px"
          fontSize="14px"
          color="white"
          fontWeight="normal"
        >
          Não eleito
        </Badge>
        <Text color="orange.500" fontSize="40px" fontWeight="bold">
          19%
        </Text>
      </Flex>
    </Flex>
  );
}
