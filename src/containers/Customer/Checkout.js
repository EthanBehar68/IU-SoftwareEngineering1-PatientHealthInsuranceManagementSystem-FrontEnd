import React, {Component, Fragment} from 'react';
import {Link, withRouter} from 'react-router-dom';
import {connect} from "react-redux";
import sumItems from '../../utils/sumItems';
import getTotal from '../../utils/getTotal';
import {db_get_products} from "../../store/actions/products";
import {db_charge_customer} from '../../store/actions/orders';
import moment from 'moment';
import empty from 'is-empty';

import Navbar from '../../components/Nav/Navbar';
import Loading from '../../components/Graphics/Loading';
import ErrorBanner from '../../components/Graphics/ErrorBanner';
import CheckoutPay from '../../components/Forms/CheckoutPay';
import ProductRow from '../../components/Forms/ProductRow';

class Checkout extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loaded: false,
      products: [],
      data: {
        name: '',
        phone: '',
        email: '',
        org: '',
        amount: 0
      },
      error: '',
      empties: false,
      done: false
		};
    this.checkEmpties = this.checkEmpties.bind(this);
	}

  async componentDidMount() {
    await this.props.db_get_products();
  	const products = empty(localStorage.getItem("products")) ? [] : await JSON.parse(localStorage.getItem("products")).map(pro => Object.assign(pro, this.props.products.find(p => pro.id == p.id))).filter(product => product.active);
    localStorage.setItem("products", JSON.stringify(products.filter(product => product.active)));
    this.setState({
      loaded: true,
      products: products,
      items: sumItems(products),
      data: {
        ...this.state.data,
        amount: getTotal(products)
      }
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if(this.state.data != prevState.data) {
      this.checkEmpties();
    }
  }

  removeRow = i => {
    this.setState({
      ...this.state,
      products: this.state.products.filter((product, index) => index != i),
      data: {
        ...this.state.data,
        amount: getTotal(this.state.products.filter((product, index) => index != i))
      }
    });
    localStorage.setItem("products", JSON.stringify(this.state.products.filter((product, index) => index != i)));
  }

  onDataChange = e => {
    this.setState({
      ...this.state,
      data: {
        ...this.state.data,
        [e.target.id]: e.target.value 
      }
    });
  }

  checkEmpties = () => {
    let arr = [];
    const {data} = this.state;
    for (var key in data) {
      if (empty(data[key])) {
        arr.push(key);
      }
    }
    if(empty(arr)) {
      this.setState({
        ...this.state,
        empties: true
      });
      return true;
    } else {
      this.setState({
        ...this.state,
        empties: false
      });
      return false;
    }
  }

  chargeCustomer = async data => {
    this.setState({
      ...this.state,
      loaded: false
    })
    const resp = await this.props.db_charge_customer(data);
    if(resp.complete) {
      this.setState({...this.state, loaded: true, products: [], done: true});
      localStorage.setItem("products", JSON.stringify([]));
    } else {
      this.setState({
        ...this.state,
        loaded: true,
        error: resp.message
      });
    }
  }

	render() {
    const {data} = this.state;

    let product_list = this.state.products.map((product,i) => 
      <ProductRow 
        product={product}
        key={i}
        removeRow={() => this.removeRow(i)}
      />
    );

		return (
			<Fragment>
				<Navbar active="home" items={sumItems(this.state.products)} toCheckout={() => {}}/>
        {!empty(this.state.error) && (<ErrorBanner error={this.state.error} onHide={() => this.setState({...this.state, error: ''})}/>)}
        {!this.state.loaded && (<Loading />)}
        {this.state.loaded && (<div className="dashboard-container">
          {!this.state.done && (<div className="dashboard-box" style={{marginTop: "1rem"}}>
            <div className="left-div">
              <div className="personal-info-container">
                <h2 style={{margin: "0"}}>Personal Info</h2>
                <span style={{marginBottom: "0.5rem", fontSize: "0.8rem"}}>*You must fill out all fields before proceeding to payment.</span>
                <div className="personal-info">
                  <div className="info-side">
                    <label>Name:</label>
                    <input type="text" id="name" className="apparel-input" value={data.name} onChange={this.onDataChange}/>
                    <label>Phone:</label>
                    <input type="tel" id="phone" className="apparel-input" value={data.phone} onChange={this.onDataChange}/>
                  </div>
                  <div className="info-side">
                    <label>Email:</label>
                    <input type="email" id="email" className="apparel-input" value={data.email} onChange={this.onDataChange}/>
                    <label>Fraternity/Sorority:</label>
                    <input type="text" id="org" className="apparel-input" value={data.org} onChange={this.onDataChange}/>
                  </div>
                </div>
              </div>
              <div className="personal-info-container" style={{marginBottom: "0"}}>
                <table className="product-list">
                  <tbody className="product-table-body">
                    <tr className="product-header">
                      <th className="product-head hide">Product</th>
                      <th className="product-head">Name</th>
                      <th className="product-head" style={{textAlign: "center"}}>Size</th>
                      <th className="product-head" style={{textAlign: "center"}}>Quantity</th>
                      <th className="product-head">Price</th>
                    </tr>
                    {!empty(this.state.products) && (<Fragment>
                      {product_list}
                    </Fragment>)}
                    {empty(this.state.products) && (<tr>
                      <td colSpan="5">There are no products in your cart.</td>
                    </tr>)}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="checkout-box">
              <span>Total: ${(getTotal(this.state.products) / 100).toFixed(2)}</span>
              <span style={{marginBottom: "0.4rem"}}>Items: {sumItems(this.state.products)}</span>
              <CheckoutPay disabled={!this.state.empties} amount={getTotal(this.state.products)} data={{...data, products: this.state.products}} chargeCustomer={this.chargeCustomer}/>
            </div>
          </div>)}
          {this.state.done && (
            <div className="thank-you-div">
              <span style={{fontSize: "2.7rem", textAlign: "center"}}>Thanks for reppin Phi Sig!</span>
              <span style={{fontSize: "1.5rem", textAlign: "center"}}>Once the apparel arrives, the apparel chair will give you your items!</span>
            </div>
          )}
        </div>)}
			</Fragment>
		)
	}
}

const mapStateToProps = state => ({
  products: state.products
});

export default connect(mapStateToProps,{db_get_products, db_charge_customer})(withRouter(Checkout));


