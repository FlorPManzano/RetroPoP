import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';

import { ErrorProvider } from './contexts/ErrorContext.jsx';

// import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <ErrorProvider>
            <App />
        </ErrorProvider>
    </React.StrictMode>
);
