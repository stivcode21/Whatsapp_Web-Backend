import User from "./user.model.js";
import Contacts from "./contacts.model.js";
import Chats from "./chats.models.js";
import Messages from "./messages.model.js";

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

User.hasMany(Messages, {
  foreignKey: "user_id",
  as: "user_messages",
});

Chats.hasMany(Messages, {
  foreignKey: "chat_id",
  as: "chat_messages",
});

Messages.belongsTo(User, {
  foreignKey: "user_id",
  as: "user_messages",
});
Messages.belongsTo(Messages, {
  foreignKey: "chat_id",
  as: "chat_messages",
});

export { User, Contacts, Chats, Messages };

/*
  Model.sync() //Crear la tabla, si ya existe no le hace nada
  Model.sync({ alternate: true }) // Si ya existe, le agrega lo que le falte
  Model.sync({ force: true }) // La elimixna y la vuelve a crear
*/
