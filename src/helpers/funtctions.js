const generate_token = (time) => {
    let code_verify = ""
    for (let index = 0; index < time; index++) {
        let number_random = Math.floor(Math.random() * 10).toString()
        code_verify += number_random;
    }

    return code_verify;
}

module.exports = { 
    generate_token
}