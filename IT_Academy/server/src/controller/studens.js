const fs = require("fs").promises;
const studentsFile = "src/json/students.json";

//* *************************************************************** *//
//       definición de rutas  de acceso a archivo Students           //
//* *************************************************************** *//

const getStudents = async (req, res) => {
  try {
    const datos = await fs.readFile(studentsFile, "utf-8");
    const students = JSON.parse(datos);
    setTimeout(() => {
      res.send(students).status(200);
    }, 3000);
    //  await res.send(students).status(200);
    return;
  } catch (error) {
    console.log("Este es el error....:", error);
  }
};

const getStudent = async (req, res) => {
  let id = parseInt(req.params.id);
  try {
    const datos = await fs.readFile(studentsFile, "utf-8");
    const students = JSON.parse(datos);
    const student = students.find((student) => student.id === id);
    return res
      .status(200)
      .json({ student, message: "Consulta Exitosa", exito: true });
  } catch (error) {
    console.log("Error en consilta...", error);
  }
};

const getStudentDni = async (req, res) => {
  let dni = parseInt(req.params.dni);
  try {
    const datos = await fs.readFile(studentsFile, "utf-8");
    const students = JSON.parse(datos);
    const student = students.find((student) => student.dni == dni);
    let messageResult = "";
    let status = false;
    if (student === undefined) {
      messageResult = "El Dni ingresado no existe";
      status = false;
    } else {
      messageResult = "Consulta Exitosa";
      status = true;
    }
    return res
      .status(200)
      .json({ student, message: messageResult, exito: status });
  } catch (error) {
    console.log("Error en consilta...", error);
  }
};

const AddStudent = async (req, res) => {
  let nuevoStudento = {
    id: parseInt(req.body.id),
    dni: req.body.dni,
    nombre: req.body.nombre,
    apellido: req.body.apellido,
    direccion: req.body.direccion,
    email: req.body.email,
    telefono: req.body.telefono,
    nacionalidad: req.body.nacionalidad,
    nivelEducativo: req.body.nivelEducativo,
    edoCivil: req.body.edoCivil,
    condTermino: req.body.condTermino,
  };

  try {
    const datos = await fs.readFile(studentsFile, "utf-8");
    const students = JSON.parse(datos);
    const student = students.find((student) => student.dni == req.body.dni);
    if (student) {
      return res.status(404).send({
        message: "El Número de documento ingresado, ya está registrado..",
        exito: false,
      });
    }
    let id = getNextId(students);
    nuevoStudento.id = id;
    students.push(nuevoStudento);
    await fs.writeFile(studentsFile, JSON.stringify(students));
    return res
      .status(201)
      .send({ message: "Registro agregado con éxito", exito: true });
  } catch (error) {
    console.log(error);
  }
};

const deleteStudent = async (req, res) => {
  let id = parseInt(req.params.id);
  try {
    const datos = await fs.readFile(studentsFile, "utf-8");
    const students = JSON.parse(datos);
    const index = students.findIndex((item) => item.id === id);
    if (index >= 0) {
      students.splice(index, 1);
      await fs.writeFile(studentsFile, JSON.stringify(students));
    }
    return res
      .status(200)
      .send({ message: "Registro eliminado con éxito", exito: true });
  } catch (error) {
    console.log(error);
  }
};

const updateStudent = async (req, res) => {
  let id = parseInt(req.params.id);
  let nuevoDato = {
    id: parseInt(req.body.id),
    dni: req.body.dni,
    nombre: req.body.nombre,
    apellido: req.body.apellido,
    direccion: req.body.direccion,
    email: req.body.email,
    telefono: req.body.telefono,
    nacionalidad: req.body.nacionalidad,
    nivelEducativo: req.body.nivelEducativo,
    edoCivil: req.body.edoCivil,
    condTermino: req.body.condTermino,
  };
  try {
    //   const nueDato = req.body;
    const datos = await fs.readFile(studentsFile, "utf-8");
    const students = JSON.parse(datos);
    const index = students.findIndex((item) => item.id === id);
    if (index >= 0) {
      students[index] = nuevoDato;
      await fs.writeFile(studentsFile, JSON.stringify(students));
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
  getStudents,
  getStudent,
  getStudentDni,
  AddStudent,
  deleteStudent,
  updateStudent,
};
