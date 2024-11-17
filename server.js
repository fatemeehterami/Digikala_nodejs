const express = require('express')
const pool = require('./app/config/db')
const app = express()

app.use(express())


pool.connect().then(()=>{
    console.log('connect')
})


app.listen(3000,()=>{
    console.log('connect')
})




























// let generatedCode = null;

// const dbConfig = {
//     user: 'postgres',
//     host: 'localhost',
//     database: 'Digikala',
//     password: '123admin',
//     port: 5432
// }

// const pool = new Pool(dbConfig)

// app.use(express.json())
// app.use('/api-digikala' , swaggerUi.serve  ,swaggerUi.setup(swaggerDocument))

// app.use('/register', async (req,res) => {
//     const {mobile} = req.body
    
//     const schema = Joi.object({
//         mobile : Joi.string().pattern(/^[01-9]{10}$/).required()
//     })
    
//     const {error} = schema.validate({mobile})
//     if (error) return res.status(400).send(error.details[0].message)

//     generatedCode = Math.floor(100000 + Math.random() * 900000)
//     console.log(`کد ارسال شده به موبایل ${mobile}: ${code}`);
//     try{
//         await pool.query('INSERT INTO users(mobile) VALUES($1)',[mobile])
//         res.status(200).send('کد به شماره موبایل ارسالش شد.')
//     }catch(err){
//         console.error(err)
//         res.status(500).send('خطا در ارسال کد')
//     }
// })

// app.use('/login', async (req,res) => {
//     const {mobile, code} = req.body;
//     const schema = Joi.object({
//         mobile: Joi.string().pattern(/^[01-9]{10}$/).required(),
//         code : Joi.number().required()
//     })
//     const {error} = schema.validate({mobile, code})
//     if(error) return res.status(400).send(error.details[0].message)

//     if(code !== generatedCode){
//         return res.status(400).send('کد اشتباه است')
//     }
//     res.status(200).send('ورود موفقیت‌آمیز');
// })