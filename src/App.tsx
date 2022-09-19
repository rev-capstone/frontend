import { createTheme, PaletteMode } from '@mui/material';
import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import { CartContext } from './context/cart.context';
import { ColorModeContext } from './context/ColorModeContext'
import ProductItem from './models/Product';
import { AppRoutes } from './router/AppRoutes';

function App() {
  const [cart, setCart] = useState<ProductItem[]>([]);
  const value = { cart, setCart };

  const [mode, setMode] = React.useState<PaletteMode>('light');
  const colorMode = React.useMemo(
    () => ({
      // The dark mode switch would invoke this method
      toggleColorMode: () => {
        setMode((prevMode: PaletteMode) =>
          prevMode === 'light' ? 'dark' : 'light',
        );
      },
    }),
    [],
  );

  // Update the theme only if the mode changes
  const theme = React.useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
    <CartContext.Provider value={value}>
      <Router>
        <AppRoutes></AppRoutes>
      </Router>
    </CartContext.Provider>
    </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
