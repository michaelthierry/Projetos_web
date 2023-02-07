// Todas as importações dos serviços de news
import { createService, 
    findAllService, 
    countNews, 
    topNewsService, 
    findByIdService, 
    searchByTitleService, 
    byUserService, 
    updateService, 
    eraseService, 
    likeNewsService,
    deleteLikeNewsService,
    addComentService,
    deleteComentService
} from "../services/news.service.js"

const create = async (req, res) => {
    try {
        const { title, text } = req.body;

        if (!title || !text) {
            res.status(400).send({ message: "Submeta todos os campos para registrar" });
        }

        await createService({
            title,
            text,
            user: req.userId
        })
        res.send(201);

    } catch (err) {
        res.status(500).send({ message: err.message });
    }


}

const findAll = async (req, res) => {

    try {

        let { limit, offset } = req.query;

        limit = Number(limit);
        offset = Number(offset);

        if (!limit) {
            limit = 5;
        }

        if (!offset) {
            offset = 0;
        }

        const news = await findAllService(offset, limit);
        const total = await countNews();
        const currentURL = req.baseUrl;
        console.log(currentURL);

        console.log(total);

        const next = offset + limit;

        const nextUrl = next < total ? `${currentURL}?limit=${limit}&offset=${next}` : null;

        const previous = offset - limit < 0 ? null : offset - limit;
        const previousUrl = previous != null ? `${currentURL}?limit=${limit}&offset=${previous}` : null;

        if (news.length === 0) {
            return res.status(400).send({ message: "Não há noticias registradas!" });
        }

        //news.map(item => console.log(JSON.stringify(item, null, 4)));

        res.send({
            nextUrl,
            previousUrl,
            limit,
            offset,
            total,
            results: news.map(item => ({
                id: item._id,
                title: item.title,
                text: item.text,
                likes: item.likes,
                comments: item.comments,
                name: item.user.nome,
                username: item.user.username
            })),
        });
    } catch (err) {
        res.status(500).send({ message: err.message })
    }
}

const topNews = async (req, res) => {
    try {
        const news = await topNewsService();
        if (!news) {
            return res.status(400).send({ message: "Não há post resgistrados!" });
        }
        res.send({
            news: {
                id: news._id,
                title: news.title,
                text: news.text,
                likes: news.likes,
                comments: news.comments,
                name: news.user.nome,
                username: news.user.username
            }
        })
    } catch (err) {
        res.status(500).send({ message: err.message })
    }

}

/**
 * Encontra uma noticia no banco de dados por meio de um id passado
 * pela requisição
 * @param {*} req requisição passada
 * @param {*} res resposta obtida
 */
const findById = async (req, res) =>{
    //tenta encontra a noticia 
    try {
        // pega o id passado pela requisição
        const {id} = req.params;
        // busca a noticia
        const news = await findByIdService(id);
        // Retorna a noticia se encontrada
        return res.send({
            news: {
                id: news._id,
                title: news.title,
                text: news.text,
                likes: news.likes,
                comments: news.comments,
                name: news.user.nome,
                username: news.user.username
            }
        })        
    } catch (err) {
        //caso dê erro 
        res.status(500).send({ message: err.message });
    }
}

/**
 * Encontra todos as noticias de acordo com o titulo passado 
 * @param {*} req requisição com o titulo
 * @param {*} res resposta da consulta
 */
const searchByTitle = async (req, res) => {
    // tenta encontra as noticias
    try {
        // Pega o titulo
        const {title} = req.query;
        // faz a busca no banco
        const news = await searchByTitleService(title);
        // caso não encontre nada
        if(news.length === 0){
            // mensagem de bad request
            return res.status(400).send({message: "Não há notícias com esse titulo"});
        }
        //caso dê certo
        return res.send({
            results: news.map(item => ({
                id: item._id,
                title: item.title,
                text: item.text,
                likes: item.likes,
                comments: item.comments,
                name: item.user.nome,
                username: item.user.username
            }))
        })
        
    } catch (err) {
        // caso dê erro 
        res.status(500).send({ message: err.message });
    }
}

/**
 * Encontra todas as noticias de um usuario especifico
 * @param {*} req requisição passada
 * @param {*} res resposta obtida
 */
const byUser = async (req, res) => {
    //tenta encontrar as noticias
    try {
        // pega o id do usuario logado
        const id = req.userId;
        // faz a busca no banco de dados
        const news = await byUserService(id);
        //mostra os dados obtidos
        return res.send({
            results: news.map(item => ({
                id: item._id,
                title: item.title,
                text: item.text,
                likes: item.likes,
                comments: item.comments,
                name: item.user.nome,
                username: item.user.username
            }))
        });
        
    } catch (err) {
        // caso dê erro 
        res.status(500).send({ message: err.message });
    }
};

/**
 * Atualiza uma noticia do usuario
 * @param {*} req 
 * @param {*} res 
 */
const update = async (req, res) => {
    // tenta atualizar uma  noticia
    try {
        //Pega o titulo e o texto da requisição
        const {title, text} = req.body;
        //Pega o id da noticia a ser atualizada
        const {id} = req.params;
        //Testa os dados do body
        if (!title && !text){
            res.status(400).send({message: "Submeta algum campo para atualizar"});
        }
        // Encontrando a news no banco
        const news = await findByIdService(id);
        //confere se a noticia é mesmo do usuario
        if (news.user._id != req.userId){
            return res.status(400).send({message: "Você não pode atualizar essa noticias!"});
        }
        //Atualiza a noticia
        await updateService(id, title, text);
        //Mensagem de sucesso
        return res.send({message: "Noticia atualizada com sucesso!"})
        
    } catch (err) {
        // caso dê erro 
        res.status(500).send({ message: err.message });
    }
};

/**
 * Apaga uma noticia de um usuario 
 * @param {*} req 
 * @param {*} res 
 */
const erase = async (req, res) => {
    // tenta apagar a noticia
    try {
        //Pega o id da noticia a ser apagada
        const {id} = req.params;
        // Encontrando a news no banco
        const news = await findByIdService(id);
        //confere se a noticia é mesmo do usuario
        if (news.user._id != req.userId){
            return res.status(400).send({message: "Você não pode apagar essa noticias!"});
        }
        //Apaga a noticia
        await eraseService(id);
        //Retorna uma mesagem de sucesso
        return res.send({message: "Noticia apagada com sucesso!"})
    } catch (err) {
        // caso dê erro 
        res.status(500).send({ message: err.message });
    }
};

/**
 * Adiciona ou remover um like dado pelo usuario
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const likeNews = async (req, res) => {
    // Tenta dar like na noticia
    try {
        // Pega o id da noticia
        const {id} = req.params;
        // Pega o id do usuario que esta dando o like
        const userId = req.userId;
        // adicionando o like a noticia 
        const  newsLiked = await likeNewsService(id, userId);

        if (!newsLiked){
            await deleteLikeNewsService(id, userId);
            return res.status(200).send({message: "Like removido"})
        }

        console.log(newsLiked);

        res.send({message: "Like adicionado"})
        
    } catch (err) {
        // caso dê erro 
        res.status(500).send({ message: err.message });
    }
};

/**
 * Adiciona um comentario em uma news
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const addComent = async (req, res) => {
    try {
        //Id da postagem
        const {id} = req.params;
        //id do usuario
        const userId = req. userId;
        //Comentario feito
        const {comment} = req.body;

        //se não houver comentario
        if(!comment){
            return res.status(400).send({message: "Escreva alguma comentario!"});
        }
        //espera o serviço ao banco
        await addComentService(id, comment, userId);
        // resposta de coemntario adicionado
        res.send({message: "Comentario adicionado com sucesso!"});

    } catch (err) {
        // caso dê erro 
        res.status(500).send({ message: err.message });
    }
};
/**
 * Deleta um comentario feito pelo o usuario
 * @param {*} req 
 * @param {*} res 
 */
const deleteComent = async (req, res) => {
    try {
        //Id da postagem e id do comentario
        const {idNews, idComent} = req.params;
        //id do usuario
        const userId = req.userId;
        
        //espera o serviço ao banco
        const deletedComent = await deleteComentService(idNews, idComent, userId);
        
        //Encontro o comentario 
        const findComent = deletedComent.comments.find(
            (comment) => comment.idComent == idComent
        );
        
        //se o comentario não encontrado
        if(!findComent){
            return res.status(404).send({message: "Comentario não encontrado!"});
        }
        //se o usuario não for o dono do comentario
        if(findComent.userId !== userId){
            return res.status(400).send({message: "Voce não pode deletar esse comentario"});
        }

        // resposta de coemntario adicionado
        res.send({message: "Comentario removido com sucesso!"});

    } catch (err) {
        // caso dê erro 
        res.status(500).send({ message: err.message });
    }
}
// Exportando as funções
export {
    create,
    findAll,
    topNews,
    findById,
    searchByTitle, 
    byUser,
    update,
    erase, 
    likeNews,
    addComent,
    deleteComent 
}