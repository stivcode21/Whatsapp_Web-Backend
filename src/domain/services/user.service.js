const { User } = require("../models/user.model");

class ServiceUser {
    /**
     * @param {*} data ->  email, name, password, image, status
     * @returns {*} User
     */
    async create(data_create) {
        let user = await User.create({
        })

        return user
    }

    async update(data_update){
    }
}