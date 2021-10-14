import express from "express"; //framework de backend
import morgan from "morgan"; //mostrar la actividad en el backend
import cors from "cors"; //Acceso para controlar quién consume los servicios del backend
import path from "path"; 
import dotenv from 'dotenv'; //librería para usar variables de entorno
const mongoose = require("mongoose"); //librería de la base de datos

dotenv.config(); //activas la configuración de las variables de entorno

const app = express(); //activar el framework de backend

// Conexión base de datos
//const uri = 'mongodb+srv://velmak28:comodoro28@cluster0.wfwap.mongodb.net/YOSA?retryWrites=true&w=majority';
const uri = process.env.DATABASE; //lee la variable de entorno de la base de datos que se encuentra en .env
const options = { useNewUrlParser: true, useUnifiedTopology: true };//configuraciones de la base de datos estandar

// Se inicia la conexión con la base de datos
mongoose
  .connect(uri, options)
  .then(() => console.log("Conectado a DB"))
  .catch((err) => console.error(err));

app.use(morgan("tiny"));//inicializamos el morgan
app.use(cors());//inicializamos el cors
app.use(express.json());//configuramos el backend para que pueda recibir Json
app.use(express.urlencoded({ extended: true }));//configuramos para recibir formularios entre otros.

//Rutas
app.use("/api", require("./routes/registro")); //cuando el cliente ingrese a /api el servirdor se ira a la ruta que apunta require.

//MiddleWeare Vue.js
const history = require("connect-history-api-fallback"); //no se usa
app.use(history());//no se usa
app.use(express.static(path.join(__dirname, "public"))); //no se usa

app.set("puerto", process.env.PORT || 5000); //Levantas el  servidor
app.listen(app.get("puerto"), function () {
  //levantando el servidor
  console.log("Example app listening on port" + app.get("puerto"));
});
