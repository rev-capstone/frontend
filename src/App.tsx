import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import { CartContext } from './context/cart.context';
import ProductItem from './models/Product';
import { AppRoutes } from './router/AppRoutes';
import { Theme, ThemeProvider } from '@material-ui/core/styles'
import { dark, light} from './context/theme.context';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeContext } from 'styled-components';

function App() {
  
  const [cart, setCart] = useState<ProductItem[]>([]);
  const value = { cart, setCart };

  const [theme, setTheme] = useState<Theme>(light);
  const themeValue = { theme, setTheme };

  return (
    
    <ThemeContext.Provider value={themeValue}>
      <ThemeProvider theme={theme}>
      <CssBaseline />
        <CartContext.Provider value={value}>
          <Router>
            <AppRoutes></AppRoutes>
          </Router>
        </CartContext.Provider>
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}

export default App;