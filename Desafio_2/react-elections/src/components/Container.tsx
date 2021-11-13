import { Flex, BoxProps } from "@chakra-ui/react";
import React, { ReactNode } from "react";

type Props = {
  children: ReactNode & BoxProps;
};

export default function Container({ children, ...props }: Props) {
  return (
    <Flex maxW="7xl" mx="auto" w="full" {...props}>
      {children}
    </Flex>
  );
}
