import { CssBaseline, ThemeProvider, debounce } from '@mui/material';
import React, { Suspense, lazy } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { theme } from './assets/styles/theme';
import { store } from './redux/store';
import reportWebVitals from './reportWebVitals';
import { saveState } from './utils/localStorage';

const App = lazy(() => import('./components/App'));

const container = document.getElementById('root')!;
const root = createRoot(container);

store.subscribe(
  debounce(() => {
    saveState(store.getState(), 'user');
  }, 800)
);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <Suspense fallback={null}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <App />
          </ThemeProvider>
        </Suspense>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
