/*Criando uma função de soma */
const soma = (req, res) => {
    const soma = 100 + 1
    res.send({soma:soma})
}

/*Exporntando a função */
module.exports = {soma}