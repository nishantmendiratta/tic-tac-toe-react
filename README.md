# tic-tac-toe-react
Going to build an interactive tic-tac-toe game.

###Inside that directory, you can run several commands:

>npm start
Starts the development server.

>npm run build
Bundles the app into static files for production.

>npm test
Starts the test runner.

>npm run eject
Removes this tool and copies build dependencies, configuration files
and scripts into the app directory. If you do this, you can’t go back!

###We suggest that you begin by typing:

	> create-react-app tic-tac-toe
	> npm install
	> npm start

####Getting Started
Start with this example: Starter Code.

It contains the shell of what we're building today. You only need to worry about the JavaScript.

In particular, we have three components:
 - Square
 - Board
 - Game

The Square component renders a single `` <div> ``, the Board renders 9 squares, and the Game component renders a board with some placeholders that we'll fill in later. None of the components are interactive at this point.

(The end of the JS file also defines a helper function `` calculateWinner `` that we'll use later.)

####Passing Data Through Props
Let's just try passing some data from the Board component to the Square component. In Board's `` renderSquare  `` method, change the code to return `` <Square value={i} /> `` then change Square's render method to show that value by replacing `` {/* TODO */} `` with `` {this.props.value} ``

Before:

![alt text](https://facebook.github.io/react/img/tutorial/tictac-empty.png "before")


After: You should see a number in each square in the rendered output.

![alt text](https://facebook.github.io/react/img/tutorial/tictac-numbers.png "after")

####An Interactive Component
Let's make the Square component fill in an "X" when you click it. Try changing the opening tag returned in the `` render() `` function of the `` Square `` class to:

	<button className="square" onClick={() => alert('click')}>

This uses the new JavaScript arrow function syntax. If you click on a square now, you should get an alert in your browser.

React components can have state by setting `` this.state `` in the constructor, which should be considered private to the component. Let's store the current value of the square in state, and change it when the square is clicked. First, add a constructor to the class to initialize the state:

	class Square extends React.Component {
		constructor() {
			super();
			this.state = {
				value: null
			};
		}
		...
	}

In JavaScript classes, you need to explicitly call `` super(); `` when defining the constructor of a subclass. 

Now change the `` render `` method to display `` this.state.value `` instead of `` this.props.value ``, and change the event handler to be `` () => this.setState({value: 'X'}) `` instead of the alert:

	<button className="square" onClick={() => this.setState({ value : 'X' })}>
		{this.state.value}
	</button>

Whenever `` this.setState `` is called, an update to the component is scheduled, causing React to merge in the passed state update and rerender the component along with its descendants. When the component rerenders, `` this.state.value `` will be `` 'X' `` so you'll see an X in the grid.
If you click on any square, an X should show up in it. 

####Developer Tools
The React Devtools extension for Chrome and Firefox lets you inspect a React component tree in your browser devtools.

![alt text](https://facebook.github.io/react/img/tutorial/devtools.png, "debugger")

It lets you inspect the props and state of any of the components in your tree.

####Lifting State Up
We now have the basic building blocks for a tic-tac-toe game. But right now, the state is encapsulated in each Square component. To make a fully-working game, we now need to check if one player has won the game, and alternate placing X and O in the squares. To check if someone has won, we'll need to have the value of all 9 squares in one place, rather than split up across the Square components.

You might think that Board should just inquire what the current state of each Square is. Although it is technically possible to do this in React, it is discouraged because it tends to make code difficult to understand, more brittle, and harder to refactor.

Instead, the best solution here is to store this state in the Board component instead of in each Square – and the Board component can tell each Square what to display, like how we made each square display its index earlier.

**When you want to aggregate data from multiple children or to have two child components communicate with each other, move the state upwards so that it lives in the parent component. The parent can then pass the state back down to the children via props, so that the child components are always in sync with each other and with the parent.**

Pulling state upwards like this is common when refactoring React components, so let's take this opportunity to try it out. Add an initial state for Board containing an array with 9 nulls, corresponding to the 9 squares:

	class Board extends React.Component {
		constructor() {
			super();
			this.state = {
				squares : Array(9).fill(null)
			};
		}
	}

We'll fill it in later so that a board looks something like

	[
		'0' , null , 'X' ,
		'X' , 'X'  , '0' ,
		'0' , null , null,
	]


Pass the value of each square down:

	renderSquare(i) {
		return <Square value={ this.state.value[i] } />
	}

And change Square to use `` this.props.value `` again. Now we need to change what happens when a square is clicked. 
The Board component now stores which squares are filled, which means we need some way for Square to update the state of Board. Since component state is considered private, we can't update Board's state directly from Square. The usual pattern here is pass down a function from Board to Square that gets called when the square is clicked. Change `` renderSquare `` again so that it reads:

	return <Square value={ this.state.value[i] } onClick={ () => this.handleClick(i)} />;

Now we're passing down two props from Board to Square: `` value `` and `` onClick ``. The latter is a function that Square can call. So let's do that by changing `` render `` in Square to have:

	<button className="square" onClick={() => this.props.onClick()}>
		{this.props.value}
	</button>

This means that when the square is clicked, it calls the onClick function that was passed by the parent. The `` onClick `` doesn't have any special meaning here, but it's popular to name handler props starting with `` on `` and their implementations with `` handle ``. Try clicking a square – you should get an error because we haven't defined `` handleClick `` yet. Add it to the Board class:

	handleClick(i) {
		const squares = this.state.squares.slice();
		squares[i] = 'X';
		this.setState({squares: squares});
	}

We call `` .slice() `` to copy the `` squares `` array instead of mutating the existing array.

Now you should be able to click in squares to fill them again, but the state is stored in the Board component instead of in each Square, which lets us continue building the game. Note how whenever Board's state changes, the Square components rerender automatically.

Square no longer keeps its own state; it receives its value from its parent `` Board `` and informs its parent when it's clicked. We call components like this **controlled components**.

####Functional Components
You can now delete the `` constructor `` from `` Square ``; we won't need it any more. In fact, React supports a simpler syntax called **stateless functional components** for component types like Square that only consist of a `` render `` method. Rather than define a class extending React.Component, simply write a function that takes props and returns what should be rendered:

	function Square(props) {
		return {
			<button className="square"  onClick={ () => props.onClick() }>
			{props.value}
			</button>
		}
	}

You'll need to change `` this.props `` to `` props `` both times it appears. Many components in your apps will be able to be written as functional components: these components tend to be easier to write and React will optimize them more in the future.

####Taking Turns 
An obvious defect in our game is that only X can play. Let's fix that.
Let's default the first move to be by 'X'. Modify our starting state in our `` Board `` constructor.

	class Board extends React.Component {
		constructor() {
			super();
			this.state = {
				...
				xIsNext: true,
			}
		};
	}

Each time we move we shall toggle `` xIsNext `` by flipping the boolean value and saving the state. Now update our `` handleClick ``  function to flip the value of `` xIsNext ``.

	handleClick(i) {
		const squares = this.state.squares.slice();
		squares[i] = (this.state.xIsNext) ? 'X' : 'O';
		this.setState({
			squares: squares,
			xIsNext: !this.state.xIsNext
		});
	}

Now X and O take turns. Next, change the "status" text in Board's `` render `` so that it also displays who is next.

	render() {
		  const status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
	....

####Declaring a Winner
Let's show when the game is won. A `` calculateWinner(squares) `` helper function that takes the list of 9 values has been provided for you at the bottom of the file. You can call it in Board's `` render `` function to check if anyone has won the game and make the status text show "Winner: [X/O]" when someone wins:

	render() {
		const winner = calculateWinner(this.state.squares);
		let status;
		if (winner) {
			status = 'Winner: ' + winner;
		}else {
			status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
		}
		...
	}

You can now change `` handleClick `` to return early and ignore the click if someone has already won the game or if a square is already filled:

handleClick(i) {
	const squares = this.state.squares.slice();
	if (calculateWinner(squares) || squares[i]) {
		return;
	}
	...
}

Congratulations! You now have a working tic-tac-toe game. And now you know the basics of React. So you're probably the real winner here.
