var express = require('express');
var router = express.Router();
var app = express();

//Importamos CORS para poder utilizar Axios en Vue js
const cors = require('cors');
app.use(cors());

//importamos la libreria de postgres
var pg = require('pg');
//configuramos postgres con el usuario contraseña y la bd que queremos usar
var conString = "postgres://postgres:1234@localhost/Telnovo" //cadena de conexion



router.get('/cliente',function(req,res){
  res.header("Access-Control-Allow-Origin", "*");
  var client = new pg.Client(conString)
  client.connect();
  client.query("SELECT * FROM cliente").then(response=> {
    //console.log(response.rows)
    //Muestra los resultados en forma de JSON en nuestro HTML
    res.json(response.rows);
    client.end()
  }).catch(error =>{
    console.log(error);
    client.end();
  })
});

module.exports = router;
