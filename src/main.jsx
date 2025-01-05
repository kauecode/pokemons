import React from 'react'
import ReactDOM from 'react-dom/client'
import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";
import App from './App.jsx'
import './main.css'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Theme radius="full" appearance="dark" accentColor="amber" grayColor="mauve">
      <App />
    </Theme>
  </React.StrictMode>,
)
