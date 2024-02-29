const fs = require("fs").promises;
const coursesFile = "src/json/courses.json";

//* *************************************************************** *//
//       definición de rutas  de acceso a archivo contacts           //
//* *************************************************************** *//

const getCourses = async (req, res) => {
  try {
    const datos = await fs.readFile(coursesFile, "utf-8");
    const courses = JSON.parse(datos);
    await res.send(courses).status(200);
    return;
  } catch (error) {
    console.log("Este es el error....:", error);
  }
};

const getCourse = async (req, res) => {
  let id = parseInt(req.params.id);
  try {
    const datos = await fs.readFile(coursesFile, "utf-8");
    const courses = JSON.parse(datos);
    const course = courses.find((fila) => fila.courseCode === id);
    return res
      .status(200)
      .json({ course, message: "Consulta Exitosa", exito: true });
  } catch (error) {
    console.log("Error en consilta...", error);
  }
};

const AddCourse = async (req, res) => {
  let nuevoCurso = {
    courseName: req.body.courseName,
    courseDescription: req.body.courseDescription,
    courseCost: req.body.courseCost,
    courseStatus: req.body.courseStatus,
  };
  try {
    const datos = await fs.readFile(coursesFile, "utf-8");
    const courses = JSON.parse(datos);
    const id = getNextId(courses);
    nuevoCurso.courseCode = id;
    courses.push(nuevoCurso);
    await fs.writeFile(coursesFile, JSON.stringify(courses));
    return res
      .status(201)
      .send({ message: "Registro agregado con éxito", exito: true });
  } catch (error) {
    console.log(error);
  }
};

const deleteCourse = async (req, res) => {
  let id = parseInt(req.params.id);
  try {
    const datos = await fs.readFile(coursesFile, "utf-8");
    const courses = JSON.parse(datos);
    const index = courses.findIndex((course) => course.courseCode === id); // si no se cumple queda en -1
    if (index >= 0) {
      courses.splice(index, 1);
      await fs.writeFile(coursesFile, JSON.stringify(courses));
    }
    return res
      .status(200)
      .send({ message: "Registro eliminado con éxito", exito: true });
  } catch (error) {
    console.log(error);
  }
};

const updateCourse = async (req, res) => {
  let id = parseInt(req.params.id);
  let nuevoDato = {
    courseCode: parseInt(id),
    courseName: req.body.courseName,
    courseDescription: req.body.courseDescription,
    courseCost: req.body.courseCost,
    courseStatus: req.body.courseStatus,
  };
  try {
    const datos = await fs.readFile(coursesFile, "utf-8");
    console.log('datos: ', datos)
    const courses = JSON.parse(datos);
    console.log('courses: ', courses)
    const index = courses.findIndex((item) => item.courseCode === id);
    if (index >= 0) {
      courses[index] = nuevoDato;
      console.log('courses: ', courses)
      await fs.writeFile(coursesFile, JSON.stringify(courses));
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
  const maxId = Math.max(...data.map((item) => item.courseCode));
  return maxId + 1;
}

module.exports = {
  getCourses,
  getCourse,
  AddCourse,
  deleteCourse,
  updateCourse,
};
