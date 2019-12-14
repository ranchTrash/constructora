$(document).ready(function () {
    setCiudades()
})


$("#colonia").change(function () {
    console.log( $(this).val() );
    
})



$('#ciudad').change(function () {
    var opcion = $('#ciudad option:selected').text()
    if (opcion.localeCompare('Elige...') != 0) {
        setCodPos(opcion)
    } else {
        var html = ''

        html += "<option value=''>"
            html += "Elige..."
        html += '</option>'

        $('#codpos').empty()
        $('#codpos').append(html)
    }
})

$('#codpos').change(function () {
    var opcion = $('#codpos option:selected').text()
    if (opcion.localeCompare('Elige...') != 0) {
        setColonias(opcion)
    } else {
        var html = ''

        html += "<option value=''>"
            html += "Elige..."
        html += '</option>'

        $('#colonia').empty()
        $('#colonia').append(html)
    }
})

function setCiudades() {
    $query = "select nom_ciu from ciudad order by nom_ciu"

    connection.query($query, function (err, rows, fields) {
        if (err) {
            console.log("ERROR")
            return console.log(err.stack)
        }

        var html = ''

        rows.forEach(row => {
            html += '<option>'
                html += row.nom_ciu
            html += '</option>'
        });

        $('#ciudad').append(html)

    })
}

function setCodPos(nombreCiudad) {
    $query = "select codpos_cod from codigo cp join ciudad c on cp.cve_ciu=c.cve_ciu where nom_ciu='" + nombreCiudad + "'"

    connection.query($query, function (err, rows, fields) {
        if (err) {
            console.log("ERROR")
            return console.log(err.stack)
        }

        var html = ''

        html += "<option value=''>"
            html += "Elige..."
        html += '</option>'

        rows.forEach(row => {
            html += '<option>'
                html += row.codpos_cod
            html += '</option>'
        });

        $('#codpos').empty()
        $('#codpos').append(html)

    })
}

function setColonias(codpos) {
    $query = "select cve_col, nom_col from colonia c join codigo cp on c.cp_cod=cp.cp_cod where cp.codpos_cod=" + codpos

    connection.query($query, function (err, rows, fields) {
        if (err) {
            console.log("ERROR")
            return console.log(err.stack)
        }

        var html = ''

        html += "<option value=''>"
            html += "Elige..."
        html += '</option>'

        rows.forEach(row => {
            html += "<option value=" + row.cve_col + ">"
                html += row.nom_col
            html += '</option>'
        });

        $('#colonia').empty()
        $('#colonia').append(html)

    })
}





// $("#btnTest").on('click', function () {
//     $query = "call sp_testeo(?, ?);"

//     var r = ["saul", "andre"]

//     connection.query($query, r, function (error, results, fields) {
//         if (error) {
//             console.log("ERROR")
//             return console.log(error.stack)
//         }

//         console.log(results);
        
        
//     })
    
// })





// $query = "select nom_ciu from ciudad order by nom_ciu"

// connection.query($query, function (err, rows, fields) {
//     if (err) {
//         console.log("ERROR")
//         return console.log(err.stack)
//     }


// })
  