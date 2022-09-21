import { Badge } from "@material-ui/core";
import { ShoppingCartOutlined } from "@material-ui/icons";
import { TextField } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { flip } from "../..";
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

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
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
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
let icon = <Brightness7Icon />;
let x = true;
function realFlip()
{
  flip();
  if(x)
  {
    x = false;
    icon = <Brightness4Icon/>;
  }
  else
  {
    x = true;
    icon = <Brightness7Icon />;
  }
}
const Navbar = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <Wrapper>
        <Left>
        <Logo onClick={() => {navigate('/')}}>Revature Swag Shop</Logo>
        </Left>
        <Right>
          <MenuItem onClick={() => {navigate('/register')}}>REGISTER</MenuItem>
          <MenuItem onClick={() => {navigate('/login')}}>SIGN IN</MenuItem>
          <MenuItem onClick={() => {navigate('/cart')}}>
            <Badge color="primary" overlap="rectangular">
              <ShoppingCartOutlined />
            </Badge>
          </MenuItem>
          <Button onClick = {realFlip}>{icon}</Button>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;