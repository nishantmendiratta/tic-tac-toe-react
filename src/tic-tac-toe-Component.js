import React, { Component } from 'react';
import logo from './logo.svg';
import './Style.css';

function Square(props) {
	return (
		<button className="square" onClick={() => props.onClick()} >
			{props.value}
		</button>
	);
}

class Board extends Component {
	constructor() {
		super();
		this.state = {
			squares : Array(9).fill(''),
			xIsNext : true,
		}
	}
	handleClick(i) {
		const squares = this.state.squares.slice();
		if (this.calculateWinner(squares) || squares[i]) {
			    return;
		}
		squares[i] = (this.state.xIsNext) ? 'X' : 'O';
		this.setState({
			squares : squares,
			xIsNext : !this.state.xIsNext
		});
	}
	getCell(x, y) {
		return this.squares[x][y];
	}
	calculateWinner(squares) {

		let winner = false;
		
		// check rows
		for (let rowInd = 0; rowInd < 3; rowInd++) {
			let row = squares[3*rowInd];
			winner = row;
			for(let colInd = 0; colInd < 3; colInd++) {
				//console.log("["+3*rowInd + "][" + colInd +"]" + row + "~" + squares[3*rowInd+colInd]);
				if(row != squares[3*rowInd+colInd]) {
					winner = false;
				}
			}
			if (winner) return winner;
		 }
		// check columns	
		for (let rowInd = 0; rowInd < 3; rowInd++) {
			let row = squares[rowInd];
			winner = row;
			for(let colInd = 0; colInd < 3; colInd++) {
				//console.log("[" + rowInd + "][" + colInd + "]" + row + "~" + squares[3*colInd+rowInd]);
				if(row != squares[3*colInd+rowInd]) {
					winner = false;
				}
			}
			if (winner) return winner;
		 }
		// check diagonals [TODO should be optimized]
		if(squares[0]&&squares[4]&&squares[8]) {
			if (squares[0] == squares[4] && 
				squares[4] == squares[8] &&
				squares[8] == squares[0]) {
				winner = squares[0]
			}
		}

		if(squares[2]&&squares[4]&&squares[6]) {
			if (squares[2] == squares[4] && 
				squares[4] == squares[6] &&
				squares[6] == squares[2]) {
				winner = squares[2]
			}
		}
		// Check tie. [TODO]
	return winner;
	}
	renderSquare(i) {
		return <Square value={this.state.squares[i]} onClick={ () => this.handleClick(i) } />;
	}
	render() {
		const winner = this.calculateWinner(this.state.squares);
		let status;
		if (winner) {
			status = 'Winner: ' + winner;
		}else{
			status = "Next player: " + ( this.state.xIsNext ? 'X' : 'O' );
		}
		return (
			<div>
				<div className="status">{status}</div>
				<div className="board-row">
			          {this.renderSquare(0)}
			          {this.renderSquare(1)}
			          {this.renderSquare(2)}
			        </div>
				<div className="board-row">
			          {this.renderSquare(3)}
			          {this.renderSquare(4)}
			          {this.renderSquare(5)}
			        </div>
				<div className="board-row">
			          {this.renderSquare(6)}
			          {this.renderSquare(7)}
			          {this.renderSquare(8)}
			        </div>
			</div>
		);
	}
}

class Game extends Component { 
	render() {
		return (
			<div className="game">
				<div className="game-board">
			          <Board />
			        </div>
				<div className="game-info">
				  <div>{/* status */}</div>
				  <ol>{/* TODO */}</ol>
				</div>
			</div>
		);
	}
}

export default Game
