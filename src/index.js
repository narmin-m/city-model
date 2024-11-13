import React from 'react';
import ReactDOM from 'react-dom/client'; // Import ReactDOM to use createRoot
import App from './App'; // Your main App component

// Make sure the root element exists in your HTML file (index.html)
const rootElement = document.getElementById('root');

// Check if the element exists before trying to create the root
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement); // Create the root element
  root.render(<App />); // Render your App component into the root element
} else {
  console.error('Root element not found in the DOM.');
}
