var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    
    var url = require('url');
    var url_parts = url.parse(req.url, true);
    var query = url_parts.query;
    
    var mysql = require('mysql');
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'admin',
        database: 'pruebas',
        port: 3306
    });
    
    connection.connect(function(error){
        if(error){
            throw error;
        }else{
            //console.log('Conexion correcta.');
        }
    });
    
    switch(query['op']){
        case 'asistir':
            console.log('asistir');
            var cadena = 'INSERT INTO ASISTENCIA VALUES('+query['evento']+',\''+query['carnet']+'\');';
            connection.query(cadena, function(err,result){
                if(err){
                    console.log('error!');
                }else{
                    console.log('finalizado');
                }
            });
            br
        default:
            console.log('Opcion no valida');
    }
    
    res.render('android', { response: 'Probando' });
});

module.exports = router;