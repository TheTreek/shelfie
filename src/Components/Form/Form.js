import axios from 'axios';
import React, {Component} from 'react';
import { Link, Redirect } from 'react-router-dom';
import './Form.css';
class Form extends Component{
    constructor(){
        super();
        this.state = {
            name: '',
            price: 0,
            imgurl: '',
            current: null
        }
    }

    componentDidMount(){
        if(this.props.match.params.id){
            const id = this.props.match.params.id;
            this.getSingle(id);
        }
    }

    componentDidUpdate(old){
        if(old !== this.props){
            this.clearInputs();
        }
    }
    clearInputs = ()=>{
        this.setState({
            name: '',
            price: 0,
            imgurl: ''
        })
    }

    getSingle = (id)=>{
        axios.get(`/api/inventory/${id}`)
            .then(res=>{
                let data = res.data[0];
                this.setState({
                    name: data.name,
                    price: data.price,
                    imgurl: data.img,
                    current: id
                });
            }).catch(err=>console.log(err));
    }

    handleChange = (key,val)=>{
        let obj = {};
        obj[key] = val;
        this.setState(obj);
    }

    addProduct = ()=>{
        let data = {
            name: this.state.name,
            price: this.state.price,
            img: this.state.imgurl
        };
        axios.post('api/inventory',data).then(res=>{
            this.props.history.goBack();
        }).catch(err=>console.log(err));
    }

    updateProduct = ()=>{
        let data = {
            name: this.state.name,
            price: this.state.price,
            img: this.state.imgurl
        };
        axios.put(`api/inventory/${this.state.current}`,data)
        .then(()=>{
            this.props.history.goBack();
        }).catch(err=>console.log(err));
    }

    render(){
        let url= "";
        let add = <button onClick={this.addProduct}>Add to Inventory</button>;
        if(this.state.current !== null){
            add = <button onClick={this.updateProduct}>Save Changes</button>;
        }

        if(this.state.imgurl === ''){
            url = "https://s3.amazonaws.com/bloc-global-assets/almanac-assets/bootcamps/logos/000/002/656/original/DevMountain.jpg?1467187319"
        }else{
            url = this.state.imgurl
        }
        return(
            <div id='body-form'>
                <img id='form-img' alt={this.state.name} src={url} />
                <span className='form-inputs'>
                    <span>Image URL:</span>
                    <input type='text' value={this.state.imgurl} onChange={(e)=>this.handleChange('imgurl',e.target.value)}/>
                </span>
                <span className='form-inputs'>
                    <span>Product Name:</span>
                    <input type='text' value={this.state.name} onChange={(e)=>this.handleChange('name',e.target.value)}/>
                </span>
                <span className='form-inputs'>
                    <span>Price:</span>
                    <input type='text' pattern='[0-9]*' value={this.state.price} onChange={(e)=>this.handleChange('price',e.target.value)}/>
                </span>
                <span id='form-buttons'>
                    <button onClick={this.props.history.goBack}>Cancel</button>
                    {add}
                </span>
            </div>
        );
    }
}

export default Form;