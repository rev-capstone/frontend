import { Badge } from "@material-ui/core";
import { ShoppingCartOutlined } from "@material-ui/icons";
import React, { useContext } from "react";
import { TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import styled, { ThemeContext } from "styled-components";
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { light, dark } from "../../context/theme.context";
import { apiLogout } from "../../remote/e-commerce-api/authService";
import { cclogo } from "../../assets";
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';

const Container = styled.div`
  height: 60px;
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const Logo = styled.h1`
  font-weight: bold;
  cursor : pointer;
  margin-left: 70px;
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-right: 50px;
`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
`;

const Button = styled.div`
  cursor: pointer;
  padding : 20px;
  top : 2px;
`;
let moon = <Brightness7Icon />;
let sun = <Brightness4Icon />;
let x = true;

const Navbar = () => {
  const navigate = useNavigate();
  const { theme, setTheme } = useContext(ThemeContext);

  function lightDark() {
    setTheme(theme === light ? dark : light);
    x = !x;
    console.log(theme);
  }

  async function logout(){
    let response = await apiLogout();
    navigate('/');
  }

  return (
    
    <Container>
      <Wrapper>
     
        <Left>
          <Logo onClick={() => { navigate('/products') }}>Coder's Closet</Logo>
          <div className="cclogo-image">
          <img src ={require('../../assets/cclogo.png')} style={{width: "90px", padding: "10px"}}/>

          </div>
        
       
        </Left>
        
        <Right>
          {window.location.pathname != '/' && window.location.pathname != '/register' ?
            <><MenuItem onClick={ logout }>LOGOUT</MenuItem>
              <MenuItem onClick={() => { navigate('/cart'); }}>
                <Badge color="primary" overlap="rectangular">
                  <ShoppingCartOutlined style={{fill: "#EC5800"}} />
                </Badge>
              </MenuItem><Button onClick={lightDark}>{x ? sun : moon}</Button></> :
            <><MenuItem onClick={() => { navigate('/register') }}>REGISTER</MenuItem>
              <MenuItem onClick={() => { navigate('/') }}>SIGN IN</MenuItem>
              <Button onClick={lightDark}>{x ? sun : moon}</Button></>
          }
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;

