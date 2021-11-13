import { extendTheme, theme as baseTheme } from "@chakra-ui/react";

export const customTheme = extendTheme({
  colors: {
    brand: baseTheme.colors.red,
    "main-text": "#B9EEF2",
    elected: "#3EBF29",
    background: "#002863",
    "bottom-header": "#00234e",
    "top-header": "#00142d",
    detail: "#13a3be",
    "non-elected": "F6980A",
  },
  fonts: {
    heading: "'Poppins', sans-serif",
    body: "'Poppins', sans-serif",
  },
  components: {
    Alert: {
      defaultProps: {
        colorScheme: "blue",
      },
    },
  },
});
