const User = require("../models/User")

const createService = (body) => User.create(body)

const deleteService = async (email) => await User.findOneAndDelete({ email })

const findAllService = () => User.find()

const findByIdService = (id) =>User.findById(id)

const updateUserByEmail = async (email, nome, username, password) => await User.findOneAndUpdate(
    { email: email },
    { nome: nome,
      username:username,
      password: password
    },
    {new:true}
  );


module.exports = {
    createService,
    findAllService,
    findByIdService,
    deleteService,
    updateUserByEmail
}