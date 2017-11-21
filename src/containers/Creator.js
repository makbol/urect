import React from 'react';
import Rect from '../components/Rect.js';
import Tip from '../components/Tip.js';
import './Creator.css';

class Creator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isDragging: false,
      rectStyle: null,
      showTip: true
    };
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
  }

  getRandomHexColor() {
    // Credits https://stackoverflow.com/a/5092846
    return '#' + (Math.random() * 0xFFFFFF << 0).toString(16);
  }

  onMouseDown(e) {
    if(this.props.limit.width > 0 && this.props.limit.height > 0) {
      this.setState({
        isDragging: true,
        rectStyle: {
          x: e.pageX,
          y: e.pageY,
          bg: this.getRandomHexColor()
        }
      });
    }
  }

  onMouseMove(e) {
    if(this.state.isDragging === true) {
      const width = e.pageX - this.state.rectStyle.x;
      const height = e.pageY - this.state.rectStyle.y;

      if(width > 5 && height > 5) {
        const rectStyle = Object.assign({}, this.state.rectStyle, {
          width: Math.min(this.props.limit.width, width),
          height: Math.min(this.props.limit.height, height),
        });
        this.setState({
          rectStyle,
          showRect: true
        });
      }
    }
  }

  onMouseUp() {
    this.setState({
      isDragging: false,
      showRect: false,
      rectStyle: null,
      showTip: false
    });
    if(this.state.rectStyle.width > 5 && this.state.rectStyle.height > 5) {
      this.props.onAdd(this.state.rectStyle);
    }
  }

  render() {
    const rect = this.state.showRect ? <Rect {...this.state.rectStyle} /> : '';
    return (
      <div>
        <div className="creator"
          onMouseDown={this.onMouseDown}
          onMouseMove={this.onMouseMove}
          onMouseUp={this.onMouseUp}
          onDrag={this.onMouseDrag}>
          {rect}
          <Tip showTip={this.state.showTip} />
        </div>
      </div>
    );
  }
}

export default Creator;
