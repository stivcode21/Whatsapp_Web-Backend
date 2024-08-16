import User from "./user.model.js";
import Contacts from "./contacts.model.js";
import Chats from "./chats.models.js";
import Messages from "./messages.model.js";
import Status from "./status.model.js";

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
Messages.belongsTo(Chats, {
  foreignKey: "chat_id",
  as: "chat_messages",
});

User.hasMany(Status, {
  foreignKey: "user_id",
  as: "user)status",
});

Status.belongsTo(User, {
  foreignKey: "user_id",
  as: "user)status",
});

export { User, Contacts, Chats, Messages, Status };

/*
  Model.sync() //Crear la tabla, si ya existe no le hace nada
  Model.sync({ alternate: true }) // Si ya existe, le agrega lo que le falte
  Model.sync({ force: true }) // La elimixna y la vuelve a crear
*/
