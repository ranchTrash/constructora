var electron = require('electron')
var connection = electron.remote.require('./main').connection

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

$(document).ready(function () {
    getActividades()
})

// control horarios

var data = $("#data").html()
var flag = true

$("#fijo").on('click', function () {
  flag = true
  $("#data").empty()
  $("#data").append(data)
})

$("#personalizado").on('click', function () {
  flag = false
  agregarDias()
})

$("input[name ='dia']").on('click', function () {
  if (!flag) {
    agregarDias() 
  }
})

$("#btnTest").on('click', function () {
  getDatos()
})

// checar si es albanil para agregar actividades

$("#puesto").change(function () {
  var puesto = $(this).children("option:selected").text()

  if (puesto.localeCompare('Albanil') === 0) {
    $("#actividad").prop("disabled", false)
    $("#btnAgregar").prop("disabled", false)
  } else {
    $("#actividad").prop("disabled", true)
    $("#btnAgregar").prop("disabled", true)
  }
  
})

function agregarDias() {
  var dias = []
  $.each($("input[name='dia']:checked"), function () {
    dias.push($(this).val())
  })

  var html = ''

  for (let i = 0; i < dias.length; i++) {
    html += "<h5 class='mt-3'>" + dias[i] + "</h5>"
    html += data
  }

  $("#data").empty()
  $("#data").append(html)
}

$("#btnAgregar").on('click', function () {
  var actividad = $("#actividad option:selected").val()

  console.log("actividad: " + actividad);

  $query = "select * from actividad where cve_act=" + actividad

  connection.query($query, function (err, rows, fields) {
    if (err) {
      console.log("ERROR")
      return console.log(err.stack)
    }

    var html = ''

    rows.forEach(row => {
      html += "<tr>"
        html += "<th>"
          html += row.cve_act
        html += "</th>"
    
        html += "<td>"
          html += row.nom_act
        html += "</td>"
    
        html += "<td>"
          html += row.descrip_act
        html += "</td>"
      html += "</tr>"
    });  

    $("#tabla").append(html)
  })
})

///////

function getActividades() {
    $query = "select cve_act, nom_act from actividad"

    connection.query($query, function (err, rows, fields) {
        if (err) {
            console.log("ERROR")
            return console.log(err.stack)
        }

        var html = ''

        rows.forEach(row => {
            html += "<option value='" + row.cve_act + "'>"
                html += row.nom_act
            html += "</option>"
        });

        $("#actividad").append(html)
    })
}

async function getDatos() {
  var fi = $("#fi").val()
  var ff = $("#ff").val()
  var puesto = $("#puesto").val()
  var sueldo = $("#sueldo").val()
  var nss = $("#nss").val()

  var dia
  var he
  var hs
  var tipo

  // console.log(fi + ff + puesto + sueldo + nss);

  agregarContrato(fi, ff, puesto, sueldo, nss)
  console.log("esperando contrato...");
  await sleep(1000)
  agregarHorario()
  console.log("esperando horario...");
  await sleep(1000)
  
  // Temporal
  var dias = []
  $.each($("input[name='dia']:checked"), function () {
    dias.push($(this).val())
  })

  if (flag) {
    he = $("#hinicio").val()
    hs = $("#hfinal").val()
    tipo = $("#fijo").val()
    for (let i = 0; i < dias.length; i++) {
      agregarDiaHora(dias[i], he, hs, tipo)
    }
  } else {
    var he = []
    var hs = []
    tipo = $("#personalizado").val()

    $(".hi").each(function () {
      he.push($(this).val())
    })

    $(".hs").each(function () {
      hs.push($(this).val())
    })

    for (let i = 0; i < dias.length; i++) {
      agregarDiaHora(dias[i], he[i], hs[i], tipo)
    }
  }

  console.log("esperando diahora...");
  await sleep(5000)

  connection.commit(function(err) {
    if (err) { 
      connection.rollback(function() {
        throw err;
      });
    }
    console.log('Transaccion completa.');
  });
  
}

function agregarContrato(fi, ff, puesto, sueldo, nss) {
  $query = "call sp_agregaContrato(?, ?, ?, ?, ?)"

  var v = [fi, ff, puesto, sueldo, nss]

  connection.query($query, v, function (err, rows, fields) {
    if (err) { 
      connection.rollback(function() {
        throw err;
      });
    }
    console.log("contrato agregado con exito");
  })
}

function agregarHorario() {
  $query = "call sp_agregaHorario()"

  connection.query($query, function (err, rows, fields) {
    if (err) { 
      connection.rollback(function() {
        throw err;
      });
    }
    console.log("horario agregado con exito");
  })
}

function agregarDiaHora(dia, he, hs, tipo) {
  $query = "call sp_agregaDiaHora(?, ?, ?, ?)"

  var v = [dia, he, hs, tipo]

  connection.query($query, v, function (err, rows, fields) {
    if (err) { 
      connection.rollback(function() {
        throw err;
      });
    }

    console.log("diahora agregado con exito");
  })
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
            await sleep(2000)
          }
          form.classList.add('was-validated')
        }, false)
      })

    }, false)
}())