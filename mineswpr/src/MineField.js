import React from 'react';

import Cell from './Cell';

class MineField extends React.Component {
  constructor(props) {
    super(props);
    this.closedCells = props.rows * props.cols - props.mines;
    this.flagCount = 0;
    this.state = {
      field: this.createMap(this.props.rows, this.props.cols, this.props.mines),
      gameState: 'waiting',
    }
  }

  openCell = (field, row, col) => {
    if (!field[row][col].opened && !field[row][col].checked) {
      if (field[row][col].hasBomb) {
        this.setState({gameState: 'finished'});
        field[row][col].opened = true;
        this.props.gameOver(false);
        return;
      } 
      field[row][col].opened = true;
      this.closedCells -= 1;
      if (this.closedCells === 0) {
        this.props.gameOver(true);
        this.setState({gameState: 'finished'});
      }
    }
    if (field[row][col].bombNbr === 0 && field[row][col].nbrs.length > 0 && !field[row][col].hasBomb) {
      while(field[row][col].nbrs.length > 0) {
        let rf = field[row][col].nbrs.shift();
        this.openCell(field, rf[0], rf[1]);
      }
    }
  }

  cellLeftClicked = (row, col) => {
    switch (this.state.gameState) {
      case 'waiting': 
        this.props.gameStarted();
        this.setState({gameState: 'started'});
        /* falls through */
      case 'started':
        let newField = [...this.state.field];
        this.openCell(newField, row, col);
        this.setState({field: newField});
        break;
      case 'finished':
        break;
      default:
        break;
    }
  }

  cellRightClicked = (row, col) => {
    switch (this.state.gameState) {
      case 'waiting': 
        break;
      case 'started':
        if (this.state.field[row][col].opened) {
          break;
        }
        let newField = [...this.state.field];
        let flagCntDiff = newField[row][col].checked ? -1 : 1;
        if ((this.flagCount + flagCntDiff) < 0 || (this.flagCount + flagCntDiff) > this.props.mines) {
          break;
        }
        this.flagCount += flagCntDiff;
        this.props.changeFlagCount(flagCntDiff);
        newField[row][col].checked = !newField[row][col].checked;
        this.setState({field: newField});
        break;
      case 'finished':
        break;
      default:
        break;
    }
  }
  
  render() {
    return (
      <div className='MineField'>
      {
        this.state.field.map(function(row){
          return row.map(function (cell) {
            return (
              <Cell 
              row={cell.row} 
                col={cell.col} 
                hasBomb={cell.hasBomb}
                bombNbr={cell.bombNbr}
                key={cell.row + "-" + cell.col}
                checked={cell.checked}
                opened={cell.opened}
                clickLeft={this.cellLeftClicked}
                clickRight={this.cellRightClicked}
              />
            )
          }, this);
        }, this)
      }
      </div>
    );
  }

  createMap = (rows, cols, mines) => {
    let result = [];
    for (let row = 0; row < rows; row ++) {
      let string = []
      for (let col = 0; col < cols; col++) {
        let cell = new cellData(row, col);
        string.push(cell);
      }
      result.push(string)
    }
    //arrange mines
    let i = mines
    while (i > 0) {
      let row = getRandomInt(rows);
      let col = getRandomInt(cols);
      if (!result[row][col].hasBomb) {
        result[row][col].hasBomb = true;
        i--;
      }
    }
    //count neighbors bombs
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        if (result[row][col].hasBomb) {
          if (col > 0) {
            result[row][col - 1].bombNbr += 1;
          }
          if (col < cols - 1) {
            result[row][col + 1].bombNbr += 1;
          }
          if (row > 0) {
            result[row - 1][col].bombNbr += 1;
          }
          if (row < rows - 1) {
            result[row + 1][col].bombNbr += 1;
          }
          if (row > 0 && col > 0) {
            result[row - 1][col - 1].bombNbr += 1;
          }
          if (row < rows - 1 && col < cols - 1) {
            result[row + 1][col + 1].bombNbr += 1;
          }
          if (row > 0 && col < cols - 1) {
            result[row - 1][col + 1].bombNbr += 1;
          }
          if (row < rows - 1 && col > 0) {
            result[row + 1][col - 1].bombNbr += 1;
          }
        }
      }
    }

    //collect neighbors
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        if (col > 0) {
          result[row][col].nbrs.push([[row],[col - 1]]);
        }
        if (col < cols - 1) {
          result[row][col].nbrs.push([[row], [col + 1]]);
        }
        if (row > 0) {
          result[row][col].nbrs.push([[row - 1], [col]]);
        }
        if (row < rows - 1) {
          result[row][col].nbrs.push([[row + 1], [col]]);
        }
        if (row > 0 && col > 0) {
          result[row][col].nbrs.push([[row - 1], [col - 1]]);
        }
        if (row < rows - 1 && col < cols - 1) {
          result[row][col].nbrs.push([[row + 1], [col + 1]]);
        }
        if (row > 0 && col < cols - 1) {
          result[row][col].nbrs.push([[row - 1], [col + 1]]);
        }
        if (row < rows - 1 && col > 0) {
          result[row][col].nbrs.push([[row + 1], [col - 1]]);
        }
      }
    }
    return result;
  }
}

//Demo from documentation
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

class cellData {
  constructor (row, col) {
    this.row = row;
    this.col = col;
    this.hasBomb = false;
    this.checked = false;
    this.opened = false;
    this.bombNbr = 0;
    this.nbrs = [...Array(0)];
  }
}


export default MineField;
