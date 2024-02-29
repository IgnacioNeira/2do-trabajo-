const express = require("express");
const router = express.Router();
const {
  getContacts,
  getContact,
  AddContact,
  deleteContact,
  updateContact,
} = require("../controller/contacts");

/* *******************************************************  */
/*             Ruta de acceso a archivos contacts           */
/* *******************************************************  */
router.get("/contact", getContacts);
router.get("/contact/:id", getContact);
router.post("/contact", validarData, AddContact);
router.put("/contact/:id", validarData, updateContact);
router.delete("/contact/:id", deleteContact);

function validarData(req, res, next) {
  console.log("Body....", req.body);
  const { email, nombre, comentario, telefono } = req.body;

  if (!email) {
    return res.status(400).json({
      message: "Ingrese un correo electrónico válido..",
      exito: false,
    });
  }
  if (!nombre) {
    return res.status(400).json({
      message: "El nombre, no puede estar vacío..",
      exito: false,
    });
  }
  if (!comentario) {
    return res.status(400).json({
      message: "El comentario, no puede estar vacío..",
      exito: false,
    });
  }
  if (!telefono) {
    return res.status(400).json({
      message: "El telefono, no puede estar vacío..",
      exito: false,
    });
  }
  next();
}

module.exports = router;
