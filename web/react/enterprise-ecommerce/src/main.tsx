import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import {
  ThemeProvider,
  ToastProvider,
} from '@poluru-labs/enterprise-design-system-react';
import '@poluru-labs/enterprise-design-system-react/styles.css';
import './styles/global.scss';
import { CommerceProvider } from './context/CommerceContext';
import App from './App';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider defaultTheme="light">
        <ToastProvider>
          <CommerceProvider>
            <App />
          </CommerceProvider>
        </ToastProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
);
