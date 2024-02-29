const express = require("express");
const router = express.Router();
const {
  getTeacher,
  getTeachers,
  AddTeacher,
  deleteTeacher,
  updateTeacher,
} = require("../controller/teachers");

/* *******************************************************  */
/*             Ruta de acceso a archivos contacts           */
/* *******************************************************  */
router.get("/teacher", getTeachers);
router.get("/teacher/:id", getTeacher);
router.post("/teacher", validarData, AddTeacher);
router.put("/teacher/:id", validarData, updateTeacher);
router.delete("/teacher/:id", deleteTeacher);

function validarData(req, res, next) {
  console.log("Body....", req.body);
  const { email, nombre, telefono, dni, } = req.body;

  if (!dni) {
    return res.status(400).json({
      message: "Ingrese un dni válido..",
      exito: false,
    });
  }

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
  if (!telefono) {
    return res.status(400).json({
      message: "El telefono, no puede estar vacío..",
      exito: false,
    });
  }
  next();
}

module.exports = router;
