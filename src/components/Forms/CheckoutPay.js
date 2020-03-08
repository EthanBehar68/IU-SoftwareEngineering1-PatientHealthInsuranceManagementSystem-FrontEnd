import React from 'react'
import StripeCheckout from 'react-stripe-checkout';

import icon from '../../images/icon.png';
import {STRIPE_PUBLIC_KEY} from '../../utils/constants';
 
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
        stripeKey={STRIPE_PUBLIC_KEY}
        allowRememberMe={false}
        currency="USD"
        image={icon}
        disabled={this.props.disabled}
      />
    )
  }
}