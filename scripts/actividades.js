var electron = require('electron')
var connection = electron.remote.require('./main').connection

$(document).ready(function () {
    getListaActividades()
})

function getListaActividades() {
    $query = "select * from actividad"

    connection.query($query, function (err, rows, fields) {
        if (err) {
        console.log("ERROR")
        return console.log(err.stack)
        }

        var html = ''

        rows.forEach(row => {
            html += "<li class='item-lista'>"
                html += "<button class='boton-lista'>"
                    // html += "<div class='icono'>"
                    //     html += '<span data-feather="user"></span>'
                    // html += "</div>"

                    html += "<div class='nombre-obra'>"
                        html += "<p>"
                            // html += row.nombre
                            html += row.nom_act + " " + row.cve_act
                        html += "</p>"
                        html += "<p class='fecha'>"
                            // html += row.apellido  
                            html += row.umedida_act
                        html += "</p>"
                    html += "</div>"
                html += "</button>"
            html += "</li>"
        })

        $('.lista').empty()
        $(".lista").append(html)

        feather.replace()
  })
}