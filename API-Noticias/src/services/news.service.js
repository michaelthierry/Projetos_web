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
    };
