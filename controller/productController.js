const { ObjectId } = require("mongodb")

async function createProduct(req, res) {
    const { productName, quantity } = req.body

    try {
        if (!productName) {
            throw new Error("Product name can not be blank");
        }
        const product = await req.db.collection("product").findOne({ productName })
        if (product) {
            throw new Error("Product is already exist")
        }

        const newProduct = await req.db.collection("product").insertOne({productName, quantity})
        res.status(200).json({
            message: "your product is successfully created",
            data: newProduct 
        })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

async function getAllProduct(req, res) {
    const allProduct = await req.db.collection("product").find({ is_deleted: { $exists: false }}).toArray()

    res.status(200).json({
        message: "you get the whole product data",
        message: allProduct
    })
}

async function getProductById(req, res) {
    const id = req.params.id

    try {
        const product = await req.db.collection("product").findOne({ _id: new ObjectId(id), is_deleted: { $exists: false } })

        if (!product) {
            res.status(404).json({ message: "Product not found" });
            return;
        }
        res.status(200).json({
            message: `you get the product below`,
            data: product
        })
    } catch(error) {
        res.status(400).json({ error: error.message })
    }
}

async function updateProductQuantity(req, res) {
    const id = req.params.id
    const { quantity } = req.body

    try {
        const product = await req.db.collection("product").updateOne(
            { _id: new ObjectId(id)}, {$set: {quantity}})
        
        res.status(200).json({
            message: "updated",
            data: product
        })
    } catch (error) {
        res.status(500).json({
            message: "failed",
            data: error
        })
    }
}

async function deleteProduct(req, res) {
    const { id } = req.params
    const product = await req.db.collection("product").findOneAndUpdate({_id: new ObjectId(id)}, 
    {$set: { is_deleted: true}})

    res.status(200).json({
        message: "product data is deleted"
    })
}

module.exports = {
    createProduct,
    getAllProduct,
    getProductById,
    updateProductQuantity,
    deleteProduct
}