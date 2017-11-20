import React from 'react';
import './Rect.css';

class Rect extends React.Component {
  propsToStyle() {
    return {
      width: this.props.width + 'px',
      height: this.props.height + 'px',
      left: this.props.x + 'px',
      top: this.props.y + 'px',
      background: this.props.bg
    };
  }
  render () {
    return (
      <div className="rect" style={this.propsToStyle()}>
        <div className="rect-dimension">{this.props.height} x {this.props.width}</div>
      </div>
    );
  }
}

export default Rect;
