import express from "express";
const router = express.Router(); //Para que este código pueda ser usado o llamado desde app
import registro from "../models/registro";// importar el modelo nota
const cloudinary = require("../utils/cloudinary"); //importando la librería de cloudinary para guardar las imágenes
const upload = require("../utils/multer");//multer es igual a express-upload, sirve para que el backend reciba archivos

// Agregar una nota
router.post("/nueva-registro", upload.single("foto"), async (req, res) => { //upload.single("foto") recibir imagen con nombre de foto
  try {
    const body = req.body; //Se leen los datos mandados por el frontend
    const result = await cloudinary.uploader.upload(req.file.path); //Se guarda la imagen en cloudinary y lo que devuelve cloudinary se guarda en result 
    const data = new registro(body); //se instancia un objeto de registro
    data.foto = result.secure_url; //se almacena la url de la imagen en la variable foto
    const regDB = await data.save(); //se almacena el objeto en la base de datos
    res.status(200).json(regDB);
  } catch (error) {
    return res.status(500).json({
      mensaje: "Ocurrio un error",
      error: error
    });
  }
});

// Get con parámetros
router.get("/registro/:id", async (req, res) => {
  const _id = req.params.id;
  try {
    const regDB = await registro.findOne({ _id });
    res.json(regDB);
  } catch (error) {
    return res.status(400).json({
      mensaje: "Ocurrio un error",
      error,
    });
  }
});

// Get con todos los documentos
router.get("/registro", async (req, res) => {
  try {
    const regDB = await registro.find();
    res.json(regDB);
  } catch (error) {
    return res.status(400).json({
      mensaje: "Ocurrio un error",
      error,
    });
  }
});

// Delete eliminar una nota
router.delete("/registro/:id", async (req, res) => {
  const _id = req.params.id;
  try {
    const regDB = await registro.findByIdAndDelete({ _id });
    if (!regDB) {
      return res.status(400).json({
        mensaje: "No se encontró el id indicado",
        error,
      });
    }
    res.json(regDB);
  } catch (error) {
    return res.status(400).json({
      mensaje: "Ocurrio un error",
      error,
    });
  }
});

// Put actualizar una nota
router.put("/registro/:id", async (req, res) => {
  const _id = req.params.id;
  const body = req.body;
  try {
    const regDB = await registro.findByIdAndUpdate(_id, body, { new: true });
    res.json(regDB);
  } catch (error) {
    return res.status(400).json({
      mensaje: "Ocurrio un error",
      error,
    });
  }
});

// Get para filtro de busqueda
router.get("/busqueda/tipo/:id", async (req, res) => {
  try {
    let aux = req.params.id.split("&"); //se hace split para separar cadenas 
    var ciudad = new RegExp(["^", aux[0], "$"].join(""), "i"); //Es para acticar una Regular Expression para buscar sin importar mayusculas o minusculas
    var genero = new RegExp(["^", aux[1], "$"].join(""), "i");
    var especie = new RegExp(["^", aux[2], "$"].join(""), "i");
    const regDB = await registro.find().and([{ especie: especie }, { listaciudad: ciudad }, { genero: genero }]);
    res.json(regDB);
  } catch (error) {
    return res.status(400).json({
      mensaje: "Ocurrio un error al hacer la busqueda por filtro",
      error,
    });
  }
});

// Exportamos la configuración de express app
module.exports = router;
