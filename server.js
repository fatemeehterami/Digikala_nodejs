const express = require('express')
const app = express()
const Joi = require('joi')
const {Pool} = require(pg)
const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('./swagger.json')

const dbConfig = {
    user: 'postgres',
    host: 'localhost',
    database: 'Digikala',
    password: '123admin',
    port: 5432
}

const pool = new Pool(dbConfig)

app.use(express.json())
app.use('/api-digikala' , swaggerUi.serve  ,swaggerUi.setup(swaggerDocument))

app.use('/register', async (req,res) => {
    const {mobile} = req.body
    
    const schema = Joi.object({
        mobile : Joi.string().pattern(/^[01-9]{10}$/).required()
    })
    
    const {error} = schema.validate({mobile})
    if (error) return res.status(400).send(error.details[0].message)

    const code = Math.floor(100000 + Math.random() * 900000)
    console.log(`کد ارسال شده: ${code}`);
})