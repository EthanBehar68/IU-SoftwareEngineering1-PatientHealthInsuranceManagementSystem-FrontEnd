import React, {Component, Fragment} from 'react';

class ProductRow extends Component {

  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    const {product} = this.props;
    return (
      <Fragment>
        <tr className="product-row">
          <td className="hide"><img src={`https://pskapparel.blob.core.windows.net/${product.id}product/photo`} alt="" className="product-row-photo"/></td>
          <td>{product.product}</td>
          <td style={{textAlign: "center"}}>{product.size}</td>
          <td style={{textAlign: "center"}}>{product.quantity}</td>
          <td>${(product.price / 100).toFixed(2)}</td>
          <td style={{color: "red", textAlign: "right", cursor: "pointer", fontSize: "1.1rem"}} onClick={this.props.removeRow}>x</td>
        </tr>
      </Fragment>
    );
  }
}

export default ProductRow;
