const express = require("express");
const router = express.Router();
const {
  getStudents,
  getStudent,
  getStudentDni,
  AddStudent,
  deleteStudent,
  updateStudent,
} = require("../controller/studens");

/* *******************************************************  */
/*             Ruta de acceso a archivos Students           */
/* *******************************************************  */

router.get("/student", getStudents);
router.get("/student/:id", getStudent);
router.get("/studentdni/:dni", getStudentDni);
router.post("/student", validarData, AddStudent);
router.put("/student/:id", validarData, updateStudent);
router.delete("/student/:id", deleteStudent);
;
function validarData(req, res, next) {
  console.log("Body....", req.body);
  const { dni, nombre, descripcion } = req.body;

  if (!dni) {
   return res.status(400).json({
     message: "Ingrese un Código de Estudente válido..",
     exito: false,
   });
  }
  if (!nombre) {
    return res.status(400).json({
      message: "El nombre, del Estudente está vacío..",
      exito: false,
    });
  }
  next();
}

module.exports = router;
