## Snake Painter
[Snake Painter](https://snake-painter.vercel.app/)

An online paint application used to kill boredom and boost creativity, built with React, JavaScript, and CSS.

## Installation and Setup Instructions

Clone down this repository. You will need `node` and `npm` installed globally on your machine.  

Installation:

`npm install`  

To Start Server:

`npm start`  

To Visit App:

`localhost:5000/`

## Reflection

I wanted to build an online painting application that was better than the one I had built during my time at bootcamp. The previous iteration utilized a grid where each grid square had several eventhandlers that would control what got painted. This was fine at first, but as the grid squares grew smaller to add more pixels, performance issues started to arise as more than 60 events were being triggered in a second. To remedy the performance issues, I opted to use the canvas element which worked out far better as the canvas essentially only needs coordinates and a draw function to "paint".

One of the main challenges was to have a consistent performance throughout different clients, as depending on your hardware or internet speed the paint coordinates would not update "properly". To remedy this, I modified the draw function to draw a straightline between the current and previous mouse positions.

At the end of the day, the technologies implemented in this project are React, Typescript and CSS. I chose to use webpack instead of CRA as I wanted to have better control of what was being bundled.