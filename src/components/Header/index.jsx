import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import NewInvestigationButton from "../Buttons/NewInvestigationButton.js"
import ThemeToggleButton from "../Buttons/ThemeToggleButton.js" 
import Upload from "../Buttons/Upload.js"
import ProjectNameInput from "../Inputs/ProjectNameInput.js"
export const CustomAppBar = styled(AppBar)(({ theme }) => ({
  // backgroundColor: theme.palette.secondary.main,
  backgroundColor: "rgba(56, 59, 75, 0.53)",
  boxShadow: '1',// 
  height: 70, 
  display: 'flex',
  justifyContent: 'space-between',
  alignContent: 'center',
  position: 'fixed',
  zIndex: '1000'
}));


const Header = () => {
  return (
    <>
    <CustomAppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1, color: '#fff' }}>
          INVESTIGATE
        </Typography>
        <div style={{display: 'flex', justifyContent: 'end', width:'30%' }} >
        {/* <ThemeToggleButton/> */}
        <Upload/>
        <NewInvestigationButton variant="contained">Login</NewInvestigationButton>
        </div>
      </Toolbar>
    </CustomAppBar>
    <ProjectNameInput/>
    </>

  );
};

export default Header;
