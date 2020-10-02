import axios from 'axios';
import React, {Component} from 'react';
import Product from '../Product/Product';
import './Dashboard.css'

class Dashboard extends Component{

    deleteItem = (id)=>{
        axios.delete(`/api/inventory/${id}`)
            .then(()=>{
                this.props.getList();
            }).catch(err=>console.log(err));
    }

    render(){
        const data = this.props.inventory.map((el,i)=>{
            return(
                <Product key={i} val={el} setCurrent={this.props.setCurrent} deleteItem={this.deleteItem}/>
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