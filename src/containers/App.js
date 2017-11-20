import React from 'react';
import Rect from '../components/Rect.js';
import Creator from './Creator.js';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rects: []
    };
    this.viewportWidth = window.innerWidth;
    this.viewportHeight = window.innerHeight;

    this.addRect = this.addRect.bind(this);
  }
  addRect(rect) {
    this.setState({
      rects: [...this.state.rects, rect]
    });
  }
  canCreate() {
    const lessThenFive = this.state.rects.length < 5;
    if(this.state.rects.length > 0) {
      const rectsTotalDims = this.state.rects.reduce((acc, rect) =>
        ({
          width: acc.width + rect.width,
          height: acc.height + rect.height
        }));
      const lessThenViewportDims = rectsTotalDims.width < this.viewportWidth &&
                                     rectsTotalDims.height < this.viewportHeight;
      return lessThenFive && lessThenViewportDims;
    }
    return lessThenFive;
  }
  render () {
    const rects = this.state.rects.map((rect, ix) => <Rect key={ix} {...rect} />);
    const creator = this.canCreate() ? <Creator onAdd={this.addRect} /> : '';
    return (
      <div>
        {creator}
        {rects}
      </div>
    );
  }
}

export default App;
