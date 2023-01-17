import { extendTheme } from '@chakra-ui/react';
import Button from './components/button';
import Menu from './components/menu';
import { TagColors } from './TagColors';

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
      200: '#94979A1A',
      250: '#94979A',
      300: '#393D41',
      400: '#2C2F33',
      700: '#222528',
    },
    orange: {
      200: '#DA584B1A',
      500: '#DA584B',
    },
    yellow: {
      200: '#E5B4541A',
      500: '#E5B454',
    },
    white: {
      200: '#94979A1A',
      500: '#FFFFFF',
    },
    ...TagColors,
  },
  fonts: {
    heading: `'Raleway', sans-serif`,
    body: `'Raleway', sans-serif`,
  },
  components: {
    Button,
    Menu,
  },
});
