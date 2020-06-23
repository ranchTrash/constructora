/* 
$query = "select * from contrato"

connection.query($query, function (err, rows, fields) {
    if (err) {
        console.log("ERROR")
        return console.log(err.stack)
    }
})

*/

var electron = require('electron')
var connection = electron.remote.require('./main').connection

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function formatearFecha(fecha) {
    var partesFecha = String(fecha).split(" ")
    var jsFecha = partesFecha[2] + " " + partesFecha[1] + " " + partesFecha[3]
    return jsFecha 
}

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

$(document).on("click", '.boton-lista', function () {
    $(".boton-lista-activo").removeClass("boton-lista-activo")
    $(this).addClass("boton-lista-activo")

    var curpEmp = $(this).find('.nombre-obra').find('p').first().text()
    console.log(curpEmp);

    if (filtroSeleccionado.localeCompare('empleados') === 0) {
        seleccionaEmpleado(curpEmp)
    } else {
        seleccionaPersona(curpEmp)
    }
})

function seleccionaEmpleado(curpEmp) {
    $query = "select * from persona p join contratotra ct on p.cve_per=ct.cve_per where curp_per='" + curpEmp + "'"

    connection.query($query, function (err, rows, fields) {
        if (err) {
            console.log("ERROR")
            return console.log(err.stack)
        }

        var html = ''

        html += "<h2>"
            html += "Empleado " + rows[0].cve_per
        html += "</h2>"

        html += "<div class='row mt-3'>"
            html += "<h6 class='mb-1 col-md-2'>"
                html += "<span class='text-muted'>"
                    html += "Nombre: "
                html += "</span>"

                html += "<span id='nombreEmp'>"
                    // html += "undef"
                    html += rows[0].nom_per + " " + rows[0].ap_per + " " + rows[0].am_per
                html += "</span>"
            html += "</h6>"

            html += "<h6 class='mb-1 col-md-2'>"
                html += "<span class='text-muted'>"
                    html += "Puesto: "
                html += "</span>"

                html += "<span id='puestoEmp'>"
                    html += rows[0].puesto_contra
                html += "</span>"
            html += "</h6>"

            html += "<h6 class='mb-1 mr-4 width-50'>"
                html += "<span class='text-muted'>"
                    html += "Fecha de inicio: "
                html += "</span>"

                html += "<span id='fechaInicioEmp'>"
                    var fecha = String(rows[0].fi_contra).split(" ")
                    html += fecha[2] + "/" + fecha[1] + "/" + fecha[3]
                html += "</span>"
            html += "</h6>"

            html += "<h6 class='mb-1 col-md-3'>"
                html += "<span class='text-muted'>"
                    html += "Fecha de fin: "
                html += "</span>"

                html += "<span id='fechaFinEmp'>"
                    var fecha = String(rows[0].ff_contra).split(" ")
                    html += fecha[2] + "/" + fecha[1] + "/" + fecha[3]
                html += "</span>"
            html += "</h6>"

            html += "<a class='p-0 col-md-1 nav-link' href='#' id='detalles'>"
                html += "Más detalles"
            html += "</a>"

        html += "</div>"

        html += "<hr class='mb-4 mr-2'>"

        $('.dashboard').empty()
        $('.dashboard').append(html)

        setInformacion(curpEmp)
        setObras(curpEmp)
        setActividades(curpEmp)
    })
}

function seleccionaPersona(curpEmp) {
    $query = "select * from persona p join contratotra ct on p.cve_per=ct.cve_per where curp_per='" + curpEmp + "'"

    connection.query($query, function (err, rows, fields) {
        if (err) {
            console.log("ERROR")
            return console.log(err.stack)
        }

        var html = ''

        html += "<h2>"
            html += "Empleado " + rows[0].cve_per
        html += "</h2>"

        html += "<div class='row mt-3'>"
            html += "<h6 class='mb-1 col-md-6'>"
                html += "<span class='text-muted'>"
                    html += "Nombre: "
                html += "</span>"

                html += "<span id='nombreEmp'>"
                    // html += "undef"
                    html += rows[0].nom_per + " " + rows[0].ap_per + " " + rows[0].am_per
                html += "</span>"
            html += "</h6>"

            html += "<h6 class='mb-1 col-md-4'>"
                html += "<span class='text-muted'>"
                    html += "Puesto: "
                html += "</span>"

                html += "<span id='puestoEmp'>"
                    // html += rows[0].puesto_contra
                    html += "Sin obra asignada"
                html += "</span>"
            html += "</h6>"

            // html += "<h6 class='mb-1 mr-4 width-50'>"
            //     html += "<span class='text-muted'>"
            //         html += "Fecha de inicio: "
            //     html += "</span>"

            //     html += "<span id='fechaInicioEmp'>"
            //         var fecha = String(rows[0].fi_contra).split(" ")
            //         html += fecha[2] + "/" + fecha[1] + "/" + fecha[3]
            //     html += "</span>"
            // html += "</h6>"

            // html += "<h6 class='mb-1 col-md-3'>"
            //     html += "<span class='text-muted'>"
            //         html += "Fecha de fin: "
            //     html += "</span>"

            //     html += "<span id='fechaFinEmp'>"
            //         var fecha = String(rows[0].ff_contra).split(" ")
            //         html += fecha[2] + "/" + fecha[1] + "/" + fecha[3]
            //     html += "</span>"
            // html += "</h6>"

            html += "<a class='p-0 col-md-1 nav-link' href='#' id='detalles'>"
                html += "Más detalles"
            html += "</a>"

        html += "</div>"

        html += "<hr class='mb-4 mr-2'>"

        $('.dashboard').empty()
        $('.dashboard').append(html)

        // setCliente(claveObra)
        // setActividades(claveObra)
        // setTrabajadores(claveObra)
        // setMateriales(claveObra)
        // setPermisos(claveObra)
    })
}

function getListaEmpleados() {

    // $query = "select concat(nom_per, ' ') as nombre, concat(ap_per, ' ', am_per) as apellido from persona p join contratotra ct on p.cve_per=ct.cve_per"
    $query = "select * from persona p join contratotra ct on p.cve_per=ct.cve_per where curdate() between fi_contra and ff_contra"

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
                            // html += row.nombre
                            html += row.curp_per
                        html += "</p>"
                        html += "<p class='fecha'>"
                            // html += row.apellido  
                            html += row.puesto_contra
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
    // $query = "select concat(nom_per, ' ') as nombre, concat(ap_per, ' ', am_per) as apellido from persona"
    $query = "select * from persona p join contratotra ct on p.cve_per=ct.cve_per where curdate() not between fi_contra and ff_contra"

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
                            // html += row.nombre
                            html += row.curp_per
                        html += "</p>"
                        html += "<p class='fecha'>"
                            // html += row.apellido  
                            html += row.puesto_contra
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
    // $query = "select nom_per, ap_per, am_per from persona p join contratotra ct on p.cve_per=ct.cve_per where nom_per like '%" + empleado + "%' or ap_per like '%" + empleado + "%' or am_per like '%" + empleado + "%'" 
    $query = "select * from persona p join contratotra ct on p.cve_per=ct.cve_per where nom_per like '%" + empleado + "%' or ap_per like '%" + empleado + "%' or am_per like '%" + empleado + "%' or curp_per like '%" + empleado + "%' or puesto_contra like '%" + empleado + "%' and curdate() between fi_contra and ff_contra" 

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
                            html += row.curp_per
                        html += "</p>"
                        html += "<p class='fecha'>"
                            // html += row.ap_per + " " + row.am_per 
                            html += row.puesto_contra
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

// arreglar
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

// SETTERS

function setInformacion(curpEmp) {
    // $query = "select * from persona p join contratotra ct on p.cve_per=ct.cve_per where curp_per=" + curpEmp
    $query = "select * from ciudad c join codigo cod on c.cve_ciu=cod.cve_ciu join colonia col on cod.cp_cod=col.cp_cod join persona p on col.cve_col=p.cve_col join contratotra ct on p.cve_per=ct.cve_per where curp_per='" + curpEmp + "'"

    connection.query($query, function (err, rows, fields) {
        if (err) {
            console.log("ERROR")
            return console.log(err.stack)
        } 

        var html = ''

        html += "<div class='container'>"
            html += "<div class='row'>"

                html += "<div class='col-md-3 border-right'>"
                    html += "<span class='ml-5' data-feather='user' style='width:100px;height:100px;'></span>"
                html += "</div>"

                html += "<div class='col-md-9 pl-5'>"
                    html += "<div class='row'>"
                        html += "<h5>Nombre:&nbsp;</h5>"
                        var nombre = rows[0].nom_per + " " + rows[0].ap_per + " " + rows[0].am_per
                        html += "<h5 class='text-muted'>" + nombre + "</h5>"
                    html += "</div>"

                    html += "<div class='row'>"
                        html += "<h5>CURP:&nbsp;</h5>"
                        html += "<h5 class='text-muted'>" + rows[0].curp_per + "</h5>"
                    html += "</div>"

                    html += "<div class='row'>"
                        html += "<h5>Sexo:&nbsp;</h5>"
                        html += "<h5 class='text-muted'>" + rows[0].genero_per + "</h5>"
                    html += "</div>"

                    html += "<div class='row'>"
                        html += "<h5>Fecha de nacimiento:&nbsp;</h5>"
                        var dia = String(rows[0].fnac_per).split(" ")[2]
                        var mes = String(rows[0].fnac_per).split(" ")[1]
                        var anio = String(rows[0].fnac_per).split(" ")[3]
                        var fechaNac = dia + "/" + mes + "/" + anio
                        html += "<h5 class='text-muted'>" + fechaNac + "</h5>"
                    html += "</div>"

                    html += "<div class='row'>"
                        html += "<h5>Estado civil:&nbsp;</h5>"
                        html += "<h5 class='text-muted'>" + rows[0].edocivil_per + "</h5>"
                    html += "</div>"

                    html += "<div class='row'>"
                        html += "<h5>Correo electrónico:&nbsp;</h5>"
                        html += "<h5 class='text-muted'>" + rows[0].mail_per + "</h5>"
                    html += "</div>"

                    html += "<div class='row'>"
                        html += "<h5>Teléfono:&nbsp;</h5>"
                        html += "<h5 class='text-muted'>" + rows[0].tel_per + "</h5>"
                    html += "</div>"

                    html += "<div class='row'>"
                        html += "<h5>Dirección:&nbsp;</h5>"
                        var calle = rows[0].calle_per
                        var num = rows[0].num_per
                        var orient = rows[0].orient_per
                        var colonia = rows[0].nom_col
                        var ciudad = rows[0].nom_ciu
                        var cod = rows[0].codpos_cod
                        var direccion = calle + " " + num + " " + orient + " " + colonia + " " + ciudad + " " + cod
                        html += "<h5 class='text-muted'>" + direccion + "</h5>"
                    html += "</div>"

                    // Info de contrato

                    // html += "<div class='row pt-4 border-top'>"
                    //     html += "<h5>Puesto:&nbsp;</h5>"
                    //     html += "<h5 class='text-muted'>" + rows[0].puesto_contra + "</h5>"
                    // html += "</div>"

                    // html += "<div class='row'>"
                    //     html += "<h5>Sueldo:&nbsp;</h5>"
                    //     html += "<h5 class='text-muted'>$" + rows[0].sueldo_contra + "</h5>"
                    // html += "</div>"

                    // html += "<div class='row'>"
                    //     html += "<h5>NSS:&nbsp;</h5>"
                    //     html += "<h5 class='text-muted'>" + rows[0].nss_contra + "</h5>"
                    // html += "</div>"

                    // html += "<div class='row'>"
                    //     html += "<h5>Inició contrato:&nbsp;</h5>"
                    //     html += "<h5 class='text-muted'>" + formatearFecha(rows[0].fi_contra) + "</h5>"
                    // html += "</div>"

                    // html += "<div class='row'>"
                    //     html += "<h5>Contrato termina:&nbsp;</h5>"
                    //     html += "<h5 class='text-muted'>" + formatearFecha(rows[0].ff_contra) + "</h5>"
                    // html += "</div>"

                html += "</div>"

            html += "</div>"

        html += "</div>"

        html += "<hr>"

        $(".dashboard").append(html)
        feather.replace()
    })
}

function setObras(curpEmp) {
    $query = "select cve_con, fi_contra, ff_contra, puesto_contra, sueldo_contra, nss_contra from persona p join contratotra ct on p.cve_per=ct.cve_per join avance a on ct.cve_contra=a.cve_contra join trabajadoract ta on a.num_traact=ta.num_traact join actrealizar ar on ta.num_actrea=ar.num_actrea join actividad act on ar.cve_act=act.cve_act where curp_per='" + curpEmp + "' group by cve_con"
   
    connection.query($query, function (err, rows, fields) {
        if (err) {
            console.log("ERROR")
            return console.log(err.stack)
        }

        if (rows[0].nombre === null) {
            return
        }

        var html = ''

        html += "<div class='row mb-2'>"
            html += "<h4 class='col-md-5'>Obras asignadas</h4>"

            html += "<label class='col-md-4'></label>"

            html += "<div class='btn-group col-md-3' role='group' aria-label='Basic example'>"
                html += "<button type='button' class='btn btn-info'>Ir a Obras</button>"
            html += "</div>"

        html += "</div>"

        html += "<table class='table' id='tabla'>"
            html += "<thead class='thead-light'>"
                html += "<tr>"
                    html += "<th scope='col'>Obra</th>"
                    html += "<th scope='col'>Puesto</th>"
                    html += "<th scope='col'>Sueldo($)</th>"
                    html += "<th scope='col'>NSS</th>"
                    html += "<th scope='col'>Inicio</th>"
                    html += "<th scope='col'>Fin</th>"
                html += "</tr>"
            html += "</thead>"

            html += "<tbody>"

        rows.forEach(row => {
            html += "<tr class='text-justify'>"
                html += "<th scope='row'>" + row.cve_con + "</th>"
                html += "<td>" + row.puesto_contra + "</td>"
                html += "<td>" + row.sueldo_contra + "</td>"
                html += "<td>" + row.nss_contra + "</td>"
                html += "<td>" + formatearFecha(row.fi_contra) + "</td>"
                html += "<td>" + formatearFecha(row.ff_contra) + "</td>"

            html += "</tr>"
        });

            html += "</tbody>"
        html += "</table>"

        html += "<hr class='mb-3'>"

        $(".dashboard").append(html)
    })
}

function setActividades(curpEmp) {
    // $query = "select concat(nom_per, ' ', ap_per, ' ', am_per) as nombre, nom_act, sum(cant_ava) as avance, cant_traact, umedida_ava from persona p join contratotra ct on p.cve_per=ct.cve_per join avance a on ct.cve_contra=a.cve_contra join trabajadoract ta on a.num_traact=ta.num_traact join actrealizar ar on ta.num_actrea=ar.num_actrea join actividad act on ar.cve_act=act.cve_act where cve_con=" + claveObra + " group by a.cve_contra"
    $query = "select cve_con, concat(nom_per, ' ', ap_per, ' ', am_per) as nombre, nom_act, sum(cant_ava) as avance, cant_traact, umedida_ava from persona p join contratotra ct on p.cve_per=ct.cve_per join avance a on ct.cve_contra=a.cve_contra join trabajadoract ta on a.num_traact=ta.num_traact join actrealizar ar on ta.num_actrea=ar.num_actrea join actividad act on ar.cve_act=act.cve_act where curp_per='" + curpEmp + "'"

    connection.query($query, function (err, rows, fields) {
        if (err) {
            console.log("ERROR")
            return console.log(err.stack)
        }

        if (rows[0].nombre === null) {
            return
        }

        var html = ''

        html += "<div class='row mb-2 mt-5'>"
            html += "<h4 class='col-md-5'>Actividades asignadas</h4>"

            html += "<label class='col-md-4'></label>"

            html += "<div class='btn-group col-md-3' role='group' aria-label='Basic example'>"
                html += "<button type='button' class='btn btn-info'>Ir a Actividades</button>"
            html += "</div>"

        html += "</div>"

        html += "<table class='table' id='tabla'>"
            html += "<thead class='thead-light'>"
                html += "<tr>"
                    html += "<th scope='col'>Obra</th>"
                    html += "<th scope='col'>Actividad</th>"
                    html += "<th scope='col'>Avance/Total</th>"
                    html += "<th scope='col'>U. medida</th>"
                    html += "<th scope='col'>Progreso</th>"
                html += "</tr>"
            html += "</thead>"

            html += "<tbody>"

        rows.forEach(row => {
            html += "<tr class='text-justify'>"
                html += "<th scope='row'>" + row.cve_con + "</th>"
                html += "<td>" + row.nom_act + "</td>"
                html += "<td>" + row.avance + "/" + row.cant_traact + "</td>"
                html += "<td>" + row.umedida_ava + "</td>"

                var progreso = row.avance * 100 / row.cant_traact

                html += "<td>"
                    html += "<div class='progress'>"
                        html += "<div class='progress-bar' role='progressbar' style='width: " + progreso + "%;' aria-valuenow='" + progreso + "' aria-valuemin='0' aria-valuemax='100'>" + progreso + "%</div>"
                    html += "</div>"
                html += "</td>"

            html += "</tr>"
        });

            html += "</tbody>"
        html += "</table>"

        html += "<hr class='mb-3'>"

        $(".dashboard").append(html)
    })
}