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















