const express = require("express");
const router = express.Router();
const {
  getCoursesTransactional,
  getCourseTransactional,
  AddCourseTransactional,
  deleteCourseTransactional,
  updateCourseTransaction,
} = require("../controller/courses-transaction");

/* *******************************************************  */
/*             Ruta de acceso a archivos contacts           */
/* *******************************************************  */
router.get("/course-transactional", getCoursesTransactional);
router.get("/course-transactional/:id", getCourseTransactional);
router.post("/course-transactional", validarData, AddCourseTransactional);
router.put("/course-transactional/:id", validarData, updateCourseTransaction);
router.delete("/course-transactional/:id", deleteCourseTransactional);

function validarData(req, res, next) {
  console.log("Body....", req.body);
  const { id, courseCode, studentDni, teacherDni, courseStarts, courseEnds } = req.body;

  if (!id) {
    return res.status(400).json({
      message: "Ingrese un id válido..",
      exito: false,
    });
  }
  if (!courseCode) {
    return res.status(400).json({
      message: "Ingrese un codigo de curso válido..",
      exito: false,
    });
  }
  if (!studentDni) {
    return res.status(400).json({
      message: "Ingrese un dni de estudiante válido..",
      exito: false,
    });
  }
  if (!teacherDni) {
    return res.status(400).json({
      message: "Ingrese un dni de profesor válido..",
      exito: false,
    });
  }
  if (!courseStarts) {
    return res.status(400).json({
      message: "Ingrese la fecha en la cual comienza el curso",
      exito: false,
    });
  }
  if (!courseEnds) {
    return res.status(400).json({
      message: "Ingrese la fecha en la cual culmina el curso",
      exito: false,
    });
  }
  next();
}

module.exports = router;
