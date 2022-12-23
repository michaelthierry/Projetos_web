const mongoose = require('mongoose')
const connectDatabase = () =>{
    console.log("Espere... estamos conectando ao banco")

    mongoose.connect("mongodb+srv://michaelthierry:m1ch43l_TH@cluster0.u2xwqfd.mongodb.net/?retryWrites=true&w=majority", {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log("Mongo DB Atlas conectado!")
    })
    .catch((error)=>{
        console.log("Erro:", error)
    })
}

module.exports = connectDatabase