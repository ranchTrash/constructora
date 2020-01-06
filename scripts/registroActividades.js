var electron = require('electron')
var connection = electron.remote.require('./main').connection

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

$("#btnTest").on('click', function () {
  getDatos()
})

async function getDatos() {
    var nombre = $("#nombre").val()
    var descrip = $("#descrip").val()
    var umedida = $("#umed").val()
    
    var fecha = $("#fecha").val()
    var precio = $("#precio").val()

    agregarActividad(descrip, nombre, umedida)
    await sleep(500)
    var max = getMax()
    agregarPrecio(fecha, precio)
}

function agregarActividad(descrip, nombre, umedida) {
  connection.beginTransaction(function (err) {
    if (err) {
      console.log("ERROR");
      return err.stack
    }

    $query = "call sp_agregaActividad(?, ?, ?)"

    var v = [descrip, nombre, umedida]

    connection.query($query, v, function (err, rows, fields) {
        if (err) { 
          connection.rollback(function() {
            throw err;
          });
        }
        console.log("actividad registrada con exito");
    })

  }) 
}

function agregarPrecio(fecha, precio) {
  $query = "call sp_agregaPrecio(?, ?)"

    var v = [fecha, precio]

    connection.query($query, v, function (err, rows, fields) {
        if (err) { 
          connection.rollback(function() {
            throw err;
          });
        }
        console.log("precio registrada con exito");

        connection.commit(function(err) {
          if (err) { 
            connection.rollback(function() {
              throw err;
            });
          }
          console.log('Transaction Complete.');
          // connection.end();
        });
    })
}

function getMax() {
  var max = 0
  return max
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
            getDatos()
            await sleep(100)
          }
          form.classList.add('was-validated')
        }, false)
      })
  
    }, false)
}())