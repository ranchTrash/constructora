var electron = require('electron')
var connection = electron.remote.require('./main').connection

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

var c = 1
var cc = 1

$("#agregarC").on('click', function () {
    var descrip = String($("#descripC").val())
    var fecha = $("#fecha").val()

    if (descrip != "" & String(fecha) != "") {
        var html = ''

        html += "<tr class='text-justify'>"
            html += "<th scope='row'>" + c + "</th>"
            html += "<td>" + fecha + "</td>"
            html += "<td>" + descrip + "</td>"
        html += "</tr>"

        c++

        $("#bodyTablaC").append(html)
    }
})

$("#agregarP").on('click', function () {
    var descrip = String($("#descripP").val())
    var tipo = $("#tipo").val()
    var fecha = $("#fechaPercon").val()
    var costo = $("#costo").val()
    var fi = $("#fi").val()
    var ff = $("#ff").val()

    if (descrip != "" & String(fecha) != "" & tipo != "" & String(costo) != "" & String(fi) != "" & String(ff) != "") {
        var html = ''

        html += "<tr class='text-justify'>"
            html += "<th scope='row'>" + cc + "</th>"
            html += "<td>" + tipo + "</td>"
            html += "<td>" + descrip + "</td>"
            html += "<td>" + fecha + "</td>"
            html += "<td>" + costo + "</td>"
            html += "<td>" + fi + "</td>"
            html += "<td>" + ff + "</td>"
        html += "</tr>"

        cc++

        $("#bodyTablaP").append(html)
    }
})

$("#btnTest").on('click', function () {
    getDatos()
})

function getDatos() {
    $("#bodyTablaC > tr").each(function () {
        // console.log( $(this).find("td").eq(0).text() + " " + $(this).find("td").eq(1).text()  );
        var descrip = $(this).find("td").eq(1).text()
        var fecha = $(this).find("td").eq(0).text()

        agregarClausula(descrip, fecha)
        agregarClausulaContrato()
    })

    $("#bodyTablaP > tr").each(function () {
        // console.log( $(this).find("td").eq(0).text() + " " + $(this).find("td").eq(1).text()  );
        var tipo = $(this).find("td").eq(0).text()
        var descrip = $(this).find("td").eq(1).text()
        var fecha = $(this).find("td").eq(2).text()
        var costo = $(this).find("td").eq(3).text()
        var fi = $(this).find("td").eq(4).text()
        var ff = $(this).find("td").eq(5).text()

        agregarPermiso(tipo, descrip)
        agregarPermisoContrato(fecha, costo, fi, ff)
        
    })

    agregarStatusCon()
}

function agregarClausula(descrip, fecha) {
    $query = "call sp_agregaClausula(?, ?)"
  
    var v = [descrip, fecha]

    connection.query($query, v, function (err, rows, fields) {
        if (err) { 
            connection.rollback(function() {
                throw err;
            });
        }
        console.log("clausula agregada con exito");
    })
}

function agregarClausulaContrato() {
    $query = "call sp_agregaContratoCla()"
  
    // var v = [descrip, fecha]

    connection.query($query, function (err, rows, fields) {
        if (err) { 
            connection.rollback(function() {
                throw err;
            });
        }
        console.log("clausulacontrato agregada con exito");
    })
}

function agregarPermiso(tipo, descrip) {
    $query = "call sp_agregaPermiso(?, ?)"
  
    var v = [tipo, descrip]

    connection.query($query, v, function (err, rows, fields) {
        if (err) { 
            connection.rollback(function() {
                throw err;
            });
        }
        console.log("permiso agregado con exito");
    })
}

function agregarPermisoContrato(fecha, costo, fi, ff) {
    $query = "call sp_agregaPermisoContrato(?, ?, ?, ?)"
  
    var v = [fecha, costo, fi, ff]

    connection.query($query, v, function (err, rows, fields) {
        if (err) { 
            connection.rollback(function() {
                throw err;
            });
        }
        console.log("permisocontrato agregado con exito");
    })
}

function agregarStatusCon() {
    $query = "call sp_agregaStatusCon()"
  
    // var v = [fecha, costo, fi, ff]

    connection.query($query, function (err, rows, fields) {
        if (err) { 
            connection.rollback(function() {
                throw err;
            });
        }

        console.log("statuscon agregado con exito");

        connection.commit(function(err) {
            if (err) { 
              connection.rollback(function() {
                throw err;
              });
            }
            console.log('Transaccion completa.');
            // connection.end();
        });
    })
}