import React, {Component} from 'react';
import './Product.css';

class Product extends Component{

    render(){
        const {id, name,price,img} = this.props.val;
        let imgStyle = {
            backgroundImage: `url(${img})`
        };
        return(
            <div className='product-body'>
                <span className='product-img' style={imgStyle}>
                </span>
                <span className='product-flex'>
                    <span className='product-data'>
                    <span>{name}</span>
                    <span>${price}</span>
                    </span>
                    <span className='product-buttons'>
                        <button onClick={(e)=>this.props.deleteItem(id)}>Delete</button>
                        <button onClick={()=>this.props.setCurrent(id)}>Edit</button>
                    </span>
                </span>
            </div>
        );
    }
}

export default Product;