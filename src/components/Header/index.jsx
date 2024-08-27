import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import NewInvestigationButton from "../Buttons/NewInvestigationButton.js"
import ThemeToggleButton from "../Buttons/ThemeToggleButton.js" 
import MenuEntities from "../MenuEntities"


export const CustomAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
  boxShadow: '1',// 
  height: 70, 
  display: 'flex',
  justifyContent: 'space-between',
  alignContent: 'center'
}));


const Header = () => {
  return (
    <CustomAppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1, color: '#fff' }}>
          INVESTIGATE
        </Typography>
        <div style={{display: 'flex', justifyContent: 'space-evenly', width:'30%' }} >
        <ThemeToggleButton/>
        <MenuEntities/>
        <NewInvestigationButton variant="contained">Login</NewInvestigationButton>
        </div>
      </Toolbar>
    </CustomAppBar>
  );
};

export default Header;
