import React from 'react';


import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Filters from './Filters'
import CarOwners from './CarOwners'

function App() {

  return (
    <div className="App">
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Filters}/>
        <Route path="/car-owners" component={CarOwners}/>
      </Switch>
    </BrowserRouter>
    </div>
  );
}

export default App;
