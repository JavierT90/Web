//variable que contiene al servidor
var app = require('http').createServer(index), io = require('socket.io').listen(app) , fs = require('fs'), modulos=require('./Modulos.js');
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

socket.on('solicitar_llenar', function () {
var query = connection.query('SELECT id_evento,nombre FROM EVENTO where estado=1', function(error, result){
      if(error){
         throw error;
      }else{
         var resultado = result;
         if(resultado.length > 0){
	var contador=0;
	var cadena_resultado=resultado[0].nombre+","+resultado[0].id_evento;
	contador++;
	while(resultado.length>contador){
	var aux=resultado[contador].nombre+","+resultado[contador].id_evento;
	cadena_resultado=cadena_resultado+";"+aux;
	contador++;	
	}
	socket.emit('Llenar',cadena_resultado);
         }else{
		socket.emit('Llenar','');
         }
      }
   }
);
});

 socket.on('insertar_evento', function (mensaje) {
if(isNaN(mensaje.nombre)){
var error_fecha=0;
var f01=mensaje.fi.split("-");
var mes1=parseInt(f01[1]);
var dia1=parseInt(f01[2]);
if(mes1==2&&dia1>29){
error_fecha=1;
}
if((mes1==4||mes1==6||mes1==9||mes1==11)&&dia1>30){
error_fecha=1;
}
if(error_fecha==0){
var query = connection.query('INSERT INTO EVENTO(nombre,estado,inicio,final) VALUES(?,?,?,?)', [mensaje.nombre,1,mensaje.fi,mensaje.ff], function(error, result){
   if(error){
	socket.emit('resultado','error');
      throw error;
   }else{
socket.emit('resultado','correcto');
      //console.log(result);
   }
 }
);
}
else{
socket.emit('resultado','error01_fecha');
}}
else{
socket.emit('resultado','error1');
   }
    }); 

 socket.on('terminar_evento', function (evento_terminar) {
//console.log(id_evento);
var comprobacion=modulos.comprobar1(evento_terminar.nombre_usuario,evento_terminar.contrasena,'123');
if(comprobacion==1){
var query = connection.query('UPDATE EVENTO SET estado=0 WHERE id_evento=? AND estado=1', [evento_terminar.id_evento_terminado], function(error, result){
   if(error){
	socket.emit('resultado2','error');
      throw error;
   }else{
socket.emit('resultado2','correcto');
      //console.log(result);
   }
 }
);
    }
else {
socket.emit('resultado2','error_contrasena');
}}); 

});





