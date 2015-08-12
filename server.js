//variable que contiene al servidor
var app = require('http').createServer(index), io = require('socket.io').listen(app) , fs = require('fs');
app.listen(3000, function() {

});

var mysql = require('mysql');
var connection = mysql.createConnection({
   host: 'localhost',
   user: 'root',
   password: '123456',
   database: 'prueba',
   port: 3306
});
connection.connect(function(error){
   if(error){
      throw error;
   }else{
      //console.log('Conexion correcta.');
   }
});
//función que llamara a la página principal que el cliente podrá visualizar
function index(req, res){
fs.readFile(__dirname + '/pagina.html', function(err, data){
res.end(data);
});
};
io.on('connection', function(socket){

 socket.on('message', function (mensaje) {
if(isNaN(mensaje)){
var query = connection.query('INSERT INTO p1(nombre) VALUES(?)', [mensaje], function(error, result){
   if(error){
	socket.emit('resultado','error');
      throw error;
   }else{
socket.emit('resultado','correcto');
      //console.log(result);
   }
 }
);}
else{
socket.emit('resultado','error1');
   }
    }); 
});
