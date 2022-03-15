const mongoose = require('mongoose')

const Product = new mongoose.Schema({
    title: String,
    descricao: String,
    numero: Number,
    categoria: String
})

const Produto = mongoose.model('Produto', Product)
module.exports = Produto