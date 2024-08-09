import User from "./user.model.js";
import Contacts from "./contacts.model.js";

User.hasMany(Contacts)
Contacts.belongsTo(User)

export { User, Contacts }

/*
  Model.sync() //Crear la tabla, si ya existe no le hace nada
  Model.sync({ alternate: true }) // Si ya existe, le agrega lo que le falte
  Model.sync({ force: true }) // La elimixna y la vuelve a crear
*/