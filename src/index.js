import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import CartContext from './contexts/CartContext';

import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import './styles.css';
ReactDOM.render(
    <CartContext>
    <Router>
        <App />
    </Router>
    </CartContext>
    , document.getElementById('root'));