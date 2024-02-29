const fs = require("fs").promises;
const contactsFile = "src/json/contactos.json";

//* *************************************************************** *//
//       definición de rutas  de acceso a archivo contacts           //
//* *************************************************************** *//

const getContacts = async (req, res) => {
  try {
    const datos = await fs.readFile(contactsFile, "utf-8");
    const contacts = JSON.parse(datos);
    await res.send(contacts).status(200);
    return;
  } catch (error) {
    console.log("Este es el error....:", error);
  }
};

const getContact = async (req, res) => {
  let id = parseInt(req.params.id);
  try {
    const datos = await fs.readFile(contactsFile, "utf-8");
    const contacts = JSON.parse(datos);
    const item = contacts.find((fila) => fila.id === id);
    return res
      .status(200)
      .json({ contact: item, message: "Consulta Exitosa", exito: true });
  } catch (error) {
    console.log("Error en consilta...", error);
  }
};

const AddContact = async (req, res) => {
  let nuevoContacto = {
    id: parseInt(req.body.id),
    email: req.body.email,
    nombre: req.body.nombre,
    comentario: req.body.comentario,
    telefono: req.body.telefono,
  };
  try {
    const datos = await fs.readFile(contactsFile, "utf-8");
    const contacts = JSON.parse(datos);
    const id = getNextId(contacts);
    nuevoContacto.id = id;
    contacts.push(nuevoContacto);
    console.log(contacts);
    await fs.writeFile(contactsFile, JSON.stringify(contacts));
    return res
      .status(201)
      .send({ message: "Registro agregado con éxito", exito: true });
  } catch (error) {
    console.log(error);
  }
};

const deleteContact = async (req, res) => {
  let id = parseInt(req.params.id);
  try {
    const datos = await fs.readFile(contactsFile, "utf-8");
    const contacts = JSON.parse(datos);
    const index = contacts.findIndex((item) => item.id === id);
    if (index >= 0) {
      contacts.splice(index, 1);
      await fs.writeFile(contactsFile, JSON.stringify(contacts));
    }
    return res
      .status(200)
      .send({ message: "Registro eliminado con éxito", exito: true });
  } catch (error) {
    console.log(error);
  }
};

const updateContact = async (req, res) => {
  let id = parseInt(req.params.id);
  let nuevoDato = {
    id: parseInt(req.body.id),
    email: req.body.email,
    nombre: req.body.nombre,
    comentario: req.body.comentario,
    telefono: req.body.telefono,
  };
  try {
    //   const nueDato = req.body;
    const datos = await fs.readFile(contactsFile, "utf-8");
    const contacts = JSON.parse(datos);
    const index = contacts.findIndex((item) => item.id === id);
    if (index >= 0) {
      contacts[index] = nuevoDato;
      await fs.writeFile(contactsFile, JSON.stringify(contacts));
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
  getContacts,
  getContact,
  AddContact,
  deleteContact,
  updateContact,
};
