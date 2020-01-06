var remote = require('electron').remote; 

var electron = require('electron')
var connection = electron.remote.require('./main').connection

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

$(document).ready(function () {
    var ipcRenderer = require('electron').ipcRenderer;     
    ipcRenderer.send('show-prop1');  

    console.log(remote.getGlobal('obra').prop1);

    getListaActividades()
})

function getDatos() {
    $("")
}

function getListaActividades() {
    $query = "select * from actividad"

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

(async function () {
    'use strict'
  
    window.addEventListener('load', async function () {  
      // Fetch all the forms we want to apply custom Bootstrap validation styles to
      var forms = document.getElementsByClassName('needs-validation')
  
      // Loop over them and prevent submission
      Array.prototype.filter.call(forms, async function (form) {
        form.addEventListener('submit', async function (event) {         
          if (form.checkValidity() === false) {
            event.preventDefault()
            event.stopPropagation()
          } else {
            getDatos()
            await sleep(100)
          }
          form.classList.add('was-validated')
        }, false)
      })
  
    }, false)
  }())