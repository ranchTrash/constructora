var electron = require('electron')
var connection = electron.remote.require('./main').connection

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Example starter JavaScript for disabling form submissions if there are invalid fields
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

  function getDatos() {
    var nom = $("#nombre").val()
    var apellido = $("#apellido").val()
    // var amT = $("#").val()
    var genero = $("#genero").val()
    var edocivil = $("#edocivil").val()
    var mail = $("#email").val()
    var fnac = $("#fnac").val()
    var calle = $("#calle").val()
    var num = $("#numero").val()
    var orient = $("#orient").val()
    var entrecalles = $("#enCal").val()
    var tel = $("#tel").val()
    var col = $("#colonia").val()
    var curp = $("#curp").val()

    var ap = String(apellido).split(" ")[0]
    var am = String(apellido).split(" ")[1]

    console.log(nom + " " + ap + " " + am + " " + genero + " " + edocivil + mail + fnac + calle + num + orient + entrecalles + tel + col + curp); 

    agregarPersona(nom, ap, am, genero, edocivil, mail, fnac, calle, num, orient, entrecalles, tel, col, curp)
    
  }


  //arrglar orden de entrada de nombre
  function agregarPersona(ap, am, nom, genero, edocivil, mail, fnac, calle, num, orient, entrecalles, tel, col, curp) {
    // $query = "start transaction"

    // connection.query($query, function (err, rows, fields) {
    //     if (err) {
    //         console.log("ERROR")
    //         return console.log(err.stack)
    //     }
    // })

    // $query = "insert into persona values('" + ap + ", '" + am + "', '" + nom + "', '" + genero + "', '" + edocivil + "', '" + mail + "', '" + fnac + "', '" + calle + "', " + num + ", '" + orient + "', '" + entrecalles + "', " + tel + ", " + col + ", " + curp + ")"

    
    connection.beginTransaction(function (err) {
      if (err) { 
        connection.rollback(function() {
          throw err;
        });
      }

      $query = "call sp_agregaPersona(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"

      var v = [ap, am, nom, genero, edocivil, mail, fnac, calle, num, orient, entrecalles, tel, col, curp]

      connection.query($query, v, function (err, rows, fields) {
        if (err) { 
          connection.rollback(function() {
            throw err;
          });
        }
          console.log("persona agregada con exito");
      })

    })    

  }

$("#btnTest").on('click', function () {
  // getDatos()
})