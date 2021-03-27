import React from 'react';
import ControlPanel from './ControlPanel';
import MineField from './MineField';

class Game extends React.Component {
  state = {
    flagCnt: 0,
    seconds: 0,
  };

  start = () => {
    this.timerID = setInterval(() => this.tick(), 1000);
  }

  stop = () => {
    clearInterval(this.timerID)
  }

  tick() {
    const oldsec = this.state.seconds;
    this.setState({seconds: oldsec + 1});
  }

  startGame = () => {
    this.start();
  }

  stopGame = (isGameWon) => {
    if (isGameWon) {
      alert("You win");
    } else {
      alert("You lose");
    }
    this.stop();
  }

  setFlag = (val) => {
    let oldflagCnt = this.state.flagCnt;
    oldflagCnt += val;
    this.setState({flagCnt: oldflagCnt});
  }


  render () {
    return (
      <div className='Game'>
        <ControlPanel 
          flagCnt={this.state.flagCnt} 
          seconds={this.state.seconds}
        />
        <MineField
          rows='8'
          cols='8'
          mines='10'
          gameStarted={this.startGame}
          gameOver={this.stopGame}
          changeFlagCount={this.setFlag}
        />
      </div>
    );
  }
}

export default Game;
