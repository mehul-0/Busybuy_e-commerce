import React from 'react';

import { createRoot } from 'react-dom/client';
import './index.css';
// importing root from the App component
import Root from './App';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Root /> 
  </React.StrictMode>
);
