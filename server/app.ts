/// <reference path="../types/jquery.d.ts" />
/// <reference path="../types/node.d.ts" />

import {IncomingMessage} from "http";
import {ServerResponse} from "http";
var http = require('http');
var path = require('path');
var fs = require('fs');

// HTTP server port.
var httpPort: number = 8080;

// This must handle GET's of client, images, etc.
// Right now, it only serves up client, js, and css.
function handleGet(req: IncomingMessage , res: ServerResponse)
{
	var response: string;
	var baseName: string = path.basename(req.url);
	var resultCode: number = 200;
	var content: string = 'text/html';

	// Check for just '/'.
	if (baseName == '/')
		baseName = 'index.html';

	// Restrict path.
	switch (path.extname(baseName))
	{
		case '.html':
		case '.js':
		case '.css':
		case '.ts':
		case '.map':
			if (fs.existsSync('client/' + baseName))
			{
				response = fs.readFileSync('client/' + baseName , 'UTF-8');
				if (path.extname(baseName) === '.css')
				{
					// Important!!!
					content = 'text/css';
				}
			}
			else
			{
				resultCode = 404;
				response = 'File not found';
			}
			break;
		case '.png':
			// Not handled yet...
		default:
			resultCode = 404;
			response = 'File not found';
			break;
	}
	res.writeHead(resultCode , {'Content-Type': content});
	res.write(response);
	res.end();
}

// The nut of this app; the calculate function...
function calculate(arg: object[]): string
{
	var n1: number = Number(arg[0]);
	var n2: number = Number(arg[1]);
	var n3: number = Number(arg[2]);
	var result: number;

	// Addem up.
	result = n1 + n2 + n3;
	// Return with JSON string.
	return JSON.stringify({'result' : result});
}

/*
 * Handle JSON POST data and return with stringified JSON response.
 * For now, the POST will accept an object in the form:
 *
 * Request:
 * {
 * 		'fcn' : 'function name',
 * 		'arg' :
 * 		[
 * 			'value1',
 * 			'value2',
 * 	  		   o
 * 			   o
 *		]
 * }
 *
 * Response:
 * {'result' : number}
 * 			or
 * {'error' : 'reason'}
 */
function handlePost(body: string): string
{
	var response: string = '';
	var obj: object = JSON.parse(body);

	// Error if no 'req' property.
	if (obj['fcn'] === 'undefined')
	{
		return JSON.stringify({'error' : 'Request method missing'});
	}
	// Which function.
	switch (obj['fcn'])
	{
		// Calculate() requres 3 arguments.
		case 'calculate':
			// Error if no arguments.
			if ((obj['arg'] === 'undefined') || (obj['arg'].length !== 3))
			{
				response = JSON.stringify({'error' : 'Arguments missing'});
				break;
			}
			// Return with response from method.
			response = calculate(obj['arg']);
			break;
		default:
			response = JSON.stringify({'error' : 'Unknown function'});
			break;
	}
	return response;
}

/*
 * Main; create http server and route GET and POST requests.
 */
http.createServer(function (req: IncomingMessage , res: ServerResponse)
{
	var request: object;
	var response: string;
	var body: string = '';

	// When a chunk of data arrives.
	req.on('data' , function(chunk)
	{
		// Append it.
		body += chunk;
	});

	// When finished with data.
	req.on('end' , function()
	{
		// Show what just arrived if POST.
		if (req.method === 'POST')
		{
			console.log(body);
		}
		// Which method?
		switch (req.method)
		{
			case 'GET':
				// Verify url and respond with appropriate data.
				handleGet(req , res);
				// Response has already been sent.
				response = '';
				break;
			case 'POST':
				// Verify JSON request and respond with stringified JSON response.
				response = handlePost(body);
				break;
			default:
				response = JSON.stringify({'error' : 'Not GET or POST'});
				break;
		}
		// Send the response if not empty.
		if (response.length !== 0)
		{
			res.write(response);
			res.end();
		}
		// Paranoid clear of the 'body'. Seems to work without
		// this, but I don't trust it...
		body = '';
	});

	// If error.
	req.on('error' , function(err: Error)
	{
		res.write(JSON.stringify({'error' : err.message}));
		res.end();
	});
	//
}).listen(httpPort);
