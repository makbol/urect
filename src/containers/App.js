import React from 'react';
import Rect from '../components/Rect.js';
import Creator from './Creator.js';
import Store from '../Store.js';
import './App.css';

const store = new Store();

class App extends React.Component {
  constructor(props) {
    super(props);

    this.viewportWidth = window.innerWidth;
    this.viewportHeight = window.innerHeight;

    this.state = store.import() || {
      rects: [],
      limit: {
        width: this.viewportWidth,
        height: this.viewportHeight
      }
    };

    this.addRect = this.addRect.bind(this);
  }

  componentDidUpdate() {
    store.export(this.state);
  }

  addRect(rect) {
    const rects = [...this.state.rects, rect];
    const rectsTotalDims = this.getTotalRectsDims(rects);
    this.setState({
      rects,
      limit: {
        width: this.viewportWidth - rectsTotalDims.width,
        height: this.viewportHeight - rectsTotalDims.height,
      }
    });
  }

  getTotalRectsDims(rects) {
    if(rects.length > 0) {
      return rects.reduce((acc, rect) =>
        ({
          width: acc.width + rect.width,
          height: acc.height + rect.height
        }));
    } else {
      return { width: 0, height: 0 };
    }
  }
  canCreate() {
    const lessThenFive = this.state.rects.length < 5;
    const rectsTotalDims = this.getTotalRectsDims(this.state.rects);
    const lessThenViewportDims = rectsTotalDims.width < this.viewportWidth &&
                                 rectsTotalDims.height < this.viewportHeight;
    return lessThenFive && lessThenViewportDims;
  }
  render () {
    const rects = this.state.rects.map((rect, ix) => <Rect key={ix} {...rect} />);
    const creator = this.canCreate() ? <Creator limit={this.state.limit} onAdd={this.addRect} /> : '';
    return (
      <div>
        {creator}
        {rects}
      </div>
    );
  }
}

export default App;
