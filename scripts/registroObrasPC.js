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

    if (descrip != "" & String(fecha) != "") {
        var html = ''

        html += "<tr class='text-justify'>"
            html += "<th scope='row'>" + cc + "</th>"
            html += "<td>" + tipo + "</td>"
            html += "<td>" + descrip + "</td>"
        html += "</tr>"

        cc++

        $("#bodyTablaP").append(html)
    }
})

$("#btnTest").on('click', function () {
    getDatos()
})

function getDatos() {
    var datos = ''
    $("#bodyTablaC > tr").each(function () {
        datos += $(this).find("td").eq(0).text()
    })

    console.log(datos);
    
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