# NodeClientServer

Example Node.js project that illustrates client server exchanges using AJAX with JSON data.

The project "requires" only 'http', 'path', and 'fs'. It uses jQuery, knockout, and w3.css.

The code is written in TypeScript.

The client index.html page has 3 edit boxes that hold numbers to be sent to a 'calculate' function on
the server. There is a 'result' box, and a 'Calculate' button.

When the calculate button is pressed, the 3 values are collected into a JSON object and sent to the
server via AJAX. The server adds the 3 values together and returns the sum, which is displayed on
the web page.
