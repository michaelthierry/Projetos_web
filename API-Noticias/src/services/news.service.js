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

// Exporta todas as funções
export { createService, findAllService, countNews, topNewsService, findByIdService, searchByTitleService};
