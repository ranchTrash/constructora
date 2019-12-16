var electron = require('electron')
var connection = electron.remote.require('./main').connection

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function getDatos() {
    var nombre
    var descrip
    var umedidad
    
    var fecha
    var precio
    var 
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