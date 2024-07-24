const { config_mailler } = require("../helpers/nodemailler");
const { body, validationResult } = require("express-validator");
const { generate_token } = require("../helpers/funtctions");
const User = require("../domain/models/user.model");

class UserController {
  validator_body = [
    body("email").notEmpty().isEmail(),
    body("subject").isString(),
    (req, res, next) => {
      try {
        const result = validationResult(req);
        if (result.isEmpty()) {
          return next();
        }
        return result.throw();
      } catch (error) {
        res.status(403);
        res.send({
          errors: error.array(),
        });
      }
    },
  ];

  index(_, response) {
    response.send("database");
  }

  probando(_, response) {
    response.send("Hola mundo desde Node");
  }

  async verify(request, response) {
    const { email, subject } = request.body;

    //TODO Hacer una plantilla de mensaje
    const info = await config_mailler().sendMail({
      from: process.env.EMAIL_PROVEDOR,
      to: email,
      subject,
      text: `Su codigo es ${generate_token(4)}`,
    });

    console.log(generate_token(4));
    return response.send({ email, subject });
  }

  // CREAR MODELO
  async createUser(_, res) {
    try {
      const name = "Juan"
      const lastName = "Ramirez"
      const email = "juan.ramirez@example.com"

      const newUser = new User({ name, lastName, email })
      await newUser.save()
      res.status(201).send("nuevo usuario creado")
    } catch (error) {
      res.status(400).send({ error: "Error al crear el usuario" })
    }
  }

  // VER TODOS LOS USUARIOS
  async getUsers(_, res) {
    try {
      const users = await User.find()
      res.status(200).send(users)
    } catch (error) {
      res.status(500).send({ error: "No se pudo encontrar documentos con respecto a users" })
    }
  }
}

module.exports = UserController;
