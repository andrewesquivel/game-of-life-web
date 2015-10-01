proj2
=====
My projec is broken up into 5 interfaces

The concerns I identified where handling the board state, controlling the flow of the game, displaying the board, holding preset states and shapes, handling click events.

MODEL - This handles the board, stepping, getting and setting the state of the board, adding to the board. It does not depend on anything.

DISPLAY - This handles displaying a two dimensional array on the canvas. It does not depend on anything.

PRESETS - holds the preset states of the board as well as preset shapes that can be added to the board

CONTROLLER - This handles the game operations, starting and stopping the game, adding presets or shapes to the MODEL, telling the MODEL when to step, telling DISPLAY when to update the canvas, tells the MODEL when to switch a square on the board, tells the MODEL when to set the state as one of the preset states or where to add on of the preset shapes. This interface depends on MODEL and DISPLAY

events - This handles all of the click events for the UI. Tells CONTROLLER when a square has been clicked, tells CONTROLLER when to set the state to a certain preset, or when to add a shape and where. This file depends only on CONTROLLER.

I used functionals for retrieving neighbors by using a forEach loop over an array of [delta row, delta col]
I used a reduce to then count how many neighbors are alive.
I also used functionals with a function that takes the current state of a square as a parameter and returns a function that can be called with the number of living neighbors to retrieve the new state of the square.0

For interesting design I decided to add the adding shapes feature. This is a slight spinoff of the preset state functionality. The different here being that a user can chose a shape (one of the commone Game of Life shapes like sliders, blinkers, etc) and click anywhere on the board to drop that shape in. 
