import React from 'react';
import './Tip.css';

class Tip extends React.Component {
  render () {
    return this.props.showTip ? <h1 className="tip">Make rectangle by dragging mouse</h1> : '';
  }
}

export default Tip;
