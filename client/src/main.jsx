import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';

// import { ErrorProvider } from './contexts/ErrorContext.jsx';
// import AuthProvider from './providers/AuthProvider.jsx';

// import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        {/* <ErrorProvider> */}
        {/* <AuthProvider> */}
        <BrowserRouter>
            <App />
        </BrowserRouter>
        {/* </AuthProvider> */}
        {/* </ErrorProvider> */}
    </React.StrictMode>
);
