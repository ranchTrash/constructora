var electron = require('electron')
var connection = electron.remote.require('./main').connection

var filtroSeleccionado = ''

$(document).ready(function () {
    generarListaObras()
    filtroSeleccionado = 'obras'
})

$('.dropdown-item').on('click', function () {
    var opcion = $(this).text()

    if (opcion.localeCompare('Activas') === 0) {
        generarListaObrasActivas()
        filtroSeleccionado = 'activas'
    } else if (opcion.localeCompare('Terminadas') === 0) {
        generarListaObrasTerminadas()
        filtroSeleccionado = 'terminadas'
    } else if (opcion.localeCompare('Canceladas') === 0) {
        generarListaObrasCanceladas()
        filtroSeleccionado = 'canceladas'
    }
})

$('.form-control').on('keyup', function () {
    var busqueda = $('.form-control').val()

    getFiltroObra(busqueda)

    // if (filtroSeleccionado.localeCompare('activas') === 0) {
    //     getFiltroEmpleado(busqueda)
    // } else if (filtroSeleccionado.localeCompare('terminadas') === 0) {
    //     getFiltroPersona(busqueda)
    // } else if (filtroSeleccionado.localeCompare('canceladas') === 0) {
    //     getFiltroPersona(busqueda)
    // }
})

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

    $(".lista").empty()
    $(".lista").append(html)

    feather.replace()

  })
}

function generarListaObrasActivas() {
    $query = "select * from contrato c join statuscon sc on c.cve_con=sc.cve_con where status_sta='ACTIVO'"

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

        $(".lista").empty()
        $(".lista").append(html)

        feather.replace()

    })
}

function generarListaObrasTerminadas() {
    $query = "select * from contrato c join statuscon sc on c.cve_con=sc.cve_con where status_sta='TERMINADO'"

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

        $(".lista").empty()
        $(".lista").append(html)

        feather.replace()

    })
}

function generarListaObrasCanceladas() {
    $query = "select * from contrato c join statuscon sc on c.cve_con=sc.cve_con where status_sta='CANCELADO'"

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

        $(".lista").empty()
        $(".lista").append(html)

        feather.replace()

    })
}

function getFiltroObra(obra) {
    
    if (filtroSeleccionado.localeCompare('activas') === 0) {
        $query = "select * from contrato c join statuscon sc on c.cve_con=sc.cve_con where status_sta='ACTIVO' and fechai_con like '%" + obra + "%' or c.cve_con like '%" + obra + "%'"
    } else if (filtroSeleccionado.localeCompare('terminadas') === 0) {
        $query = "select * from contrato c join statuscon sc on c.cve_con=sc.cve_con where status_sta='TERMINADO' and fechai_con like '%" + obra + "%' or c.cve_con like '%" + obra + "%'"
    } else if (filtroSeleccionado.localeCompare('canceladas') === 0) {
        $query = "select * from contrato c join statuscon sc on c.cve_con=sc.cve_con where status_sta='CANCELADO' and fechai_con like '%" + obra + "%' or c.cve_con like '%" + obra + "%'"
    }

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
                            html += row.cve_con
                        html += "</p>"
                        html += "<p class='fecha'>"
                            html += row.fechai_con
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

// SCRIPTS

function formatearFecha(fecha) {
    var partesFecha = fecha.split(" ")
    var jsFecha = partesFecha[2] + " " + partesFecha[1] + " " + partesFecha[3]
    return jsFecha 
}

//////////////////////////////////////////////////////////////////////////////////////////////

// GENERACION DE TODOS LOS DATOS DE LA OBRA
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

        html += "<div class='row mt-3'>"
            html += "<h6 class='mb-1 col-md-2'>"
                html += "<span class='text-muted'>"
                    html += "Cliente: "
                html += "</span>"

                html += "<span id='nombreCliente'>"
                    html += "undef"
                html += "</span>"
            html += "</h6>"

            html += "<h6 class='mb-1 col-md-2'>"
                html += "<span class='text-muted'>"
                    html += "Tipo: "
                html += "</span>"

                html += "<span id='tipoObra'>"
                    html += rows[0].tipo_con
                html += "</span>"
            html += "</h6>"

            html += "<h6 class='mb-1 mr-4 width-50'>"
                html += "<span class='text-muted'>"
                    html += "Fecha de inicio: "
                html += "</span>"

                html += "<span id='fechaInicioObra'>"
                    var fecha = String(rows[0].fechai_con).split(" ")
                    html += fecha[2] + "/" + fecha[1] + "/" + fecha[3]
                html += "</span>"
            html += "</h6>"

            html += "<h6 class='mb-1 col-md-3'>"
                html += "<span class='text-muted'>"
                    html += "Fecha de fin: "
                html += "</span>"

                html += "<span id='fechaFinObra'>"
                    var fecha = String(rows[0].fechaf_con).split(" ")
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

        setCliente(claveObra)
        setActividades(claveObra)
        setTrabajadores(claveObra)
        setMateriales(claveObra)
        setPermisos(claveObra)

        feather.replace()
    })
}

// GENERADORES DE TABLAS

function generarTablaActividades($query) {
    connection.query($query, function (err, rows, fields) {
        if (err) {
            console.log("ERROR")
            return console.log(err.stack)
        }

        var html = ''

        html += "<div class='row mb-2 mt-3'>"
            html += "<h4 class='col-md-5'>Actividades</h4>"
            // html += "<label class='col-md-1' for='filtro'>Filtro</label>"
            
            // html += "<select class='form-control col-md-3' id='filtro'>"
            //     html += "<option>Mayor avance</option>"
            //     html += "<option>Menor avance</option>"
            //     html += "<option>Todas</option>"
            // html += "</select>"       

            html += "<label class='col-md-4'></label>"

            // html += "<input class='form-control col-md-3' type='text' placeholder='Buscar' aria-label='Search'>"

            // html += "<span data-feather='file-text'></span>"

            html += "<div class='btn-group col-md-3' role='group' aria-label='Basic example'>"
                html += "<button type='button' class='btn btn-info agregarActividad' id='agregarActividad'>+</button>"
                html += "<button type='button' class='btn btn-info'>Ir a Actividades</button>"
            html += "</div>"

        html += "</div>"

        html += "<table class='table' id='tabla'>"
            html += "<thead class='thead-light'>"
                html += "<tr>"
                    html += "<th scope='col'>Actividad</th>"
                    html += "<th scope='col'>A realizar</th>"
                    html += "<th scope='col'>Avance total</th>"
                    html += "<th scope='col'>U. medida</th>"
                    html += "<th scope='col'>Progreso</th>"
                html += "</tr>"
            html += "</thead>"

            html += "<tbody>"

        rows.forEach(row => {
            html += "<tr class='text-justify'>"
                html += "<th scope='row' id='linkActividad'>" + row.nom_act + "</th>"
                html += "<td>" + row.total + "</td>"
                html += "<td>" + row.avanzado + "</td>"
                html += "<td>" + row.umedida_act + "</td>"

                var progreso = row.avanzado * 100 / row.total

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

function generarTablaTrabajadores($query) {
    connection.query($query, function (err, rows, fields) {
        if (err) {
            console.log("ERROR")
            return console.log(err.stack)
        }

        var html = ''

        // html += "<h4>Trabajadores</h4>"

        html += "<div class='row mb-2 mt-5'>"
            html += "<h4 class='col-md-5'>Trabajadores</h4>"
            // html += "<label class='col-md-1' for='filtro'>Filtro</label>"
            
            // html += "<select class='form-control col-md-3' id='filtro'>"
            //     html += "<option>Mayor avance</option>"
            //     html += "<option>Menor avance</option>"
            //     html += "<option>Todas</option>"
            // html += "</select>"       

            html += "<label class='col-md-4'></label>"

            html += "<div class='btn-group col-md-3' role='group' aria-label='Basic example'>"
                html += "<button type='button' class='btn btn-info' id='agregarTrabajador'>+</button>"
                html += "<button type='button' class='btn btn-info'>Ir a Trabajadores</button>"
            html += "</div>"

        html += "</div>"

        html += "<table class='table' id='tabla'>"
            html += "<thead class='thead-light'>"
                html += "<tr>"
                    html += "<th scope='col'>Nombre</th>"
                    html += "<th scope='col'>Actividad</th>"
                    html += "<th scope='col'>Avance/Total</th>"
                    html += "<th scope='col'>U. medida</th>"
                    html += "<th scope='col'>Progreso</th>"
                html += "</tr>"
            html += "</thead>"

            html += "<tbody>"

        rows.forEach(row => {
            html += "<tr class='text-justify'>"
                html += "<th scope='row' id='linkTrabajador'>" + row.nombre + "</th>"
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

function generarTablaMateriales($query) {
    connection.query($query, function (err, rows, fields) {
        if (err) {
            console.log("ERROR")
            return console.log(err.stack)
        }

        var html = ''

        html += "<div class='row mb-2 mt-5'>"
            html += "<h4 class='col-md-5'>Materiales</h4>"
            // html += "<label class='col-md-1' for='filtro'>Filtro</label>"
            
            // html += "<select class='form-control col-md-3' id='filtro'>"
            //     html += "<option>Mayor avance</option>"
            //     html += "<option>Menor avance</option>"
            // html += "</select>"       

            html += "<label class='col-md-4'></label>"

            html += "<div class='btn-group col-md-3' role='group' aria-label='Basic example'>"
                html += "<button type='button' class='btn btn-info' id='agregarMaterial'>+</button>"
                html += "<button type='button' class='btn btn-info'>Ir a Materiales</button>"
            html += "</div>"

        html += "</div>"

        html += "<table class='table' id='tabla'>"
            html += "<thead class='thead-light'>"
                html += "<tr>"
                    html += "<th scope='col'>Material</th>"
                    html += "<th scope='col'>Asignado</th>"
                    html += "<th scope='col'>Unidad de medida</th>"
                html += "</tr>"
            html += "</thead>"

            html += "<tbody>"

        rows.forEach(row => {
            html += "<tr class='text-justify'>"
                html += "<th scope='row' id='linkMaterial'>" + row.nom_mat + "</th>"
                html += "<td>" + row.asignado + "</td>"
                html += "<td>" + row.umedida_mat + "</td>"

            html += "</tr>"
        });

            html += "</tbody>"
        html += "</table>"

        html += "<hr class='mb-3'>"

        $(".dashboard").append(html)
    })
}

function generarTablaPermisos($query) {
    connection.query($query, function (err, rows, fields) {
        if (err) {
            console.log("ERROR")
            return console.log(err.stack)
        }

        var html = ''

        html += "<div class='row mb-2 mt-5'>"
            html += "<h4 class='col-md-5'>Permisos</h4>"
            // html += "<label class='col-md-1' for='filtro'>Filtro</label>"
            
            // html += "<select class='form-control col-md-3' id='filtro'>"
            //     html += "<option>Mayor avance</option>"
            //     html += "<option>Menor avance</option>"
            // html += "</select>"       

            html += "<label class='col-md-4'></label>"

            html += "<div class='btn-group col-md-3' role='group' aria-label='Basic example'>"
                html += "<button type='button' class='btn btn-info' id='agregarPermiso'>+</button>"
                html += "<button type='button' class='btn btn-info'>Ir a Permisos</button>"
            html += "</div>"

        html += "</div>"

        html += "<table class='table' id='tabla'>"
            html += "<thead class='thead-light'>"
                html += "<tr>"
                    html += "<th scope='col'>Tipo</th>"
                    html += "<th scope='col'>Fecha de inicio</th>"
                    html += "<th scope='col'>Fecha de fin</th>"
                    html += "<th scope='col'>Descripción</th>"
                html += "</tr>"
            html += "</thead>"

            html += "<tbody>"

        rows.forEach(row => {
            html += "<tr class='text-justify'>"
                html += "<th scope='row' id='linkPermiso'>" + row.tipo_per + "</th>"
                html += "<td>" + formatearFecha(String(row.fi_percon)) + "</td>"
                html += "<td>" + formatearFecha(String(row.ff_percon)) + "</td>"
                html += "<td>" + row.descrip_per + "</td>"

            html += "</tr>"
        });

            html += "</tbody>"
        html += "</table>"

        html += "<hr class='mb-3'>"

        $(".dashboard").append(html)
    })
}

// SETTERS DE TABLAS

function setActividades(claveObra) {
    // $query = "select cant_actrea, nom_act from actrealizar ar join actividad a on ar.cve_act=a.cve_act where cve_con=" + claveObra + " group by ar.cve_act"
    $query = "select sum(cant_ava) as avanzado, cant_actrea as total, nom_act, umedida_act from avance a join trabajadoract ta on a.num_traact=ta.num_traact join actrealizar ar on ta.num_actrea=ar.num_actrea join actividad act on ar.cve_act=act.cve_act where cve_con=" + claveObra + " group by ar.cve_act"

    generarTablaActividades($query)
}

function setTrabajadores(claveObra) {
    $query = "select concat(nom_per, ' ', ap_per, ' ', am_per) as nombre, nom_act, sum(cant_ava) as avance, cant_traact, umedida_ava from persona p join contratotra ct on p.cve_per=ct.cve_per join avance a on ct.cve_contra=a.cve_contra join trabajadoract ta on a.num_traact=ta.num_traact join actrealizar ar on ta.num_actrea=ar.num_actrea join actividad act on ar.cve_act=act.cve_act where cve_con=" + claveObra + " group by a.cve_contra"

    generarTablaTrabajadores($query)
}

function setMateriales(claveObra) {
    $query = " select nom_mat, sum(cant_asiher) as asignado, umedida_mat from material m join asignarherramienta ah on m.cve_mat=ah.cve_mat where cve_con=" + claveObra + " group by ah.cve_mat"

    generarTablaMateriales($query)
}

function setPermisos(claveObra) {
    $query = "select tipo_per, fi_percon, ff_percon, descrip_per from permiso p join permisocon pc on p.cve_perm=pc.cve_perm where cve_con=" + claveObra

    generarTablaPermisos($query)
}

function setCliente(claveObra) {
    $query = "select cve_cli from contrato c join cita ci on c.cve_cit=ci.cve_cit where cve_con=" + claveObra

    connection.query($query, function (err, rows, fields) {
        if (err) {
            console.log("ERROR")
            return console.log(err.stack)
        }

        $("#nombreCliente").text(rows[0].cve_cli)
    })
}

//////////////////////////////////////////////////////////////////////////////////////////////

$(document).on("click", '.boton-lista', function () {
    $(".boton-lista-activo").removeClass("boton-lista-activo")
    $(this).addClass("boton-lista-activo")

    var claveObra = $(this).find('.nombre-obra').find('p').first().text().split(" ")[1]

    seleccionaObra(parseInt(claveObra))


    // console.log(remote.getGlobal('obra').prop1);

    remote.getGlobal('obra').prop1 = claveObra;

    // var ipcRenderer = require('electron').ipcRenderer;     
    // ipcRenderer.send('show-prop1');  

    // console.log(remote.getGlobal('obra').prop1);
})

// var electron = require('electron')

$(document).on('click', ".agregarActividad", function () {   
    var runExec = electron.remote.require('./main').agregarActividad
    runExec()
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