import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';


import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import './styles.css';
ReactDOM.render(
    <Router>
        <App />
    </Router>
    , document.getElementById('root'));