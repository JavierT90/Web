socket = io.connect("http://192.168.122.132:3000");
    socket.on("connect", function () {
    var list = document.getElementById('año');
    list.options.length=0;
    var contador=2015;
    while(contador<2100){
    var newOp = document.createElement("option");
    newOp.text = contador;
    newOp.value = contador;
    list.options.add(newOp);
    contador++;	
    }
    list = document.getElementById('mes');
    list.options.length=0;
    var contador=1;
    while(contador<13){
    var newOp = document.createElement("option");
    newOp.text = contador;
    newOp.value = contador;
    list.options.add(newOp);
    contador++;	
    }
    list = document.getElementById('dia');
    list.options.length=0;
    var contador=1;
    while(contador<32){
    var newOp = document.createElement("option");
    newOp.text = contador;
    newOp.value = contador;
    list.options.add(newOp);
    contador++;	
    }
    list = document.getElementById('hora1');
    list.options.length=0;
    var contador=1;
    while(contador<25){
    var newOp = document.createElement("option");
    newOp.text = contador;
    newOp.value = contador;
    list.options.add(newOp);
    contador++;	
    }
    list = document.getElementById('minutos1');
    list.options.length=0;
    var contador=1;
    while(contador<61){
    var newOp = document.createElement("option");
    newOp.text = contador;
    newOp.value = contador;
    list.options.add(newOp);
    contador++;	
    }
    list = document.getElementById('hora2');
    list.options.length=0;
    var contador=1;
    while(contador<25){
    var newOp = document.createElement("option");
    newOp.text = contador;
    newOp.value = contador;
    list.options.add(newOp);
    contador++;	
    }
    list = document.getElementById('minutos2');
    list.options.length=0;
    var contador=1;
    while(contador<61){
    var newOp = document.createElement("option");
    newOp.text = contador;
    newOp.value = contador;
    list.options.add(newOp);
    contador++;	
    }
    socket.emit('solicitar_llenar');
    });
    socket.on("Llenar", function (data) {
    var list = document.getElementById('Lista_eventos');
    list.options.length=0;
    data2=data.split(";");
    if(data2.length>0){
    var contador=0;
    while(contador<data2.length){
    d1=data2[contador].split(",");
    var newOp = document.createElement("option");
    newOp.text = d1[0];
    newOp.value = d1[1];
    list.options.add(newOp);
    contador++;}
    }
    });
    document.getElementById("Send").addEventListener("click", function () {
    var fecha_inicio=document.getElementById("año").value+"-"+document.getElementById("mes").value+"-"+document.getElementById("dia").value+" "+document.getElementById("hora1").value+":"+document.getElementById("minutos1").value+":00";
    var fecha_fin=document.getElementById("año").value+"-"+document.getElementById("mes").value+"-"+document.getElementById("dia").value+" "+document.getElementById("hora2").value+":"+document.getElementById("minutos2").value+":00";
    socket.emit('insertar_evento',{
    nombre:document.getElementById("nombre_evento").value,
    fi:fecha_inicio,
    ff:fecha_fin});
    });
    socket.on("resultado", function (respuesta) {
    document.getElementById("Messages").innerHTML ="";
    if(respuesta=="correcto"){
    document.getElementById("Messages").innerHTML = "Se ha creado el evento exitosamente" + "<br />";}
    else if(respuesta=="error1"){
    document.getElementById("Messages").innerHTML = "El nombre del evento no puede ser un número" + "<br />";
    }
    else if(respuesta=="error01_fecha"){
    document.getElementById("Messages").innerHTML = "La fecha que se ingreso no existe" + "<br />";
    }
    else if(respuesta=="error02_fecha"){
    document.getElementById("Messages").innerHTML = "El nombre del evento no puede ser un número" + "<br />";
    }
    else {
    document.getElementById("Messages").innerHTML = "Hubo un error con la base de datos, no se pudo crear el evento" + "<br />";
    }
    socket.emit('solicitar_llenar');
    });
    document.getElementById("terminar_evento").addEventListener("click", function () {
    var list = document.getElementById('Lista_eventos');
    socket.emit('terminar_evento',{
    id_evento_terminado:list.options[list.selectedIndex].value,
    nombre_usuario:'user1',
    contrasena:document.getElementById("Contrasena").value});
    });
    socket.on("resultado2", function (respuesta) {
    document.getElementById("Messages2").innerHTML ="";
    if(respuesta=="correcto"){
    document.getElementById("Messages2").innerHTML = "Se ha terminado el evento exitosamente" + "<br />";}
    else if(respuesta=="error_contrasena"){
    document.getElementById("Messages2").innerHTML = "La contrasena no es correcta" + "<br />";
    }
    else {
    document.getElementById("Messages2").innerHTML = "Hubo un error con la base de datos, no se pudo terminar el evento" + "<br />";
    }
    socket.emit('solicitar_llenar');
    });