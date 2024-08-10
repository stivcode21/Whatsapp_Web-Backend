import User from "./user.model.js";
import Contacts from "./contacts.model.js";
import Chats from "./chats.models.js";

User.hasMany(Contacts);
Contacts.belongsTo(User);

User.hasMany(Chats, {
  foreignKey: "user1_id",
  as: "user1_chats",
});

User.hasMany(Chats, {
  foreignKey: "user2_id",
  as: "user2_chats",
});

Chats.belongsTo(User, {
  foreignKey: "user1_id",
  as: "user1",
});

Chats.belongsTo(User, {
  foreignKey: "user2_id",
  as: "user2",
});

export { User, Contacts, Chats };

/*
  Model.sync() //Crear la tabla, si ya existe no le hace nada
  Model.sync({ alternate: true }) // Si ya existe, le agrega lo que le falte
  Model.sync({ force: true }) // La elimixna y la vuelve a crear
*/
