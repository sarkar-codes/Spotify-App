import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Datalayer, { DataLayer } from './DataLayer.js';
import reducer, { initialState } from './reducer.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <DataLayer initialState={initialState} reducer={reducer}>
    <App />
    </DataLayer>
  </React.StrictMode>
);

