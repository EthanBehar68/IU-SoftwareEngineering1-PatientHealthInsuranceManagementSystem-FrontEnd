import React, {Component, Fragment} from 'react';
import {Link, withRouter} from 'react-router-dom';
import {connect} from "react-redux";
import {db_get_products} from "../../store/actions/products";
import sumItems from '../../utils/sumItems';
import moment from 'moment';
import empty from 'is-empty';

import Navbar from '../../components/Nav/Navbar';
import Loading from '../../components/Graphics/Loading';
import ProductCard from '../../components/Forms/ProductCard';

class Products extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loaded: false,
			items: sumItems(this.props.products)
		};
		this.toCart = this.toCart.bind(this);
	}

  async componentDidMount() {
  	await this.props.db_get_products();
  	const products = empty(localStorage.getItem("products")) ? [] : JSON.parse(localStorage.getItem("products"));
  	this.setState({
  		loaded: true,
  		items: sumItems(products)
  	});
  }

  toCart = products => {
  	this.setState({
  		...this.state,
  		items: this.state.items + sumItems(products)
  	});
  	const existing = empty(localStorage.getItem("products")) ? [] : JSON.parse(localStorage.getItem("products"));
  	localStorage.setItem("products", JSON.stringify([...existing, ...products]));
  }

	render() {

		let product_list = this.props.products.map(product => 
      <ProductCard 
        product={product}
        key={product.id}
        toCart={this.toCart}
      />
    );

		return (
			<Fragment>
				<Navbar active="home" items={this.state.items}/>
				{!this.state.loaded && (<Loading />)}
				{this.state.loaded && (<div className="dashboard-container">
					<div className="dashboard-box">
				    {!empty(product_list) && (product_list)}
            {empty(product_list) && (
              <div className="thank-you-div">
                <span style={{fontSize: "1.5rem", textAlign: "center"}}>There are no products currently for sale.</span>
              </div>
            )}
					</div>
				</div>)}
			</Fragment>
		)
	}
}

const mapStateToProps = state => ({
  products: state.products
});

export default connect(mapStateToProps, {db_get_products})(withRouter(Products));


