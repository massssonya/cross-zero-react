import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import HomeApp from "./App";
import "./index.css";

import {
  BrowserRouter
} from "react-router-dom";


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <HomeApp />
    </BrowserRouter>
  </StrictMode>,
)
