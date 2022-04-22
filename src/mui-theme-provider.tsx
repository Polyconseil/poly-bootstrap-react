import React, {
  ReactNode,
  ReactElement,
  useMemo,
  useState,
  useContext,
  useEffect,
} from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import {
  createTheme,
  ThemeProvider,
  StyledEngineProvider,
  useMediaQuery,
  PaletteMode,
  Theme,
} from '@mui/material';

const baseTheme = {
  typography: {
    fontFamily: ['Montserrat', 'sans-serif'].join(','),
    fontSize: 12,
    fontWeightLight: 400,
    fontWeightRegular: 500,
    fontWeightMedium: 550,
    fontWeightBold: 600,
  },
};

const lightPalette = {
  mode: 'light' as PaletteMode,
};

const darkPalette = {
  mode: 'dark' as PaletteMode,
};

type MuiThemeProviderProperties = {
  children: ReactNode;
};

type MuiThemeContextProperties = {
  theme?: Theme;
  toggleTheme: () => void;
};

export const MuiThemeContext = React.createContext<MuiThemeContextProperties>({
  theme: undefined,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  toggleTheme: () => {},
});

export const useMuiThemeContext = () => useContext(MuiThemeContext);

function MuiThemeProvider({
  children,
}: MuiThemeProviderProperties): ReactElement {
  const localStorageModeKey = 'theme.palette.mode';
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const localMode = window.localStorage.getItem(localStorageModeKey);
  const [darkMode, setDarkMode] = useState<boolean>(
    localMode ? localMode === 'dark' : prefersDarkMode,
  );

  function toggleTheme() {
    window.localStorage.setItem(
      localStorageModeKey,
      darkMode ? 'light' : 'dark',
    );
    setDarkMode(!darkMode);
  }

  const theme: Theme = useMemo(
    () =>
      createTheme({
        ...baseTheme,
        palette: darkMode ? darkPalette : lightPalette,
      }),
    [darkMode],
  );

  useEffect(() => {
    if (darkMode) {
      document.querySelector('body')?.classList.add('dark-theme');
    } else {
      document.querySelector('body')?.classList.remove('dark-theme');
    }
  }, [darkMode]);

  return (
    <MuiThemeContext.Provider value={{ theme, toggleTheme }}>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {children}
        </ThemeProvider>
      </StyledEngineProvider>
    </MuiThemeContext.Provider>
  );
}

export default MuiThemeProvider;
