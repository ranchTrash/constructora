var electron = require('electron')
var connection = electron.remote.require('./main').connection

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

$(document).ready(function () {
    setClientes()
    setCiudades()
})

$("#verificar").on('click', function () {
    var fecha = String($("#fecha").val())
    if (fecha != "") {
        var hi = $("#hi").val()
        var hf = $("#hf").val()

        var dias = ['domingo', 'lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado']
        var f = fecha.split("-")
        var d = new Date(f[0], f[1]-1, f[2])
        var dia = dias[d.getDay()]

        console.log("dia = " + dia + " - fecha = " + fecha +  " - hi = " + hi);  
   
        verificar(dia, fecha, hi)
    } else {
        alert("Elija una fecha.")
    }
})

$("#btnTest").on('click', function () {
    getDatos()
})

$('#ciudad').change(function () {
    var opcion = $('#ciudad option:selected').text()
    if (opcion.localeCompare('Elige...') != 0) {
        setCodPos(opcion)
    } else {
        var html = ''

        html += "<option value=''>"
            html += "Elige..."
        html += '</option>'

        $('#codpos').empty()
        $('#codpos').append(html)
    }
})

$('#codpos').change(function () {
    var opcion = $('#codpos option:selected').text()
    if (opcion.localeCompare('Elige...') != 0) {
        setColonias(opcion)
    } else {
        var html = ''

        html += "<option value=''>"
            html += "Elige..."
        html += '</option>'

        $('#colonia').empty()
        $('#colonia').append(html)
    }
})

function verificar(dia, fecha, hi) {
    $query = "call sp_verificaArq(?, ?, ?)"

    var v = [dia, fecha, hi]

    connection.query($query, v, function (err, rows, fields) {
        if (err) {
            console.log("ERROR")
            return console.log(err.stack)
        }

        if (rows.length > 0) {
            var html = ''

            html += "<label for'arq'>Arquitectos disponibles</label>"   
            html += "<select class='custom-select d-block w-100' id='arq' required>"             

            rows[0].forEach(row => {
                html += "<option value='" + row.cve_contra + "'>" + row.nombre  + "</option>"
            });

            html += "</select>" 

            $("#renglonArquitecto").empty()
            $("#renglonArquitecto").append(html)

        } else {
            console.log("ninguna salida");
        }
    })
}

function getDatos() {
    var fecha = String($("#fecha").val())
    var hi = $("#hi").val()
    var hf = $("#hf").val()
    var calle = $("#calle").val()
    var num = $("#numero").val()
    var orient = $("#orient").val()
    var col = $("#colonia").val()
    var cliente = $("#cliente").val()
    var arquitecto = $("#arq").val()

    agregarCita(fecha, hi, hf, cliente, arquitecto, calle, num, orient, col)
    agregarEstadoCita()
}

function agregarCita(fecha, hi, hf, cliente, arquitecto, calle, num, orient, col) {
    connection.beginTransaction(function (err) {
        if (err) { 
          connection.rollback(function() {
            throw err;
          });
        }
  
        $query = "call sp_agregaCita(?, ?, ?, ?, ?, ?, ?, ?, ?)"
  
        var v = [fecha, hi, hf, calle, num, orient, col, cliente, arquitecto]
  
        connection.query($query, v, function (err, rows, fields) {
          if (err) { 
            connection.rollback(function() {
              throw err;
            });
          }
            console.log("cita agregada con exito");
        })
  
    })   
}

function agregarEstadoCita() {
    $query = "call sp_agregaEstadoCita()"
  
    // var v = [fecha, hi, hf, calle, num, orient, col, cliente, arquitecto]

    connection.query($query, function (err, rows, fields) {
        if (err) { 
            connection.rollback(function() {
                throw err;
            });
        }
        console.log("estadocita agregada con exito");


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
            // getDatos()
            // await sleep(2000)
          }
          form.classList.add('was-validated')
        }, false)
      })

    }, false)
}())

function setClientes() {
    $query = "select cve_cli, concat(nom_per, ' ', ap_per, ' ', am_per) as nombre from persona p join cliente c on p.cve_per=c.cve_per order by nombre asc"

    connection.query($query, function (err, rows, fields) {
        if (err) {
            console.log("ERROR")
            return console.log(err.stack)
        }

        var html = ''

        rows.forEach(row => {
            html += "<option value='" + row.cve_cli + "'>"
                html += row.nombre
            html += '</option>'
        });

        $('#cliente').append(html)

    })
}

function setCiudades() {
    $query = "select nom_ciu from ciudad order by nom_ciu"

    connection.query($query, function (err, rows, fields) {
        if (err) {
            console.log("ERROR")
            return console.log(err.stack)
        }

        var html = ''

        rows.forEach(row => {
            html += '<option>'
                html += row.nom_ciu
            html += '</option>'
        });

        $('#ciudad').append(html)

    })
}

function setCodPos(nombreCiudad) {
    $query = "select codpos_cod from codigo cp join ciudad c on cp.cve_ciu=c.cve_ciu where nom_ciu='" + nombreCiudad + "'"

    connection.query($query, function (err, rows, fields) {
        if (err) {
            console.log("ERROR")
            return console.log(err.stack)
        }

        var html = ''

        html += "<option value=''>"
            html += "Elige..."
        html += '</option>'

        rows.forEach(row => {
            html += '<option>'
                html += row.codpos_cod
            html += '</option>'
        });

        $('#codpos').empty()
        $('#codpos').append(html)

    })
}

function setColonias(codpos) {
    $query = "select cve_col, nom_col from colonia c join codigo cp on c.cp_cod=cp.cp_cod where cp.codpos_cod=" + codpos

    connection.query($query, function (err, rows, fields) {
        if (err) {
            console.log("ERROR")
            return console.log(err.stack)
        }

        var html = ''

        html += "<option value=''>"
            html += "Elige..."
        html += '</option>'

        rows.forEach(row => {
            html += "<option value=" + row.cve_col + ">"
                html += row.nom_col
            html += '</option>'
        });

        $('#colonia').empty()
        $('#colonia').append(html)

    })
}

function getMax() {
    var max = 0
    return max
}