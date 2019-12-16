var electron = require('electron')
var connection = electron.remote.require('./main').connection

var filtroSeleccionado = ''

$(document).ready(function () {
    getListaMaterialesExistencia()
    filtroSeleccionado = 'existencia'
})

$("#matexistencia").on('click', function () {
    getListaMaterialesExistencia()
    filtroSeleccionado = 'existencia'
})

$("#matagotados").on('click', function () {
    getListaMaterialesAgotados()
    filtroSeleccionado = 'agotados'
})

$('.form-control').on('keyup', function () {
    var busqueda = $('.form-control').val()

    if (filtroSeleccionado.localeCompare('existencia') === 0) {
        getFiltroExistencia(busqueda)
    } else {
        getFiltroAgotado(busqueda)
    }
})

$(document).on("click", '.boton-lista', function () {
    $(".boton-lista-activo").removeClass("boton-lista-activo")
    $(this).addClass("boton-lista-activo")

    var cveMat = $(this).find('.nombre-obra').find('p').first().text().split(" ")[1]
    console.log(cveMat);

    seleccionarMaterial(cveMat)

    // if (filtroSeleccionado.localeCompare('empleados') === 0) {
    //     seleccionaEmpleado(curpEmp)
    // } else {
    //     seleccionaPersona(curpEmp)
    // }
})

function getListaMaterialesExistencia() {
    $query = "select r.cve_mat, nom_mat, sum(cant_res)-sum(baja_res) as existencia from material m join resurtir r on m.cve_mat=r.cve_mat group by r.cve_mat having existencia>0"

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
                        html += '<span data-feather="shopping-cart"></span>'
                    html += "</div>"

                    html += "<div class='nombre-obra'>"
                        html += "<p>"
                            // html += row.nombre
                            html += row.nom_mat + " " + row.cve_mat
                        html += "</p>"
                        html += "<p class='fecha'>"
                            // html += row.apellido  
                            html += row.existencia
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

function getListaMaterialesAgotados() {
    $query = "select r.cve_mat, nom_mat, sum(cant_res)-sum(baja_res) as existencia from material m join resurtir r on m.cve_mat=r.cve_mat group by r.cve_mat having existencia=0 or existencia<0"

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
                        html += '<span data-feather="shopping-cart"></span>'
                    html += "</div>"

                    html += "<div class='nombre-obra'>"
                        html += "<p>"
                            // html += row.nombre
                            html += row.nom_mat + " " + row.cve_mat
                        html += "</p>"
                        html += "<p class='fecha'>"
                            // html += row.apellido  
                            html += row.existencia
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

function getFiltroExistencia(busqueda) {
    $query = "select r.cve_mat, nom_mat, sum(cant_res)-sum(baja_res) as existencia from material m join resurtir r on m.cve_mat=r.cve_mat where nom_mat like '%" + busqueda + "%' group by r.cve_mat having existencia>0" 

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
                        html += '<span data-feather="shopping-cart"></span>'
                    html += "</div>"

                    html += "<div class='nombre-obra'>"
                        html += "<p>"
                            // html += row.nom_per
                            html += row.nom_mat + " " + row.cve_mat
                        html += "</p>"
                        html += "<p class='fecha'>"
                            // html += row.ap_per + " " + row.am_per 
                            html += row.existencia
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

function getFiltroAgotado(busqueda) {
    $query = "select r.cve_mat, nom_mat, sum(cant_res)-sum(baja_res) as existencia from material m join resurtir r on m.cve_mat=r.cve_mat where nom_mat like '%" + busqueda + "%' group by r.cve_mat having existencia=0 or existencia<0" 

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
                            // html += row.nom_per
                            html += row.nom_mat + " " + row.cve_mat
                        html += "</p>"
                        html += "<p class='fecha'>"
                            // html += row.ap_per + " " + row.am_per 
                            html += row.existencia
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

function seleccionarMaterial(cveMat) {
    $query = "select * from material where cve_mat=" + cveMat

    connection.query($query, function (err, rows, fields) {
        if (err) {
            console.log("ERROR")
            return console.log(err.stack)
        }

        var html = ''

        html += "<h2>"
            html += "Material " + rows[0].cve_mat
        html += "</h2>"

        html += "<div class='row mt-3'>"
            html += "<h6 class='mb-1 col-md-3'>"
                html += "<span class='text-muted'>"
                    html += "Nombre: "
                html += "</span>"

                html += "<span id='nombreMat'>"
                    // html += "undef"
                    html += rows[0].nom_mat
                html += "</span>"
            html += "</h6>"

            html += "<h6 class='mb-1 col-md-3'>"
                html += "<span class='text-muted'>"
                    html += "Marca: "
                html += "</span>"

                html += "<span id='marcaMat'>"
                    html += rows[0].marca_mat
                html += "</span>"
            html += "</h6>"

            html += "<h6 class='mb-1 mr-4 width-50'>"
                html += "<span class='text-muted'>"
                    html += "Tipo: "
                html += "</span>"

                html += "<span id='tipo'>"
                    html += rows[0].tipo_mat
                html += "</span>"
            html += "</h6>"

            html += "<h6 class='mb-1 mr-4 width-50 col-md-2'>"
            html += "</h6>"

            html += "<a class='p-0 col-md-1 nav-link' href='#' id='detalles'>"
                html += "Más detalles"
            html += "</a>"

        html += "</div>"

        html += "<hr class='mb-4 mr-2'>"

        $('.dashboard').empty()
        $('.dashboard').append(html)

        setInformacion(cveMat)
    })
}

function setInformacion(cveMat) {
    
}