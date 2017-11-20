import React from 'react';

class Creator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      height: 0,
      width: 0,
      x: 0,
      y: 0
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.add = this.add.bind(this);
  }

  add() {
    const rect = {
      height: this.state.height,
      width: this.state.width,
      x: this.state.x,
      y: this.state.y
    };
    this.props.onAdd(rect);
    this.clear();
  }

  clear() {
    this.setState({
      height: 0,
      width: 0,
      x: 0,
      y: 0
    });
  }

  handleInputChange(event) {
    const target = event.target;
    const name = target.name;

    this.setState({
      [name]: target.value
    });
  }

  render () {
    return (
      <div>
        <button onClick={this.add}>Add rect</button>
        <input placeholder="height" name='height' value={this.state.height} onChange={this.handleInputChange} />
        <input placeholder="width" name="width" value={this.state.width} onChange={this.handleInputChange} />
        <input placeholder="x" name="x" value={this.state.x} onChange={this.handleInputChange} />
        <input placeholder="y" name="y" value={this.state.y} onChange={this.handleInputChange} />
      </div>
    );
  }
}

export default Creator;
