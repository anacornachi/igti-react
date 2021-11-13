import * as React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { customTheme } from "../config/theme";
import Header from "./Header";
import Main from "./Main";

export const App = () => (
  <ChakraProvider resetCSS theme={customTheme}>
    <Header />
    <Main />
  </ChakraProvider>
);
