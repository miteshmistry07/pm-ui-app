import React from 'react';
import './App.css';
import Navigation from './components/Navigation';

function App() {
  return (
  
    <div className="App">
      <Navigation/>
      <header className="App-header">
        <p>
          Edit <code>src/App.js</code> and save to reload. This is HOME PAGE
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
