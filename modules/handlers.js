var fs = require('fs');
var formidable = require('formidable');


function sendData(response, head, status, write, type) {
	response.writeHead(status, head);
	response.write(write, type);
	response.end();	
}

exports.upload = function(request, response) {
	console.log("Rozpoczynam obsługę żądania welcome.");
	var form = new formidable.IncomingForm();
	
	form.parse(request, function(error, fields, files) {
		sendData(response, {"Content-Type": "text/html; charset=utf-8"}, 200, "received image:<br/> <img src='/show' />", "utf-8");
	});
	
};

exports.welcome = function(request, response) {
	console.log("Rozpoczynam obsługę żądania welcome.");
	fs.readFile('templates/start.html', function(err, html) {
		sendData(response, {"Content-Type": "text/html; charset=utf-8"}, 200, html, "utf-8");
	});
	
};

exports.error = function(requst, response) {
	sendData(response, {"Content-Type": "text/html; charset=utf-8"}, 404, "404", "utf-8");
};

exports.show = function(request, response) {
	fs.readFile("test.png", "binary", function(error, file) {
		sendData(response, {"Content-Type": "image/png"}, 200, file, "binary" );
	});
};



