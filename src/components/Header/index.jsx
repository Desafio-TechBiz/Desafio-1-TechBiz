import React from 'react';
import { AppBar, Toolbar } from '@mui/material';
import { styled } from '@mui/material/styles';
import NewInvestigationButton from "../Buttons/NewInvestigationButton.js";
import Upload from "../Buttons/Upload.js";
import ProjectNameInput from "../Inputs/ProjectNameInput.js";
import TriDIcon from '../assets/image/logo.png'; // Verifique o caminho correto

export const CustomAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: "#142142",
  boxShadow: '1',
  height: 70,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center', 
  position: 'fixed',
  zIndex: '1000',
  padding: '0 20px', 
}));

const LogoImage = styled('img')({
  width: '300px', 
  height: 'auto',
  marginLeft: '-90px'
});

const Header = () => {
  return (
    <>
      <CustomAppBar position="static">
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
          <LogoImage src={TriDIcon} alt="Logo" />
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Upload />
            <NewInvestigationButton variant="contained">Login</NewInvestigationButton>
          </div>
        </Toolbar>
      </CustomAppBar>
      <ProjectNameInput />
    </>
  );
};

export default Header;
