import React from 'react';

import flag from './images/flag.png';
import bomb from './images/bomb.png'

class Cell extends React.Component {

  leftClickHandler = () => {
    this.props.clickLeft(this.props.row, this.props.col);
  }

  rightClickHandler = (e) => {
    e.preventDefault();
    this.props.clickRight(this.props.row, this.props.col);
  }

  render () {
    const cellSize = 40; //px
    var width = cellSize + 'px';
    var height = cellSize + 'px';
    var left = this.props.col * (cellSize + 4) + 'px';
    var top = this.props.row * (cellSize + 4) + 'px';
    let backgroundColor = this.props.opened ? '#adadad' : '#501b1d';

    var rendstate = () => {
        if (this.props.checked) {
          return (
            <img className='flag' src={flag} alt=''/>
          )
        }
        if (this.props.opened) {
          return (
            this.props.hasBomb ? <img className='bomb' src={bomb} alt=''/> : (this.props.bombNbr > 0 ? this.props.bombNbr : ''));
        }
    }

    return (
      <div className='Cell'
        style={{width, height, left, top, backgroundColor}}
        onClick={this.leftClickHandler}
        onContextMenu={this.rightClickHandler}
      >
        {rendstate()}
      </div>
    );
  }
}

export default Cell;
