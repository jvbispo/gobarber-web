import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import GlobalStyle from './style/global';
import AppProvider from './hooks/index';
import Routes from './routes/index';

const App: React.FC = () => (
  <>
    <GlobalStyle />
    <AppProvider>
      <Router>
        <Routes />
      </Router>
    </AppProvider>
  </>
);

export default App;
