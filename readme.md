# Sample JS Project Proposal: Exploding Numbers
--------------------
## Background ##
The game is as follows: numbered blocks fall to the bottom of the screen, stacking toward the top. A row of number blocks starts out on the bottom. If any column reaches the top of the screen the player loses. A mathematical expression is visible on screen, and the user must select blocks solving the expression. Speed of each block is random within some range, and the game ends either when the user runs out of space or when he clears out the bottom row.

## Functionality and MVP ##
The minimum requirements will be that the user can:
- Start, pause, and reset the game
- Select squares and terminate squares if they solve expression
- Select which operations the expressions can use

## Wireframes ##

The app is a single view, with no special controller menu or the likes. The view is depicted here:

NB: Some combination of blue ink, regular paper, and phone camera results in poor picture. I will recreate the picture and upload that. This is the current state:

![Was rotated automatically when pulled into Atom](https://github.com/pangland/JavaScript-Proposal/why_is_this_rotated.jpg)


## Architecture and Technologies ##

This project will be implemented using JavaScript. The main view and logic will exist in `board.js`. There will be a `square.js` file to handle the logic of each square, which at minimum includes speed and value.

## Implementation Timeline ##

**Day 1**: Implement the bare minimum requirements to get a game screen up and running.

**Day 2**: Finish creating behavior of particular squares, such as value, speed, color, etc. If time provides, set up the logic or selecting squares to match expression.

**Day 3**: Setup logic to generate pseudo-random expressions and to select squares to solve those expressions.

**Day 4**: Create tabs to allow for filtering of expression types.

## Bonus Features ##

For more fun, if time allows, I can add:

- Science questions (physics, calculus, logic problems, etc).
- Music
