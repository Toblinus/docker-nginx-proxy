import React from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './app';

const box = document.getElementById('root');

if (box) {
  const root = createRoot(box);
  root.render(<App />);
}

export default () => {}