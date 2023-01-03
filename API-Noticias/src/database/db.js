//Importando o mongoose
import mongoose from 'mongoose';
//função de conexão com a base de dados 

const connectDatabase = () =>{
    //Mensagem para prompt
    console.log("Espere... estamos conectando ao banco")
    //Tenta conectar ao banco
    mongoose.connect("mongodb+srv://michaelthierry:m1ch43l_TH@cluster0.u2xwqfd.mongodb.net/?retryWrites=true&w=majority", {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        //Mensagem caso de certo
        console.log("Mongo DB Atlas conectado!")
    })
    .catch((error)=>{
        //Mensagem caso de errado
        console.log("Erro:", error)
    })
}
//Exportando a função de conexão
export default connectDatabase