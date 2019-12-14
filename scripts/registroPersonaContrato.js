$(document).ready(function () {
    getActividades()
})

$("#btnAgregar").on('click', function () {
  var actividad = $("#actividad option:selected").val()

  console.log("actividad: " + actividad);
  

  $query = "select * from actividad where cve_act=" + actividad

  connection.query($query, function (err, rows, fields) {
    if (err) {
      console.log("ERROR")
      return console.log(err.stack)
    }

    var html = ''

    rows.forEach(row => {
      html += "<tr>"
        html += "<th>"
          html += row.cve_act
        html += "</th>"
    
        html += "<td>"
          html += row.nom_act
        html += "</td>"
    
        html += "<td>"
          html += row.descrip_act
        html += "</td>"
      html += "</tr>"
    });  

    $("#tabla").append(html)
  })
})

///////

function getActividades() {
    $query = "select cve_act, nom_act from actividad"

    connection.query($query, function (err, rows, fields) {
        if (err) {
            console.log("ERROR")
            return console.log(err.stack)
        }

        var html = ''

        rows.forEach(row => {
            html += "<option value='" + row.cve_act + "'>"
                html += row.nom_act
            html += "</option>"
        });

        $("#actividad").append(html)
    })
}

(function () {
    'use strict'

    window.addEventListener('load', function () {  
      // Fetch all the forms we want to apply custom Bootstrap validation styles to
      var forms = document.getElementsByClassName('needs-validation')
  
      // Loop over them and prevent submission
      Array.prototype.filter.call(forms, function (form) {
        form.addEventListener('submit', function (event) {         
          if (form.checkValidity() === false) {
            event.preventDefault()
            event.stopPropagation()
          } else {
            // getDatos()
          }
          form.classList.add('was-validated')
        }, false)
      })

    }, false)
}())