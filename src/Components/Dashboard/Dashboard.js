import axios from 'axios';
import React, {Component} from 'react';
import Product from '../Product/Product';
import './Dashboard.css'

class Dashboard extends Component{

    constructor(){
        super();
        this.state = {
            inventory: []
        }
    }

    componentDidMount(){
        this.getList();
    }

    deleteItem = (id)=>{
        axios.delete(`/api/inventory/${id}`)
            .then(()=>{
                this.getList();
            }).catch(err=>console.log(err));
    }

    getList = ()=>{
        axios.get('/api/inventory')
          .then(res=>{
            this.setState({inventory: res.data})
          }).catch(err=>console.log(err))
      }

    render(){
        const data = this.state.inventory.map((el,i)=>{
            return(
                <Product key={i} val={el} deleteItem={this.deleteItem}/>
            );
        });
        return(
            <div id='dashboard'>
                {data}
            </div>
        );
    }
}

export default Dashboard;