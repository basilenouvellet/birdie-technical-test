import React, { Component } from 'react';

import Table from "./components/Table";
import SelectButton from "./components/SelectButton";

import './App.css';

class App extends Component {
    render() {
        return (
            <div className="App">
                <header className="App-header">Birdie Technical Test - Basile NOUVELLET</header>
                <SelectButton/>
                <Table/>
            </div>
        );
    }
}

export default App;
