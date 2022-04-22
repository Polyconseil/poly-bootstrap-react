import { Button, Divider, IconButton } from '@mui/material';
import i18next from 'i18next';
import React from 'react';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

import { useMuiThemeContext } from '../mui-theme-provider';
import { Link, Outlet } from 'react-router-dom';
import { styled } from '@mui/system';

const RootPageContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  height: '100vh',
  width: '100vw',
  padding: '1vh 1vw',
  overflowY: 'auto',
  overflowX: 'hidden',
});

const RootPageHeader = styled('header')({
  flex: '0 0 auto',
  display: 'flex',
  flexFlow: 'row wrap',
  justifyContent: 'space-between',
});

const RootPageNav = styled('nav')({
  flex: '0 0 auto',
  display: 'flex',
  flexFlow: 'row wrap',
  gap: '8px',
  alignItems: 'center',
  '& img': {
    width: '181px',
    height: '39px',
  },
});

const RootPageConfig = styled('div')({
  flex: '0 0 auto',
  display: 'flex',
  flexFlow: 'row wrap',
  gap: '8px',
  alignItems: 'center',
});

const RootPageMain = styled('main')({
  flex: '1 1 100%',
});

const RootPageFooter = styled('footer')({
  flex: '0 0 auto',
  display: 'flex',
  flexFlow: 'row wrap',
  gap: '8px',
  alignItems: 'center',
  justifyContent: 'center',
});

const RootPage = (): React.ReactElement => {
  const { theme, toggleTheme } = useMuiThemeContext();

  return (
    <RootPageContainer>
      <RootPageHeader>
        <RootPageNav>
          <Link to="/">
            <img src="static/logo.png" alt="logo" />
          </Link>
          <Divider orientation="vertical" variant="middle" flexItem />
          <Link to="/example">/example</Link>
          <Divider orientation="vertical" variant="middle" flexItem />
          <Link to="/404">/404</Link>
        </RootPageNav>
        <RootPageConfig>
          <Button
            variant="outlined"
            onClick={() => i18next.changeLanguage('fr')}
          >
            FR
          </Button>
          <Button
            variant="outlined"
            onClick={() => i18next.changeLanguage('en')}
          >
            EN
          </Button>
          <IconButton aria-label="theme-toggle" onClick={() => toggleTheme()}>
            {theme?.palette.mode === 'dark' ? (
              <Brightness7Icon />
            ) : (
              <Brightness4Icon />
            )}
          </IconButton>
        </RootPageConfig>
      </RootPageHeader>
      <RootPageMain>
        <Outlet />
      </RootPageMain>
      <RootPageFooter>© 2022 Copyright Polyconseil</RootPageFooter>
    </RootPageContainer>
  );
};

export default RootPage;
