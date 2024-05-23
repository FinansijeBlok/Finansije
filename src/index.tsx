import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);


const Set = () => {
  const[transaction, setTransactionList] = useState([]);
}



root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

