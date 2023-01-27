// Todas as importações dos serviços de news
import { createService, findAllService, countNews, topNewsService, findByIdService } from "../services/news.service.js"

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

// Exportando as funções
export {
    create,
    findAll,
    topNews,
    findById
}