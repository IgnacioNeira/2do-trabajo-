const express = require("express");
const router = express.Router();
const {
  AddCourse,
  deleteCourse,
  getCourse,
  getCourses,
  updateCourse
} = require("../controller/course");

/* *******************************************************  */
/*             Ruta de acceso a archivos courses           */
/* *******************************************************  */
router.get("/course", getCourses);
router.get("/course/:id", getCourse);
router.post("/course", validarData, AddCourse);
router.put("/course/:id", validarData, updateCourse);
router.delete("/course/:id", deleteCourse);

function validarData(req, res, next) {
  console.log("Body....", req.body);
  const { courseName, courseCode, courseDescription, courseCost, courseStatus } = req.body;

  if (!courseCode) {
    return res.status(400).json({
      message: "Ingrese el codigo de un curso",
      exito: false,
    });
  }
  if (!courseName) {
    return res.status(400).json({
      message: "El nombre no puede estar vacío..",
      exito: false,
    });
  }
  if (!courseDescription) {
    return res.status(400).json({
      message: "la descripción no puede estar vacía..",
      exito: false,
    });
  }
  if (!courseCost) {
    return res.status(400).json({
      message: "El costo no puede estar vacío..",
      exito: false,
    });
  }
  if (!courseStatus) {
    return res.status(400).json({
      message: "El status no puede estar vacío..",
      exito: false,
    });
  }
  next();
}

module.exports = router;
