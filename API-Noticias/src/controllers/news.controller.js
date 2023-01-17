import {createService, findAllService} from "../services/news.service.js"

const create = async (req, res) => {
    try{
        const {title, text} = req.body;
       
        if(!title || !text){
            req.status(400).send({message: "Submeta todos os campos para registrar"});
        }

        await createService({
            title,
            text,
            user: req.userId
        })
        res.send(201);

    }catch(err){
        res.status(500).send({message: err.message});
    }

   
}

const findAll = async (req, res) => {
    
    try{
        const news = await findAllService();
        if(news.length === 0){
            return res.status(400).send({message: "Não há noticias registradas!"});
        }
        res.send(news)
    }catch(err){
        res.status(500).send({message: err.message})
    }
}


export {
    create,
    findAll
}