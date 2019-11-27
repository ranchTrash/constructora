generarListaObras()

// SQL SCRIPTS

function generarListaObras() {
  $query = "select * from contrato"

  connection.query($query, function (err, rows, fields) {
    if (err) {
      console.log("ERROR")
      return console.log(err.stack)
    }

    var html = ''

    rows.forEach(row => {
        html += "<li class='item-lista'>"
            html += "<button class='boton-lista'>"
                html += "<div class='icono'>"
                    html += '<span data-feather="file"></span>'
                html += "</div>"

                html += "<div class='nombre-obra'>"
                    html += "<p>"
                        html += "Obra "
                        html += row.cve_con
                    html += "</p>"
                    html += "<p class='fecha'>"
                        // console.log(row.fechai_con);
                        html += formatearFecha(String(row.fechai_con))      
                    html += "</p>"
                html += "</div>"
            html += "</button>"
        html += "</li>"
    })

    $(".lista").append(html)

    feather.replace()

  })
}

// SCRIPTS

function formatearFecha(fecha) {
    var partesFecha = fecha.split(" ")
    var jsFecha = partesFecha[2] + " " + partesFecha[1] + " " + partesFecha[3]
    return jsFecha 
}

function seleccionaObra(claveObra) {
    $query = "select * from contrato where cve_con=" + claveObra

    connection.query($query, function (err, rows, fields) {
        if (err) {
            console.log("ERROR")
            return console.log(err.stack)
        }

        var html = ''

        html += "<h2>"
            html += "Obra " + rows[0].cve_con
        html += "</h2>"

        $('.dashboard').empty()
        $('.dashboard').append(html)
    })
}

$(document).on("click", '.boton-lista', function () {
    $(".boton-lista-activo").removeClass("boton-lista-activo")
    $(this).addClass("boton-lista-activo")

    var claveObra = $(this).find('.nombre-obra').find('p').first().text().split(" ")[1]

    seleccionaObra(parseInt(claveObra))
})

$('.form-control').on('keyup', function () {
    var busqueda = $('.form-control').val()
    console.log(busqueda);
    
    getFiltro(busqueda)
})

function getFiltro(claveObra) {
    $query = "select * from contrato where cve_con like '%" + claveObra + "%'"

    connection.query($query, function (err, rows, fields) {
        if (err) {
            console.log("ERROR")
            return console.log(err.stack)
        }

        var html = ''

        rows.forEach(row => {
            html += "<li class='item-lista'>"
                html += "<button class='boton-lista'>"
                    html += "<div class='icono'>"
                        html += '<span data-feather="file"></span>'
                    html += "</div>"

                    html += "<div class='nombre-obra'>"
                        html += "<p>"
                            html += "Obra "
                            html += row.cve_con
                        html += "</p>"
                        html += "<p class='fecha'>"
                            html += formatearFecha(String(row.fechai_con))      
                        html += "</p>"
                    html += "</div>"
                html += "</button>"
            html += "</li>"
        });

        $('.lista').empty()
        $(".lista").append(html)

        feather.replace()
    })
}