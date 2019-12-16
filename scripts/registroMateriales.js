var electron = require('electron')
var connection = electron.remote.require('./main').connection

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

var rowHtml = $("#renglones").html()
var f

$(document).ready(function () {
  var fecha = new Date()
  var dia = fecha.getDate()
  var mes = fecha.getMonth() + 1
  var anio = fecha.getFullYear()
  console.log("fecha = " + dia + " " + mes + " " + anio);

  var nFEcha = anio + "-" + mes + "-" + dia
  f = nFEcha
  
  $("#fecha").val(nFEcha)
})

$("#si").on('click', function () {
    $("#entrada input").prop('disabled', false);
    $("#agregar").prop('disabled', false);
    $("#fechacad").prop('disabled', false);
})

$("#no").on('click', function () {
    $("#entrada input").prop('disabled', true);
    $("#agregar").prop('disabled', true);
    $("#fechacad").prop('disabled', true);
})

$("#button").on('click', function () {
  getDatos()
})

$("#agregar").on('click', function () {
  $("#renglones").append(rowHtml)

  $('.input-group.date').datepicker({
    format: "yyyy-mm-dd",
    autoclose: true,
    // startDate: "0d",
    // todayBtn: true,
    language: "es",
    // todayHighlight: true
  });
})

// document.getElementById("").valueAsDate = new Date();

/////////////

async function getDatos() {
  var nombre = $("#nombre").val()
  var marca = $("#marca").val()
  var tipo = $("#tipo").val()
  var min = $("#min").val()
  var umedida = $("#umedida").val()
  var contenido = $("#contenido").val()

  agregarMaterial(nombre, marca, tipo, min, umedida, contenido)

  await sleep(100)

  var max = getMax()

  $("#renglones > div").each(function () {     
    var cantidad = $(this).find("input").eq(0).val()
    var fechacad = $(this).find("input").eq(1).val()
    var ppu = $(this).find("input").eq(2).val()
    
    console.log(cantidad + " " + fechacad + " " + ppu + " " + f);

    agregaResurtirMaterial(fechacad, cantidad, ppu, tipo)
  })

  connection.commit(function(err) {
    if (err) { 
      connection.rollback(function() {
        throw err;
      });
    }
    console.log('Transaction Complete.');
    // connection.end();
  });
}

function agregarMaterial(nombre, marca, tipo, min, umedida, contenido) {
  connection.beginTransaction(function (err) {
    if (err) {
      console.log("ERROR");
      return err.stack
    }

    $query = "call sp_agregaMaterial(?, ?, ?, ?, ?, ?)"

    var v = [nombre, marca, tipo, min, umedida, contenido]

    connection.query($query, v, function (err, rows, fields) {
        if (err) { 
          connection.rollback(function() {
            throw err;
          });
        }
        console.log("material registrado con exito");
    })

  })    
}

function agregaResurtirMaterial(fechacad, cantidad, ppu, tipo) {
  $query = "call sp_resurtirMaterial(?, ?, ?, ?)"

  var v = [fechacad, cantidad, ppu, tipo]

  connection.query($query, v, function (err, rows, fields) {
    if (err) { 
      connection.rollback(function() {
        throw err;
      });
    }

    console.log("resurtido registrado con exito");
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