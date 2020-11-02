import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import ResizeContextProvider from './contexts/resizeContext';
import BackgroundContextProvider from './contexts/backgroundContext';
import UnitContextProvider from './contexts/unitsContext';

ReactDOM.render(
  <React.StrictMode>
    <ResizeContextProvider>
      <BackgroundContextProvider>
        <UnitContextProvider>
        <App />
        </UnitContextProvider>
      </BackgroundContextProvider>
    </ResizeContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
