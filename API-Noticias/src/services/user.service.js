import User from "../models/User.js";

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


export default {
    createService,
    findAllService,
    findByIdService,
    deleteService,
    updateUserByEmail
}