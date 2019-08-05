
import React, { Component } from 'react';
import { connect } from 'dva';
class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        <p>Umi{this.props.global.name}</p>
      </div>
    );
  }
}

export default connect(({ global }) => ({ global }))(Index)
