var electron = require('electron')
var connection = electron.remote.require('./main').connection
// var mysql = require("mysql");

var user = document.getElementById('usuario')
var password = document.getElementById('contrasenia')
var role = document.getElementById('rol')

var button = document.getElementById('btnTest')
var form = document.getElementById('registroUsuario')

// var connection = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "3_99SA.17*Pc#2"
// });
    
// connection.connect((err) => {
//     if (err) {
//         console.log("Error_, ver la consola para mas detalles.");
//         return console.log(err.stack);
//     } else {
//         console.log("Conectado, conexion registro");
//     }

//     console.log("_Conexion_ establecida satisfactoriamente.");

// });

button.addEventListener('click', () => {
    $query = "create user '" + user.value + "'@'%' identified with mysql_native_password by '" + password.value + "'"

    connection.query($query, function (err, rows, fields) {
        if (err) {
            console.log("ERROR")
            return console.log(err.stack)
        }

        $query = "grant '" + role.value + "' to '" + user.value + "'@'%'"
        
        connection.query($query, function (err, rows, fields) {
            if (err) {
                console.log("ERROR")
                return console.log(err.stack)
            }

            $query = "set default role '" + role.value + "' to '" + user.value + "'@'%'"
        
            connection.query($query, function (err, rows, fields) {
                if (err) {
                    console.log("ERROR")
                    return console.log(err.stack)
                }

                $query = "flush privileges"
        
                connection.query($query, function (err, rows, fields) {
                    if (err) {
                        console.log("ERROR")
                        return console.log(err.stack)
                    }
                    
                    console.log("USUARIO REGISTRADO CON EXITO")
                    alert("USUARIO REGISTRADO CON EXITO")
                    
                })
                
            })
            
        })

    })
})

// (async function () {
//     'use strict'

//     window.addEventListener('load', async function () {  
//       // Fetch all the forms we want to apply custom Bootstrap validation styles to
//       var forms = document.getElementsByClassName('needs-validation')
  
//       // Loop over them and prevent submission
//       Array.prototype.filter.call(forms, async function (form) {
//         form.addEventListener('submit', async function (event) {         
//           if (form.checkValidity() === false) {
//             event.preventDefault()
//             event.stopPropagation()
//           } else {

//           }
//           form.classList.add('was-validated')
//         }, false)
//       })

//     }, false)
//   }())