
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Não foi possível encontrar o elemento root para montar o app.");
}

const root = ReactDOM.createRoot(rootElement);
root.render(<App />);

// Remove o loading screen do HTML quando o React carregar
const loader = document.getElementById('loading-screen');
if (loader) {
  setTimeout(() => {
    loader.style.opacity = '0';
    setTimeout(() => loader.remove(), 500);
  }, 500);
}
