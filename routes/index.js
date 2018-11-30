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

//Para poder usar aplication/json con POSTMAN en PETICIONES POST


router.route('/cliente').
  get(function(req,res){
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
    }).
  post((req, res, next)=> {
      console.log("PETICION POST");
      console.log(req.body);
      var client = new pg.Client(conString)
      client.connect();
      client.query("INSERT INTO cliente VALUES($1,$2,$3,$4,$5,$6,$7,$8)",[req.body.id_cliente,req.body.dni,req.body.nombre,req.body.apellido,
      req.body.ciudad,req.body.direccion,req.body.telefono,req.body.mail]).then(response=> {
        //console.log(response.rows)
        //Muestra los resultados en forma de JSON en nuestro HTML
        res.json(response.rows);
        client.end()
      }).catch(error =>{
        console.log(error);
        client.end();
      })
  });






/*
var client = new pg.Client(conString)
client.connect();
client.query("INSERT INTO cliente VALUES($1,$2,$3,$4,$5,$6,$7,$8)",[req.body.id_cliente,req.body.dni,req.body.nombre,req.body.apellido,
req.body.ciudad,req.body.direccion,req.body.telefono,req.body.mail]).then(response=> {
  //console.log(response.rows)
  //Muestra los resultados en forma de JSON en nuestro HTML
  res.json(response.rows);
  client.end()
}).catch(error =>{
  console.log(error);
  client.end();
})
*/







module.exports = router;
