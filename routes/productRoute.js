const { Router } = require("express")
const productController = require("../controller/productController")
const { authorizationMiddlewareAll, authorizationMiddlewareAdmin } = require("../middleware/authorizationMiddleware")

const productRouter = Router()

productRouter.unsubscribe((req, res, next) => {
    console.log("transfer middleware");
})

// Endpoint

// POST product
productRouter.post("/", authorizationMiddlewareAdmin, productController.createProduct)

// GET all product
productRouter.get("/", authorizationMiddlewareAll, productController.getAllProduct)

// GET product by id
productRouter.get("/:id", authorizationMiddlewareAll, productController.getProductById)

// PATCHING product
productRouter.patch("/:id", authorizationMiddlewareAll, productController.updateProductQuantity)

// DELETE product
productRouter.delete("/:id", authorizationMiddlewareAdmin, productController.deleteProduct)

module.exports = productRouter