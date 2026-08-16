import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import {
  ThemeProvider,
  ToastProvider,
} from '@poluru-labs/enterprise-design-system-react';
import '@poluru-labs/enterprise-design-system-react/styles.css';
import './styles/global.scss';
import { AlertsProvider } from './context/AlertsContext';
import App from './App';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider defaultTheme="light">
        <ToastProvider>
          <AlertsProvider>
            <App />
          </AlertsProvider>
        </ToastProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
);
