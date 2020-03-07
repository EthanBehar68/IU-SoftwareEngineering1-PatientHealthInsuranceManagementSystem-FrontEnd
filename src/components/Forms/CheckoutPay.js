import React from 'react'
import StripeCheckout from 'react-stripe-checkout';

import icon from '../../images/icon.png';
 
export default class CheckoutPay extends React.Component {
  onToken = (token) => {
    this.props.chargeCustomer({...this.props.data, token: token.id});
  }
 
  render() {
    return (
      <StripeCheckout
        name="PSK Apparel"
        amount={this.props.amount}
        token={this.onToken}
        stripeKey="pk_test_jzVfc9MR4WDKN9FVwaLZzj5N"
        allowRememberMe={false}
        currency="USD"
        image={icon}
        disabled={this.props.disabled}
      />
    )
  }
}