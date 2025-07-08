import { Roboto } from 'next/font/google';
import { createTheme } from '@mui/material/styles';

// Augment the palette to include a violet color
declare module '@mui/material/styles' {
  interface Palette {
    orange: Palette['primary'];
  }

  interface PaletteOptions {
    orange?: PaletteOptions['primary'];
  }
}

// Update the Button's color options to include a violet option
declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    orange: true;
  }
}


const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

const theme = createTheme({
  palette: {
    mode: 'light',
    orange: {
      main: '#fb9555',
    }
  },
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
  components: {
    MuiAlert: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          ...(ownerState.severity === 'info' && {
            backgroundColor: '#60a5fa',
          }),
        }),
      },
    },
  },
});

export default theme;
