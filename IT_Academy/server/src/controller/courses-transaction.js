const fs = require("fs").promises;
const coursesTransactionalFile = "src/json/courses-transactional.json";

//* *************************************************************** *//
//       definición de rutas  de acceso a archivo contacts           //
//* *************************************************************** *//

const getCoursesTransactional = async (req, res) => {
  try {
    const datos = await fs.readFile(coursesTransactionalFile, "utf-8");
    const coursesTransactional = JSON.parse(datos);
    await res.send(coursesTransactional).status(200);
    return;
  } catch (error) {
    console.log("Este es el error....:", error);
  }
};

const getCourseTransactional = async (req, res) => {
  let id = parseInt(req.params.id);
  try {
    const datos = await fs.readFile(coursesTransactionalFile, "utf-8");
    const coursesTransactional = JSON.parse(datos);
    console.log('coursesTransactional ', coursesTransactional)
    const courseTransactional = coursesTransactional.find((fila) => fila.id === id);
    console.log('courseTransactional ', courseTransactional)
    return res
      .status(200)
      .json({ courseTransactional, message: "Consulta Exitosa", exito: true });
  } catch (error) {
    console.log("Error en consilta...", error);
  }
};

const AddCourseTransactional = async (req, res) => {
  let nuevoCourseTransactional = {
    id: parseInt(req.body.id),
    courseCode: req.body.courseCode,
    studentDni: req.body.studentDni,
    teacherDni: req.body.teacherDni,
    courseStarts: req.body.courseStarts,
    courseEnds: req.body.courseEnds,
  };
  try {
    const datos = await fs.readFile(coursesTransactionalFile, "utf-8");
    const coursesTransactional = JSON.parse(datos);
    const id = getNextId(coursesTransactional);
    nuevoCourseTransactional.id = id;
    coursesTransactional.push(nuevoCourseTransactional);
    await fs.writeFile(coursesTransactionalFile, JSON.stringify(coursesTransactional));
    return res
      .status(201)
      .send({ message: "Registro agregado con éxito", exito: true });
  } catch (error) {
    console.log(error);
  }
};

const deleteCourseTransactional = async (req, res) => {
  let id = parseInt(req.params.id);
  try {
    const datos = await fs.readFile(coursesTransactionalFile, "utf-8");
    const coursesTransactional = JSON.parse(datos);
    const index = coursesTransactional.findIndex((item) => item.id === id);
    if (index >= 0) {
      coursesTransactional.splice(index, 1)
      await fs.writeFile(coursesTransactionalFile, JSON.stringify(coursesTransactional));
    }
    return res
      .status(200)
      .send({ message: "Registro eliminado con éxito", exito: true });
  } catch (error) {
    console.log(error);
  }
};

const updateCourseTransaction = async (req, res) => {
  let id = parseInt(req.params.id);
  let nuevoDato = {
    id: parseInt(req.body.id),
    courseCode: req.body.courseCode,
    studentDni: req.body.studentDni,
    teacherDni: req.body.teacherDni,
    courseStarts: req.body.courseStarts,
    courseEnds: req.body.courseEnds,
  };
  try {
    //   const nueDato = req.body;
    const datos = await fs.readFile(coursesTransactionalFile, "utf-8");
    const courses = JSON.parse(datos);
    const index = courses.findIndex((item) => item.id === id);
    if (index >= 0) {
      courses[index] = nuevoDato;
      await fs.writeFile(coursesTransactionalFile, JSON.stringify(courses));
    }
    return res
      .status(200)
      .json({ message: "Registro Actualizado", exito: true });
  } catch (error) {
    console.log(error);
  }
};

//* *************************************************************** *//
//       se genera ID en funcion a los regisatro del archivo         //
//* *************************************************************** *//

function getNextId(data) {
  if (data.length === 0) {
    return 1;
  }
  const maxId = Math.max(...data.map((item) => item.id));
  return maxId + 1;
}

module.exports = {
  getCoursesTransactional,
  getCourseTransactional,
  AddCourseTransactional,
  deleteCourseTransactional,
  updateCourseTransaction,
};
