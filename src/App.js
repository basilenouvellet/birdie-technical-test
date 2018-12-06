import React from 'react';

import Table from './components/Table';
import SelectButton from './components/SelectButton';
import ErrorBoundary from './components/ErrorBoundary';

import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">Birdie Technical Test - Basile NOUVELLET</header>

      <ErrorBoundary>
        <SelectButton />
      </ErrorBoundary>

      <ErrorBoundary>
        <Table />
      </ErrorBoundary>
    </div>
  );
}

export default App;
