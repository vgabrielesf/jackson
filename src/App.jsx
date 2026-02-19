import React from 'react';
import Home from './pages/Home';
import { ThemeProvider } from './hooks/useTheme';

const App = () => {
  return (
    <ThemeProvider>
      <Home />
    </ThemeProvider>
  );
};

export default App;