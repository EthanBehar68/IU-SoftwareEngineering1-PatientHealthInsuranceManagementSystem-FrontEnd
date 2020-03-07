import React, { Component, Fragment } from 'react';
import Select from 'react-select';

type State = {
  isClearable: boolean,
  isDisabled: boolean,
  isLoading: boolean,
  isRtl: boolean,
  isSearchable: boolean,
};

export default class SingleSelect extends Component<*, State> {
  state = {
    isClearable: true,
    isDisabled: false,
    isLoading: false,
    isRtl: false,
    isSearchable: true,
  };

  toggleClearable = () =>
    this.setState(state => ({ isClearable: !state.isClearable }));
  toggleDisabled = () =>
    this.setState(state => ({ isDisabled: !state.isDisabled }));
  toggleLoading = () =>
    this.setState(state => ({ isLoading: !state.isLoading }));
  toggleRtl = () => this.setState(state => ({ isRtl: !state.isRtl }));
  toggleSearchable = () =>
    this.setState(state => ({ isSearchable: !state.isSearchable }));
  render() {
    const {
      isClearable,
      isSearchable,
      isDisabled,
      isLoading,
      isRtl,
    } = this.state;
    return (
      <Fragment>
        <Select
          className="basic-single"
          classNamePrefix="select"
          isDisabled={this.props.isDisabled}
          isLoading={this.props.isLoading}
          isClearable={this.props.isClearable}
          isRtl={this.props.isRtl}
          isSearchable={this.props.isSearchable}
          name={this.props.name}
          options={this.props.options}
          value={this.props.value}
			    onChange={value => this.props.onChange(value)}
			    className="basic-single"
			    placeholder=""
        />
      </Fragment>
    );
  }
}