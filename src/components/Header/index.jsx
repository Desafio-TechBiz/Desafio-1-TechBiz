import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import NewInvestigationButton from "../Buttons/NewInvestigationButton.js"
import ThemeToggleButton from "../Buttons/ThemeToggleButton.js" 

export const CustomAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
  boxShadow: 0.2, 
  height: 70, 
}));



const Header = () => {
  return (
    <CustomAppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1, color: '#fff' }}>
          INVESTIGATE
        </Typography>
        {/* <ThemeToggleButton/> */}
        <NewInvestigationButton variant="contained">Login</NewInvestigationButton>
      </Toolbar>
    </CustomAppBar>
  );
};

export default Header;
