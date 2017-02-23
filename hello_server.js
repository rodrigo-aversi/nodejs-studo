var http = require('http');
var fs = require('fs');
var url = require('url');


var diretorio = function(arquivo) {
	return __dirname + arquivo;
};

var rotear = function(pathname) {

	if (pathname == '/') {
		console.log("página default")
		return diretorio("/artigos.html");
	};

	var arquivo = diretorio(pathname);
	if (fs.existsSync(arquivo)) {
		return arquivo;
	};

	return diretorio("/erro.html");

};


var server = http.createServer(function(request, response){

	var pathname = url.parse(request.url).pathname;
	var pagina = rotear(pathname);

	console.log("pathname - " + pathname);
	console.log("pagina - " + pagina);


	fs.readFile(pagina, function(err, html){
		response.writeHeader(200, {'Content-Type': 'text/html'});
		response.write(html);
		response.end();
	});
});

server.listen(3000, function(){
	console.log('Executando Site Pessoal');
});