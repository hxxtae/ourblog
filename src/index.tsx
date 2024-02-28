import { BrowserRouter as Router } from 'react-router-dom';
import ReactDOM from 'react-dom/client';

import App from './App';
import AuthContextProvider from 'context/AuthContext';
import ThemeContextProvider from 'context/ThemeContext';
import './index.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <AuthContextProvider>
    <ThemeContextProvider>
      <Router>
        <App />
      </Router>
    </ThemeContextProvider>
  </AuthContextProvider>
);

