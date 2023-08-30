const dotenv = require("dotenv")

const openApiValidator = require("express-openapi-validator");
const swaggerUi = require("swagger-ui-express");
const yaml = require("yaml");
const fs = require("fs");
const cors = require("cors")

const express = require("express")
const { MongoClient } = require("mongodb")
const authRouter = require("./routes/authRoute")
const productRouter = require("./routes/productRoute")
const authenticationMiddleware = require("./middleware/authenticationMiddleware")

const openApiPath = "./doc/openapi.yaml";
const readApiFile = fs.readFileSync(openApiPath, "utf8");
const swaggerDocs = yaml.parse(readApiFile); 


const app = express()
dotenv.config()

app.use(cors());
app.use(express.json())



app.use(async (req, res, next) => {
    let db
    try {
        const client = await new MongoClient(process.env.MONGODB).connect()
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

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use(
    openApiValidator.middleware({
      apiSpec: openApiPath,
      validateRequests: true,
    })
  ); 

const port = 4004

app.listen(port, () => {
    console.log(`this app running on port http://localhost:${port}`);
})