import News from '../models/News.js';

const createService = (body) => News.create(body);

const findAllService = (offset, limit) =>
    News.find().sort({ _id: -1 }).skip(offset).limit(limit).populate('user');

const countNews = () => News.countDocuments();

const topNewsService = () => News.findOne().sort({ _id: -1 }).populate('user');

// Encontra a noticia no banco de dados pelo id passado e a retorna.
const findByIdService = (id) => News.findById(id).populate('user');

// Encontra a noticia no banco por meio da titulo passado
const searchByTitleService = (title) => News.find({
    title: {$regex: `${title || ""}`, $options: "i"},

}).sort({ _id: -1 }).populate('user');

// Encontra as noticias de um usuario especifico
const byUserService = (id) => News.find({user: id}).sort({ _id: -1 }).populate('user');

// Atualiza o titulo e o texto de uma noticia do usuario 
const updateService = (id, title, text) => News.findOneAndUpdate({_id: id}, {title, text}, { rawResult: true});

// Apaga uma noticia do banco de dados
const eraseService = (id) => News.findOneAndDelete({_id: id});

// Adiciona um like na noticia passada
const likeNewsService = (idNews, userId ) => News.findOneAndUpdate(
    {_id: idNews, "likes.userId": {$nin: [userId]}}, 
    {$push: {likes: {userId, created: new Date()}}}
);

// deleta um like na noticia passada
const deleteLikeNewsService = (idNews, userId ) => News.findOneAndUpdate(
    {_id: idNews}, 
    {$pull: {likes: {userId}}}
);

//Adiciona um comentario na postagem
const addComentService = (idNews, coment, userId) => {
    //Criando um id para o comentario
    const idComent = Math.floor(Date.now() * Math.random()).toString(36);
    //Adiciona o comentario no vetor de comentarios
    return News.findOneAndUpdate(
        {_id: idNews}, 
        {
            $push: {
                comments: {idComent, userId, coment, createdAt: new Date()},
            },
        }
    );
}

//Remove um comentario feito pelo o usuario
const deleteComentService = (idNews, idComent, userId) => News.findOneAndUpdate(
    {_id: idNews}, 
    {$pull: {comments: {idComent, userId}}}
);

// Exporta todas as funções
export { createService, 
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
    };
