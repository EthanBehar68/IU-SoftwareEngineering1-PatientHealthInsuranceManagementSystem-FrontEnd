import React, {Component, Fragment} from 'react';
import {Link, withRouter} from 'react-router-dom';
import {connect} from "react-redux";
import moment from 'moment';
import empty from 'is-empty';

import {db_admin_get_products, db_admin_get_orders, db_export_table, db_add_product, db_admin_get_product_options} from '../../store/actions/admin';
import {admin_data_types} from '../../utils/options';

import AdminNavbar from '../../components/Nav/AdminNavbar';
import AdminRow from '../../components/Forms/AdminRow';
import TableLoading from '../../components/Graphics/TableLoading';
import Dropdown from '../../components/Forms/Dropdown';
import AdminDetail from '../../components/Forms/AdminDetail';

class AdminDashboard extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loaded: false,
			table: !empty(this.props.match.params) ? this.props.match.params.table : "products",
			page: 1,
			amount: 25,
			currentData: {},
			location: "",
			options: true,
			small: false,
			productFilter: {label: "All", value: 0},
			product: {
				name: '',
				price: '',
				photo: '',
        sizes: []
			}
		};
		this.getData = this.getData.bind(this);
		this.nextPage = this.nextPage.bind(this);
		this.prevPage = this.prevPage.bind(this);
		this.locationSearch = this.locationSearch.bind(this);
		this.exportData = this.exportData.bind(this);
	}

	resize() {
    let currentHideNav = (window.innerWidth <= 760);
    if (currentHideNav !== this.state.small) {
        if(currentHideNav) this.setState({small: true, options: false});
        if(!currentHideNav) {
		    	this.setState({small: false, options: true});
		    }
    }
	}

  async componentDidMount() {
  	window.addEventListener("resize", this.resize.bind(this));
    this.resize();
    await this.props.db_admin_get_product_options();
  	await this.getData(this.state.table);
  	this.setState({
  		loaded: true
  	});
  }

  async componentWillReceiveProps(nextProps) {
		if(nextProps.match.params != this.props.match.params) {
			this.setState({
				...this.state,
				table: nextProps.match.params.table
			})
		}
	}

	imgHandler = e => {
  	e.preventDefault();
  	if(e.target.files.length > 0) this.imgChange(e, this.setImgState);
  }

  imgChange = (e, cb) => {
		var reader = new FileReader();
    reader.onload = function() { cb(reader.result) };
    reader.readAsDataURL(e.target.files[0]);
	}

	setImgState = blob => {
		this.setState({
    	...this.state,
    	product: {
    		...this.state.product,
    		photo: blob
    	}
    });
	}

  onChange = e => {
  	e.preventDefault();
    this.setState({
    	[e.target.id]: e.target.value
    });
  };

  onProductChange = e => {
  	e.preventDefault();
    this.setState({
    	...this.state,
    	product: {
    		...this.state.product,
    		[e.target.id]: e.target.value
    	}
    });
  };

  exportData = () => {
  	this.props.db_export_table(this.state.table, this.state.productFilter.value, this.state.table + " export");
  }

  getData = async table => {
  	if (table == "products") {
  		const resp = await this.props.db_admin_get_products({page: this.state.page, amount: this.state.amount});
  		if(resp.complete) return true;
  	}
  	if (table == "orders") {
  		const resp = await this.props.db_admin_get_orders({page: this.state.page, amount: this.state.amount, productFilter: this.state.productFilter.value});
  		if(resp.complete) return true;
  	}
  }

  nextPage = async () => {
  	await this.setState({
  		...this.state,
  		loaded: false,
  		page: this.state.page + 1
  	});
  	await this.getData(this.state.table);
  	this.setState({
  		...this.state,
  		loaded: true
  	})
  }

  prevPage = async () => {
  	await this.setState({
  		...this.state,
  		loaded: false,
  		page: this.state.page - 1
  	});
  	await this.getData(this.state.table);
  	this.setState({
  		...this.state,
  		loaded: true
  	})
  }

  handleDataChange = async value => {
  	await this.setState({
  		...this.state,
  		loaded: false
  	});
  	if(!empty(value)) await this.getData(value.value.toLowerCase());
  	this.props.history.push(`/admin/dashboard/${empty(value) ? "" : value.value.toLowerCase()}`);
  	this.setState({
  		...this.state,
  		loaded: true
  	});
  }

  handleProductFilterChange = async value => {
  	await this.setState({
  		...this.state,
  		loaded: false,
  		productFilter: empty(value) ? {value: 0, label: "All"} : value
  	});
  	if(!empty(value)) await this.getData(this.state.table);
  	this.setState({
  		...this.state,
  		loaded: true
  	});
  }

  locationSearch = async () => {
  	await this.setState({
  		...this.state,
  		loaded: false
  	});
  	await this.getData(this.state.table);
  	this.setState({
  		...this.state,
  		loaded: true
  	})
  }

  onHide = () => {
  	this.setState({...this.state, currentData: {}});
  	document.body.style.overflow = "auto";
  }

  setDetail = data => {
  	this.setState({...this.state, currentData: data})
  	document.body.style.overflow = "hidden";
  }

  addProduct = e => {
  	e.preventDefault();
  	this.props.db_add_product({...this.state.product, sizes: JSON.stringify(this.state.product.sizes)});
  }

  handleSizesChange = e => {
    this.setState({
      ...this.state,
      product: {
        ...this.state.product,
        sizes: this.state.product.sizes.includes(e.target.id) ? this.state.product.sizes.filter(size => size != e.target.id) : [...this.state.product.sizes, e.target.id]
      }
    })
  }

	render() {
		const {table, radius, page, currentData, small, statusFilter, product} = this.state;
		const {admin_data, productOptions} = this.props;

		let data = admin_data.map(d => 
			<AdminRow 
				key={d.id}
				data={d}
				onClick={this.setDetail}
				table={table}
				small={small}
			/>
		);

		return (
			<Fragment>
				<AdminNavbar active="home" />
				{!empty(currentData) && (<AdminDetail hide={this.onHide} data={currentData} table={table}/>)}
				<div className="dashboard-container admin">
					<div className="find-container">
						{this.state.options && (<div className="find-sidebar admin">
							<div className="find-sidebar-container admin">
								<span className="options-close" onClick={() => this.setState({options: false})}>X</span>
								<span className="sidebar-subtitle admin">Table:</span>
								<div className="sb-dropdown-container"><Dropdown options={admin_data_types} onChange={this.handleDataChange} value={empty(table) ? null : {label: table, value: table}} /></div>
								{table == "orders" && (<Fragment><span className="sidebar-subtitle admin">Product Filter:</span>
								<div className="sb-dropdown-container"><Dropdown options={productOptions} onChange={this.handleProductFilterChange} value={this.state.productFilter} /></div></Fragment>)}
								{table == "orders" && (<Fragment><span className="sidebar-subtitle admin">XLSX Export:</span>
								<button className="sign-in-btn admin" style={{margin: "0"}} onClick={() => this.exportData()}>Export</button></Fragment>)}
								<br/>
								<br/>
								<br/>
								{table == "products" && (<Fragment><span className="sidebar-subtitle admin">New Product:</span>
								<form>
									<label>Name</label>
									<input type="text" id="name" className="apparel-input" value={product.name} onChange={this.onProductChange}/>
									<label>Price</label>
									<input className="apparel-input" id="price" type="number" pattern="\d*" value={product.price} onChange={this.onProductChange}/>
									<label>Photo</label>
									<input className="file-input" type="file" accept="image/*" name="IMAGE" onChange={this.imgHandler}/>
                  <div className="checkbox-container">
                    <div className="checkbox-div">
                      <input type="checkbox" onChange={this.handleSizesChange} id="XS" value="XS" checked={this.state.product.sizes.includes("XS")}/>
                      <label htmlFor="XS">XS</label>
                    </div>
                    <div className="checkbox-div">
                      <input type="checkbox" onChange={this.handleSizesChange} id="S" value="S" checked={this.state.product.sizes.includes("S")}/>
                      <label htmlFor="S">S</label>
                    </div>
                    <div className="checkbox-div">
                      <input type="checkbox" onChange={this.handleSizesChange} id="M" value="M" checked={this.state.product.sizes.includes("M")}/>
                      <label htmlFor="M">M</label>
                    </div>
                    <div className="checkbox-div">
                      <input type="checkbox" onChange={this.handleSizesChange} id="L" value="L" checked={this.state.product.sizes.includes("L")}/>
                      <label htmlFor="L">L</label>
                    </div>
                    <div className="checkbox-div">
                      <input type="checkbox" onChange={this.handleSizesChange} id="XL" value="XL" checked={this.state.product.sizes.includes("XL")}/>
                      <label htmlFor="XL">XL</label>
                    </div>
                    <div className="checkbox-div">
                      <input type="checkbox" onChange={this.handleSizesChange} id="XXL" value="XXL" checked={this.state.product.sizes.includes("XXL")}/>
                      <label htmlFor="XXL">XXL</label>
                    </div>
                    <div className="checkbox-div" style={{width: "5rem"}}>
                      <input type="checkbox" onChange={this.handleSizesChange} id="ONE-SIZE" value="ONE-SIZE" checked={this.state.product.sizes.includes("ONE-SIZE")}/>
                      <label htmlFor="ONE-SIZE">ONE-SIZE</label>
                    </div>
                  </div>
									<button className="sign-in-btn admin" onClick={this.addProduct}>Add</button>
								</form></Fragment>)}
							</div>
						</div>)}
						<div className="pagination-container">
							<div className="find-table-section admin">
								<div className="find-table-header">
									<span className="find-table-header-title">{table}</span>
									<div className="find-options admin" onClick={() => this.setState({options: !this.state.options})}><svg className="blue-options admin" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><path d="M10 18h4v-2h-4v2zM3 6v2h18V6H3zm3 7h12v-2H6v2z"/><path d="M0 0h24v24H0z" fill="none"/></svg><span className="options-btn admin">Options</span></div>
								</div>
								<table className="find-table">
									<tbody>
										{table == "products" && (<tr className="find-row heading">
											<th>ID</th>
											<th>PHOTO</th>
											<th>PRODUCT</th>
											<th>PRICE</th>
											<th>ACTIVE</th>
										</tr>)}
										{table == "orders" && (<tr className="find-row heading">
											<th style={small ? {display: "none"} : {}}>ID</th>
											<th>NAME</th>
											<th>PRODUCT</th>
											<th>QUANTITY</th>
											<th>SIZE</th>
											<th style={small ? {display: "none"} : {}}>TOTAL</th>
											<th style={small ? {display: "none"} : {}}>ORG</th>
										</tr>)}
										{this.state.loaded && (
											<Fragment>
												{data}
												{data.length == 0 && (<tr className="find-row">
													<td colSpan="5">There are no items to see.</td>
												</tr>)}
											</Fragment>
										)}
									</tbody>
								</table>
								{!this.state.loaded && (<TableLoading />)}
							</div>
							<div className="pagination-div">
								{page != 1 && (<span className="pagination-btn" onClick={() => this.prevPage()}>Previous</span>)}
								{admin_data.length == this.state.amount && (<span className="pagination-btn" onClick={() => this.nextPage()}>Next</span>)}
							</div>
						</div>
					</div>
				</div>
			</Fragment>
		)
	}
}

const mapStateToProps = state => ({
  user: state.auth.user,
  admin_data: state.admin_data,
  productOptions: state.productOptions
});

export default connect(mapStateToProps,{db_admin_get_products, db_admin_get_orders, db_export_table, db_add_product, db_admin_get_product_options})(withRouter(AdminDashboard));

