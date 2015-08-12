var should = require('should');
var io = require('socket.io-client');

var socketURL = 'http://0.0.0.0:3000';

var options ={
  transports: ['websocket'],
  'force new connection': true
};



describe("Main Server",function(){
it('Deberia dar un resultado correcto', function(done){
  var client1 = io.connect(socketURL, options);

  client1.on('connect', function(data){
    client1.emit('message', 'evento_prueba');

  });

  client1.on('resultado', function(respuesta){
      respuesta.should.equal("correcto");
      client1.disconnect();
      done();
    
  });
});

it('Deberia dar un resultado incorrecto', function(done){
  var client1 = io.connect(socketURL, options);

  client1.on('connect', function(data){
    client1.emit('message', '14');

  });

  client1.on('resultado', function(respuesta){
      respuesta.should.equal("error1");
      client1.disconnect();
      done();
    
  });
});

});

