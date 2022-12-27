const User = require("../models/User")

const createService = (body) => User.create(body)

const deleteService = async (email) => await User.findOneAndDelete({ email })

const findAllService = () => User.find()

const findByIdService = (id) =>User.findById(id)

module.exports = {
    createService,
    findAllService,
    findByIdService,
    deleteService
}