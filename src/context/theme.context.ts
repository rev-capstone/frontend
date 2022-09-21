import React from 'react';
import { createTheme, Theme } from '@material-ui/core/styles'

interface ThemeContextState {
    theme: Theme;
    setTheme: (theme: Theme) => void;
}

export const dark = createTheme({
    palette: {
      type: "dark",
    }
  });
export const light = createTheme({
    palette: {
      type: "light",
    }
  });

export const ThemeContext = React.createContext<ThemeContextState>({
    theme: light,
    setTheme: () => { }
});