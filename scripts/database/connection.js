// var mysql = require("mysql");

// var connection = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "s19a12a1999",
//   database: "constructora"
// });

// connection.connect((err) => {
//   if (err) {
//     console.log("Error, ver la consola para más detalles.");
//     return console.log(err.stack);
//   } else {
//     console.log("Conectado");
//   }

//   console.log("Conexión establecida satisfactoriamente.");
// });


/////////////////////////////////////////////////////////////////

// document.getElementById('btnConectar').addEventListener("click", () => {
//   var mysql = require("mysql");

//   var connection = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "s19a12a1999",
//     database: "constructora"
//   });

//   connection.connect((err) => {
//     if (err) {
//       console.log("Error, ver la consola para más detalles.");
//       return console.log(err.stack);
//     } else {
//       console.log("Conectado");
//     }

//     console.log("Conexión establecida satisfactoriamente.");
//   });

//   connection.end(() => {
//     console.log("Conexión cerrada satisfactoriamente.");
//   });
// }, false);




/////////////////////////////////////////////////////////////////

// function generarListaObras() {
//   $query = "select * from contrato"

//   connection.query($query, function (err, rows, fields) {
//     if (err) {
//       console.log("ERROR")
//       return console.log(err.stack)
//     }

//     var html = ''

//     rows.forEach(row => {
//       html += "<li class='item-lista'>"
//         html += "<button class='boton-lista'>"
//           html += "<div class='icono'>"
//             html += '<span data-feather="file"></span>'
//           html += "</div>"

//           html += "<div class='nombre-obra'>"
//             html += "<p>"
//               html += "Obra "
//               html += row.cve_con
//             html += "</p>"
//             html += "<p class='fecha'>"
//               html += "23 Nov 2019"
//             html += "</p>"
//           html += "</div>"
//         html += "</button>"
//       html += "</li>"
//     })

//     var lista = document.getElementById('lista')

//     lista.innerHTML = html

//     feather.replace()

//   })
// }

