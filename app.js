const express = require("express")
const { MongoClient } = require("mongodb")
const authRouter = require("./routes/authRoute")
const productRouter = require("./routes/productRoute")
const authenticationMiddleware = require("./middleware/authenticationMiddleware")

const app = express()

app.use(express.json())

app.use(async (req, res, next) => {
    let db
    try {
        const client = await new MongoClient(
            "mongodb+srv://najmy:Smandak12@cluster0.xxlfbbe.mongodb.net").connect()
        db = client.db("milestone")
    }catch (error) {
        console.log(error);
        return res.status(404).json({ error: "Database connection error" })
    }
    req.db = db

    next()
})

app.get("/", (req, res) => {
    res.send("Milestone app")
})

app.use("/auth", authRouter)
app.use("/product", authenticationMiddleware, productRouter)

const port = 4004

app.listen(port, () => {
    console.log(`this app running on port http://localhost:${port}`);
})