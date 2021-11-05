import { extendTheme, theme as baseTheme } from "@chakra-ui/react";

export const customTheme = extendTheme({
  colors: {
    brand: baseTheme.colors.red,
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
