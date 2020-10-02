import React, { Component } from 'react';
import './App.css';
import Dashboard from './Components/Dashboard/Dashboard';
import Form from './Components/Form/Form';
import Header from './Components/Header/Header';
import axios from 'axios';
import { HashRouter, Link } from 'react-router-dom';
import routes from './routes';

class App extends Component{
  render(){
      return (
        <HashRouter>
          <div className="App">
          
            <Header />
            <div className='container'>
              {routes}
            </div>
            </div>
        </HashRouter>
            
      
      );
  }
}

export default App;
