import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import App from './Main';
import { createRoot } from 'react-dom/client';
import "./Translations/i18n";
import "./style/main.scss";
import 'bootstrap/dist/css/bootstrap.min.css';

const root = document.getElementById('root');
const app = (
    <BrowserRouter>
        <App />
    </BrowserRouter>
);
const rootElement = createRoot(root);
rootElement.render(app);
