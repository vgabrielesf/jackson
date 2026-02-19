import React, { useEffect } from 'react';
import Home from './pages/Home';
import { ThemeProvider } from './hooks/useTheme';
import { renderingImages } from './data/services';

function preloadImages(imageList) {
  imageList.forEach(img => {
    const image = new window.Image();
    image.src = img.src;
  });
}

const App = () => {
  useEffect(() => {
    preloadImages(renderingImages);
  }, []);

  return (
    <ThemeProvider>
      <Home />
    </ThemeProvider>
  );
};

export default App;