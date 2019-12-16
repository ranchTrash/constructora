var electron = require('electron')
var connection = electron.remote.require('./main').connection

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
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
                transaccion($("#apellido").val())
                await sleep(100)
          }
          form.classList.add('was-validated')
        }, false)
      })

    }, false)
}())

$("#button").on('click', async function () {
    var apellido = $("#apellido").val()

    console.log(apellido);

    transaccion(apellido)
})

function transaccion(apellido) {
    // connection.beginTransaction(async function (err) {
    //     if (err) {
    //       console.log("ERROR");
    //       return err.stack
    //     }
  
    //     $query = "call agregaT(?)"
  
    //     // var v = [nombre]
  
    //     connection.query($query, nombre, function (err, rows, fields) {
    //         if (err) { 
    //             connection.rollback(function() {
    //               throw err;
    //             });
    //         }

    //         connection.commit(function(err) {
    //             if (err) { 
    //               connection.rollback(function() {
    //                 throw err;
    //               });
    //             }
    //             console.log('Transaccion completa.');
    //             // connection.end();
    //         });


    //     })
    // })   
    
    // console.log("esperando transaccion");
    
    // await sleep(3000)

    // console.log("esperando...");

    // await sleep(1000)

    // var folio = getMax()

    // connection.end(function(){
    //     // The connection has been closed
    //     console.log("conexion cerrada con exito");
    // });

    // await sleep(100)

    var folio = getMax()

    // console.log("esperando folio...");
    
    // await sleep(100)

    // console.log("folio = " + folio);
    

    $query = "call agregaTT(?)"

    var v = [apellido, folio]

    connection.query($query, apellido, function (err, rows, fields) {
      if (err) { 
        connection.rollback(function() {
          throw err;
        });
      }

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

  // await sleep(300)

  // connection.end(function(){
  //   // The connection has been closed
  //   console.log("conexion cerrada con exito");
  // });

}

function getMax() {
    // $query = "select max(cve_t) as max from test"

    var max = 0

    // connection.query($query, function (err, rows, fields) {
    //     if (err) { 
    //         return console.log(err.stack) 
    //     }
    //     console.log(rows);

    //     console.log(rows[0].max);

    //     max = rows[0].max
        
    // })

    return max
}