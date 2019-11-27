/* 
$query = "select * from contrato"

connection.query($query, function (err, rows, fields) {
    if (err) {
        console.log("ERROR")
        return console.log(err.stack)
    }
})

*/

var filtroSeleccionado = ''

$(document).ready(function () {
    getListaEmpleados()
    filtroSeleccionado = 'empleados'
})


$('.dropdown-item').on('click', function () {
    var opcion = $(this).text()

    if (opcion.localeCompare('Empleados') === 0) {
        getListaEmpleados()
        filtroSeleccionado = 'empleados'
    } else if (opcion.localeCompare('Personas') === 0) {
        getListaPersonas()
        filtroSeleccionado = 'personas'
    }
})

$('.form-control').on('keyup', function () {
    var busqueda = $('.form-control').val()

    if (filtroSeleccionado.localeCompare('empleados') === 0) {
        getFiltroEmpleado(busqueda)
    } else {
        getFiltroPersona(busqueda)
    }

})

function getListaEmpleados() {

    $query = "select concat(nom_per, ' ') as nombre, concat(ap_per, ' ', am_per) as apellido from persona p join contratotra ct on p.cve_per=ct.cve_per"

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
                        html += '<span data-feather="user"></span>'
                    html += "</div>"

                    html += "<div class='nombre-obra'>"
                        html += "<p>"
                            html += row.nombre
                        html += "</p>"
                        html += "<p class='fecha'>"
                            html += row.apellido  
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

function getListaPersonas() {

    $query = "select concat(nom_per, ' ') as nombre, concat(ap_per, ' ', am_per) as apellido from persona"

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
                        html += '<span data-feather="user"></span>'
                    html += "</div>"

                    html += "<div class='nombre-obra'>"
                        html += "<p>"
                            html += row.nombre
                        html += "</p>"
                        html += "<p class='fecha'>"
                            html += row.apellido  
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

function getFiltroEmpleado(empleado) {
    $query = "select nom_per, ap_per, am_per from persona p join contratotra ct on p.cve_per=ct.cve_per where nom_per like '%" + empleado + "%' or ap_per like '%" + empleado + "%' or am_per like '%" + empleado + "%'" 

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
                        html += '<span data-feather="user"></span>'
                    html += "</div>"

                    html += "<div class='nombre-obra'>"
                        html += "<p>"
                            html += row.nom_per
                        html += "</p>"
                        html += "<p class='fecha'>"
                            html += row.ap_per + " " + row.am_per 
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

function getFiltroPersona(persona) {
    $query = "select nom_per, ap_per, am_per from persona where nom_per like '%" + persona + "%' or ap_per like '%" + persona + "%' or am_per like '%" + persona + "%'" 

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
                        html += '<span data-feather="user"></span>'
                    html += "</div>"

                    html += "<div class='nombre-obra'>"
                        html += "<p>"
                            html += row.nom_per
                        html += "</p>"
                        html += "<p class='fecha'>"
                            html += row.ap_per + " " + row.am_per 
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