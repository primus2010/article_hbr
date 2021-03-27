import React from 'react';

class Machine extends React.Component {

  state = {
    machineState: 'STOPPED',
    buttonLabel: 'START',
    machineStartCount: 0
  }

  clickButtonHandler = () => {
    switch (this.state.machineState) {
      case 'STOPPED':
        const cnt = this.state.machineStartCount;
        this.setState({machineState: 'STARTED', 
          buttonLabel: 'STOP',
          machineStartCount: cnt + 1});
        break;
      case 'STARTED':
        this.setState({machineState: 'STOPPED', 
          buttonLabel: 'START'});
        break;
      default:
        break;
    }
  }

  render () {
    return (
      <div className='Component'>
        {this.props.name}
        <p>Я интерфейс машины.</p>
        <p>Состояние машины: {this.state.machineState}. 
          <br/>
          <button onClick={this.clickButtonHandler}>{this.state.buttonLabel}</button>
        </p>
        Машину запускали {this.state.machineStartCount} раз.
      </div>
    );
  }
}

export default Machine;
