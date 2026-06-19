import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "bootstrap/dist/css/bootstrap.min.css";
import './index.css'
import App from './App.jsx'
import "bootstrap/dist/css/bootstrap.min.css";

import "./styles/variables.css";
import "./styles/global.css";
import "./styles/layout.css";
import "./styles/sidebar.css";
import "./styles/topbar.css";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
