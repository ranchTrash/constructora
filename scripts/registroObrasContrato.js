var electron = require('electron')
var connection = electron.remote.require('./main').connection

$("#btnTest").on('click', function () {
    getDatos()
})

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function getDatos() {
    var fecha = $("#fecha").val()
    var tipo = $("#tipoAnt").val()
    var monto = $("#monto").val()

    var tipoObra = $("#tipoObra").val()
    var fechai = $("#fechai").val()
    var fechaf = $("#fechaf").val()
    var costoini = $("#costoini").val()
    var honorariosarq = $("#honorariosarq").val()
    var metroscuadra = $("#metroscuadra").val()

    agregarContrato(fechai, fechaf, tipoObra, honorariosarq, metroscuadra, costoini)
    agregarAnticipo(fecha, tipo, monto)
}

(async function () {
    'use strict'

    window.addEventListener('load', async function () {  
      // Fetch all the forms we want to apply custom Bootstrap validation styles to
      var forms = document.getElementsByClassName('needs-validation')
  
      // Loop over them and prevent submission
      Array.prototype.filter.call(forms, async function (form) {
        form.addEventListener('submit', async function (event) {         
          if (form.checkValidity() === false) {
            event.preventDefault()
            event.stopPropagation()
          } else {
            // getDatos()
            // await sleep(2000)
          }
          form.classList.add('was-validated')
        }, false)
      })

    }, false)
}())

function agregarContrato(fechai, fechaf, tipo, honorariosarq, metroscuadra, costoini) {
    $query = "call sp_agregaContrato(?, ?, ?, ?, ?, ?)"
  
    var v = [fechai, fechaf, tipo, honorariosarq, metroscuadra, costoini]

    connection.query($query, v, function (err, rows, fields) {
        if (err) { 
        connection.rollback(function() {
            throw err;
        });
        }
        console.log("contrato agregado con exito");
    })
}

function agregarAnticipo(fecha, tipo, monto) {
    $query = "call sp_agregaAnticipo(?, ?, ?)"
  
    var v = [fecha, tipo, monto]

    connection.query($query, v, function (err, rows, fields) {
        if (err) { 
        connection.rollback(function() {
            throw err;
        });
        }
        console.log("anticipo agregado con exito");
    })
}