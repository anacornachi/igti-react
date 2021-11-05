import * as React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import Header from "./Header";
import { customTheme } from "../config/theme";
import Content from "./Content";

export const App = () => (
  <ChakraProvider resetCSS theme={customTheme}>
    <Header />
    <Content />
  </ChakraProvider>
);
