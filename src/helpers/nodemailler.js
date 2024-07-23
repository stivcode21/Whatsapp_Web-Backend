const nodemailler = require("nodemailer")

//? Metodo que te retorna el transportardor del mensaje
const config_mailler = () => {
    const transporter = nodemailler.createTransport({
        host: process.env.HOST_PROVEDOR,
        port: process.env.PORT_PROVEDOR,
        secure: true,
        auth: {
            user: process.env.EMAIL_PROVEDOR,
            pass: process.env.PASSWORD_PROVEDOR
        }

    })
    return transporter
}

module.exports = { config_mailler }