const generate_token = (time) => {
    let code_verify = ""
    for (let index = 0; index < time; index++) {
        let number_random = Math.floor(Math.random() * 10).toString()
        code_verify += number_random;
    }

    return code_verify;
}

export async function formatUser(user) {
    return {
        id: user.id,
        email: user.email,
        name: user.name,
        image: user.image,
        description: user.description,
        isNew: user.isNew
    }
}