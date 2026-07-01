import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import '../style/main.css';
import '../style/_variables.css';
import '../style/_reset.css';

import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
