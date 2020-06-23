const { app, BrowserWindow } = require('electron')
const { remote } = require('electron')
var mysql = require("mysql");

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win
var connection

global.obra = {
  prop1: null
};

function createWindow() {
  // create the browser window
  win = new BrowserWindow({
    width: 800,
    height: 700,
    webPreferences: {
      nodeIntegration: true
    }
  })

  win.webContents.session.setProxy({proxyRules:null})

  // and load the index.html of the app
  win.loadFile('index.html')

  // Open the DevTools
  // win.webContents.openDevTools()

  // Emitted when the window is closed
  win.on('closed', () => {
    // Dereference the window object, usually ypu would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null

    if (connection != null) {
      connection.end(function(){
        // The connection has been closed
        console.log("conexion cerrada con exito");
      })
    }

    
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a windows in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

// const button = document.getElementById("logbtn");

// button.addEventListener('click', () => console.log("Hola"))

var conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "3_99SA.17*Pc#2",
  database: "mysql"
});

conn.connect((err) => {
  if (err) {
    console.log("Error_, ver la consola para mas detalles.");
    return console.log(err.stack);
  } else {
    console.log("Conectado, 1ra conexion");
  }

  console.log("Conexion_ establecida satisfactoriamente.");
});

exports.runExec = function runExec(user, password) {  
  $query = "select exists (select User from user where User='" + user + "') as existe"

  conn.query($query, function (err, rows, fields) {
    if (err) {
      console.log("ERROR")
      return console.log(err.stack)
    }

    if (rows[0].existe == "1") {
      crearConexion(user, password)
    } else {
      return console.log("El usuario no existe")
    }
  })
}

var winRP

function openRegistroPersona () {
  winRP = new BrowserWindow({
    width: 800,
    height: 700,
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: true
    }
  })

  winRP.loadFile('ventanas/registroPersonas.html')

  win.on('closed', () => {
    win = null
  })
}

function openRegistroMaterial() {
  winRP = new BrowserWindow({
    width: 900,
    height: 700,
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: true
    }
  })

  winRP.loadFile('ventanas/registroMateriales.html')

  win.on('closed', () => {
    win = null
  })
}

function openRegistroObra() {
  winRP = new BrowserWindow({
    width: 1200,
    height: 700,
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: true
    }
  })

  winRP.loadFile('ventanas/registroObras.html')

  win.on('closed', () => {
    win = null
  })
}

function openRegistroCita() {
  winRP = new BrowserWindow({
    width: 1200,
    height: 700,
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: true
    }
  })

  winRP.loadFile('ventanas/registroCitas.html')

  win.on('closed', () => {
    win = null
  })
}

function openRegistroActividades() {
  winRP = new BrowserWindow({
    width: 900,
    height: 700,
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: true
    }
  })

  winRP.loadFile('ventanas/registroActividades.html')

  win.on('closed', () => {
    win = null
  })
}

function agregarActividad() {
  winRP = new BrowserWindow({
    width: 900,
    height: 700,
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: true
    }
  })

  winRP.loadFile('ventanas/agregarActividad.html')

  win.on('closed', () => {
    win = null
  })
}

function agregarTrabajador() {
  winRP = new BrowserWindow({
    width: 900,
    height: 700,
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: true
    }
  })

  winRP.loadFile('ventanas/agregarTrabajador.html')

  win.on('closed', () => {
    win = null
  })
}

function agregarMaterial() {
  winRP = new BrowserWindow({
    width: 900,
    height: 700,
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: true
    }
  })

  winRP.loadFile('ventanas/agregarMaterial.html')

  win.on('closed', () => {
    win = null
  })
}

// function agregarPermiso() {
//   winRP = new BrowserWindow({
//     width: 900,
//     height: 700,
//     autoHideMenuBar: true,
//     webPreferences: {
//       nodeIntegration: true
//     }
//   })

//   winRP.loadFile('ventanas/registroActividades.html')

//   win.on('closed', () => {
//     win = null
//   })
// }

function detallesObra() {
  winRP = new BrowserWindow({
    width: 900,
    height: 700,
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: true
    }
  })

  winRP.loadFile('ventanas/registroActividades.html')

  win.on('closed', () => {
    win = null
  })
}

////

function openTest() {
  winRP = new BrowserWindow({
    width: 1200,
    height: 700,
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: true
    }
  })

  winRP.loadFile('ventanas/test.html')

  win.on('closed', () => {
    win = null
  })
}

////////////////////////////////////////////////////////////////////////////////////////

// var connection

function crearConexion(us, pass) {
  connection = mysql.createConnection({
    // host: "%",
    user: us,
    password: pass,
    database: "constructora"
  });

  connection.connect((err) => {
    if (err) {
      console.log("Error, ver la consola para mas detalles.");
      return console.log(err.stack);
    } else {
      console.log("Conectado");
    }

    conn.end(function(){
      // The connection has been closed
      console.log("conexion_ cerrada con exito");
    })

    win.loadFile('ventanas/inicio.html')
    win.maximize()
    
    console.log("Conexion establecida satisfactoriamente.");

    exports.connection = connection;
  });

}

// var mysql = require("mysql");

// connection = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "3_99SA.17*Pc#2",
//   database: "constructora"
// });

// connection.connect((err) => {
//   if (err) {
//     console.log("Error, ver la consola para mas detalles.");
//     return console.log(err.stack);
//   } else {
//     console.log("Conectado");
//   }

//   console.log("Conexion establecida satisfactoriamente.");
// });

////////////////////////////////////////////

// exports.runExec = runExec;
exports.openRegistroPersona = openRegistroPersona;
exports.openRegistroMaterial = openRegistroMaterial;
exports.openRegistroObra = openRegistroObra;
exports.openRegistroActividades = openRegistroActividades;

exports.agregarActividad = agregarActividad;
exports.agregarTrabajador = agregarTrabajador;
exports.agregarMaterial = agregarMaterial;

exports.openTest = openTest;

// exports.connection = connection;
// exports.openRegistroPersona = openRegistroPersona;