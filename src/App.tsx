import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import { CartContext } from './context/cart.context';
import ProductItem from './models/Product';
import { AppRoutes } from './router/AppRoutes';
import { Theme, ThemeProvider } from '@material-ui/core/styles'
import { ThemeContext } from 'styled-components';
import { dark, light } from './context/theme.context';
import CssBaseline from '@material-ui/core/CssBaseline';
import './styles/master.css';
import { UserContext } from './context/user.context';
import User from './models/User';


function App() {
  document.title = "Coder's Closet";
  const [cart, setCart] = useState<ProductItem[]>([]);
  const value = { cart, setCart };

  const [user, setUser] = useState<User>(new User("", false));
  const userValue = { user, setUser};

  const [theme, setTheme] = useState<Theme>(light);
  const themeValue = { theme, setTheme };

  return (
    
    <ThemeContext.Provider value={themeValue}>
      <ThemeProvider theme={theme}>
      <CssBaseline />
        <UserContext.Provider value={userValue}>
          <CartContext.Provider value={value}>
            <Router>
              <AppRoutes></AppRoutes>
            </Router>
          </CartContext.Provider>
        </UserContext.Provider>
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}

export default App;