import React, {Component, Fragment} from 'react';

class ProductCard extends Component {

  constructor(props) {
    super(props);
    this.state = {
    	sizes: []
    }
    this.toParentCart = this.toParentCart.bind(this);
  }

  toParentCart = async e => {
  	const {product} = this.props;
  	e.preventDefault();
  	let products = [];
  	await this.state.sizes.forEach(function(size) {
  		products.push({...size, quantity: parseInt(size.quantity), product: product.name, id: product.id, active: false});
  	});
  	await this.props.toCart(products);
  	this.setState({
  		...this.state,
  		sizes: []
  	});
  	this.myform.reset();
  }

  onChange = e => {
  	e.preventDefault();
  	this.setState({
  		...this.state,
  		sizes: [...this.state.sizes.filter(s => {
				return s.size != e.target.id;
			}), {size: e.target.id, quantity: e.target.value}]
  	});
  }

  render() {
    const {product} = this.props;
    return (
      <form className="dashboard-side" ref={(el) => this.myform = el}>
				<img src={`https://pskapparel.blob.core.windows.net/${product.id}product/photo`} alt="" className="product-photo"/>
				<div className="product-description">
					<span className="product-title">{product.name}</span>
					<span>${(product.price / 100).toFixed(2)}</span>
					<div className="size-input-div">
						<div className="size-input-choice">
							<input className="size-input" id="S" type="number" pattern="\d*" onChange={this.onChange}/>
							<span>S</span>
						</div>
						<div className="size-input-choice">
							<input className="size-input" id="M" type="number" pattern="\d*" onChange={this.onChange}/>
							<span>M</span>
						</div>
						<div className="size-input-choice">
							<input className="size-input" id="L" type="number" pattern="\d*" onChange={this.onChange}/>
							<span>L</span>
						</div>
						<div className="size-input-choice">
							<input className="size-input" id="XL" type="number" pattern="\d*" onChange={this.onChange}/>
							<span>XL</span>
						</div>
					</div>
					<button className="add-to-cart" onClick={this.toParentCart}>Add to Cart</button>
				</div>
			</form>
    );
  }
}

export default ProductCard;
