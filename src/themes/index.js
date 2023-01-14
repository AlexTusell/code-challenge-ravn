import { extendTheme } from '@chakra-ui/react';

export default extendTheme({
  styles: {
    global: {
      'html, body': {
        bg: 'gray.700',
        color: 'white',
      },
    },
  },
  colors: {
    gray: {
      400: '#2C2F33',
      700: '#222528',
    },
    orange: {
      500: '#DA584B',
    },
  },
  fonts: {
    heading: `'Raleway', sans-serif`,
    body: `'Raleway', sans-serif`,
  },
  components: {},
});
