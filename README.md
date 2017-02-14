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






