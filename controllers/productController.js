const Product = require('../models/productModel')

const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find()
        // console.log(products)
        res.json(products)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

const getProductById = async (req, res) => {
    try {
        const { id } = req.params
        const product = await Product.findById(id)
        if (!product) {
            return res.status(404).json({error: 'Product not found'})
        }
        res.json(product)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

const addProduct = async (req, res) => {
    try {
        const product = await Product.create(req.body)
        // console.log("Created product:", product)
        res.status(201).json(product)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

const updateProduct = async(req, res) => {
    try {
        const { id } = req.params
        // const { name, quantity, price, image } = req.body
        const updatedProduct = await Product.findByIdAndUpdate(
            id,
            req.body,
            { new: true, runValidators: true }
        )
        /*
        const updatedProduct = await Product.findByIdAndUpdate(
            id,
            { $set: {name, quantity, price, image} },
            { new: true, runValidators: true }
        )
        */
        if (!updatedProduct) {
            return res.status(404).json({error: 'Product not found'})
        }
        res.json(updatedProduct)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params
        const deletedProduct = await Product.findByIdAndDelete({ _id: id })
        if (!deletedProduct) {
            return res.status(404).json({error: 'Product not found'})
        }
        res.json({message: 'Product deleted successfully', deletedProduct})
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

module.exports = {
    getAllProducts,
    getProductById,
    addProduct,
    updateProduct,
    deleteProduct
}