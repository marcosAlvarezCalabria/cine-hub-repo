import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from '../src/contexts/auth.context.jsx';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './index.css';
import { ShowModalMapContextProvider } from './contexts/showModalMap.context.jsx';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <ShowModalMapContextProvider>
          <App />
        </ShowModalMapContextProvider>
         
      </AuthContextProvider>
       
     
    </BrowserRouter>
  </React.StrictMode>,
)
