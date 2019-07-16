import React from 'react';
import Board from './Board'

export default class Game extends React.Component {
  state = {
    history: [
      {
        squares: Array(9).fill(null),
      }
    ],
    stepNumber: 0,
    xIsNext: true,
  };

  calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  handleClick = (i) => {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();

    if (this.calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';

    this.setState({
      history: history.concat([{
        squares: squares,
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    })
  };

  goTo = stepNumber => () => {
    this.setState({
      stepNumber,
      xIsNext: stepNumber % 2 === 0,
    });
  };

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = this.calculateWinner(current.squares);

    let status;
    if (winner) {
      status = `Winner: ${winner}`;
    } else {
      const nextPlayer = this.state.xIsNext ? 'X': 'O';
      status = `Next player: ${nextPlayer}`;
    }

    const moves = history.map((item, move) => {
      const desc = move === 0 ? 'Go to game started!' : `Go to move ${move}`;
      return (
        <li key={move}>
          <button onClick={this.goTo(move)}>{desc}</button>
        </li>
      );
    });

    return (
      <div className="game">
        <div className="game-board">
          <Board
            onClick={this.handleClick}
            squares={current.squares}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}