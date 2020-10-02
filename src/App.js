import React, { Component } from 'react';
import './App.css';
import Dashboard from './Components/Dashboard/Dashboard';
import Form from './Components/Form/Form';
import Header from './Components/Header/Header';
import axios from 'axios';

class App extends Component{
  constructor(){
    super();
    this.state = {
      inventory: [],
      current: null
    }
  }

  componentDidMount(){
    this.getList();
  }

  getList = ()=>{
    console.log('getting list');
    axios.get('/api/inventory')
      .then(res=>{
        this.setState({inventory: res.data})
        console.log(res.data);
      }).catch(err=>console.log(err))
  }

  setCurrent = (id)=>{
    this.setState({current: id});
  }

  render(){
      return (
        <div className="App">
        <Header />
        <div id='app-flex'>
          <Dashboard inventory={this.state.inventory} setCurrent={this.setCurrent} getList={this.getList}/>
          <Form getList={this.getList} inventory={this.state.inventory} current={this.state.current} setCurrent={this.setCurrent}/>
        </div>
      </div>
      );
  }
}

export default App;
