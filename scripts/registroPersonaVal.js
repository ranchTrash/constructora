// Example starter JavaScript for disabling form submissions if there are invalid fields
(function () {
    'use strict'

    window.addEventListener('load', function () {  
      // Fetch all the forms we want to apply custom Bootstrap validation styles to
      var forms = document.getElementsByClassName('needs-validation')
  
      // Loop over them and prevent submission
      Array.prototype.filter.call(forms, function (form) {
        form.addEventListener('submit', function (event) {         
          if (form.checkValidity() === false) {
            event.preventDefault()
            event.stopPropagation()
          } else {
            // getDatos()
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

    console.log(nom + ap + am + genero + edocivil + mail + fnac + calle + num + orient + entrecalles + tel + col + curp);
    

    agregarPersona(nom, ap, am, genero, edocivil, mail, fnac, calle, num, orient, entrecalles, tel, col, curp)
    
  }

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
        console.log("ERROR");
        return err.stack
      }

      $query = "call sp_agregaPersona(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"

      var v = [ap, am, nom, genero, edocivil, mail, fnac, calle, num, orient, entrecalles, tel, col, curp]

      connection.query($query, v, function (err, rows, fields) {
          if (err) { return console.log(err.stack) }
          console.log(rows);
      })

    })    

  }

$("#btnTest").on('click', function () {
  getDatos()
  
})