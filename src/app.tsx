import React, { Suspense } from 'react';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers';
import MuiThemeProvider from './mui-theme-provider';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const RootPage = React.lazy(() => import('./pages/root-page'));
const HomePage = React.lazy(() => import('./pages/home-page'));
const NotFoundPage = React.lazy(() => import('./pages/not-found-page'));
const ExamplePage = React.lazy(() => import('./pages/example-page'));

function App(): JSX.Element {
  return (
    <MuiThemeProvider>
      <Suspense fallback={<div></div>}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<RootPage />}>
                <Route index element={<HomePage />} />
                <Route path="example" element={<ExamplePage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </LocalizationProvider>
      </Suspense>
    </MuiThemeProvider>
  );
}

export default App;
