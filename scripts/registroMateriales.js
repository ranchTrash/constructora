var rowHtml = $("#datosResurtido").html()

$("#si").on('click', function () {
    $("#entrada input").prop('disabled', false);
    $("#agregar").prop('disabled', false);
})

$("#no").on('click', function () {
    $("#entrada input").prop('disabled', true);
    $("#agregar").prop('disabled', true);
})

$("#button").on('click', function () {
  getDatos()
})

$("#agregar").on('click', function () {
  $("#datosResurtido").append(rowHtml)
})

document.getElementById("fecha").valueAsDate = new Date();

/////////////

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
            console.log("o aqui");
            
          } else {
            console.log("entra aqui");
            
            // getDatos()
          }
          form.classList.add('was-validated')
        }, false)
      })

    }, false)
}())

function getDatos() {
  var nombre = $("#nombre").val()
  var marca = $("#marca").val()
  var tipo = $("#tipo").val()
  var min = $("#min").val()
  var umedida = $("#umedida").val()
  var contenido = $("#contenido").val()

  agregarMaterial(nombre, marca, tipo, min, umedida, contenido)
}

function agregarMaterial(nombre, marca, tipo, min, umedida, contenido) {
  var v = [nombre, marca, tipo, min, umedida, contenido]

  connection.beginTransaction(function (err) {
    if (err) {
      console.log("ERROR");
      return err.stack
    }

    $query = "call sp_agregaMaterial(?, ?, ?, ?, ?, ?)"

    connection.query($query, v, function (err, rows, fields) {
        if (err) { 

          connection.rollback(function() {
            throw err;
          });

          return console.log(err.stack) 
        }
        console.log(rows);

        // var fechacad = $("#fechacad").val()
        var fechacad = '2019-01-01'
        var cantidad = $("#cantidad").val()
        var ppu = $("#ppu").val()
        var tipo = $("#tipo").val()
        var claveMat = ''

        $query1 = "select cve_mat from material group by cve_mat having max(cve_mat) = (select max(cve_mat) from material as maximo)"

        connection.query($query1, function (err, rows, fields) {
          if (err) { 

            connection.rollback(function() {
              throw err;
            });

            return console.log(err.stack) 
          }
          console.log(rows);

          // console.log("claveMAt from query = " + rows);
          

          rows.forEach(row => {
            console.log("claveMat from query = " + row.cve_mat);
            console.log("tipo = " + typeof row.cve_mat);
            
            claveMat += row.cve_mat
          });
  
        })

        console.log("claveMat = " + claveMat);
        

        $query = "call sp_resurtirMaterial(?, ?, ?, ?, ?)"
        var b = [fechacad, cantidad, ppu, tipo, claveMat]

        connection.query($query, b, function (err, rows, fields) {
          if (err) { 

            connection.rollback(function() {
              throw err;
            });

            return console.log(err.stack) 
          }
          console.log(rows);


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

    })

  })    
}