import React, { useState } from 'react';
import { Switch, FormControlLabel } from '@mui/material';
import { LightMode, DarkMode } from '@mui/icons-material';
// import { ThemeProvider } from '@mui/material/styles';
// import { lightTheme, darkTheme } from '../theme';

const ThemeSwitcher = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const handleThemeChange = (event) => {
    setIsDarkMode(event.target.checked);
  };

  return (
    // <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
    <FormControlLabel
        control={
          <Switch
            checked={isDarkMode}
            onChange={handleThemeChange}
            color="default"
            icon={<LightMode />}
            checkedIcon={<DarkMode />}
            sx={{ 
              '& .MuiSwitch-switchBase': {
                padding: 0,
              },
              '& .MuiSwitch-thumb': {
                width: 40,
                height: 40,
              },
              '& .MuiSwitch-track': {
                borderRadius: 20,
              },
            }}
          />
        }
        // label={isDarkMode ? <DarkMode /> : <LightMode />}
        labelPlacement="start"
        sx={{
          '& .MuiFormControlLabel-label': {
            marginLeft: 1,
            display: 'flex',
            alignItems: 'center',
          },
        }}
      />
      
    // </ThemeProvider>;
  );
};

export default ThemeSwitcher;
