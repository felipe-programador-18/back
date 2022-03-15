const express= require('express')
const api = express()
const port = process.env.Port || 3000
const path = require('path')

const session = require('express-session')
const bodyParser = require('body-parser')

const mongo = process.env.MONGODB || 'mongodb://localhost/catalogo'
const mongoose= require('mongoose')
mongoose.Promise = global.Promise 
//const User = require('./models/user')

const produtos = require('./routes/produtos')
const login = require('./routes/login')


api.use(session({secret:"testando se esta logado"}))

api.set('views', path.join(__dirname, 'views'))
api.set('view engine','ejs')
api.use(express.static(path.join( __dirname ,'views')))
api.use(bodyParser.urlencoded({extended:true}))


api.get('/', (req, res) =>{res.render('home')})
api.get('/produtos',(req,res, next ) => { 
  res.redirect('/')
  if('user' in session){
    return next()  
  }
  res.render('produtos')
})

const User = require('./models/user')
api.post('/login', async (req,res) => {
 const user = await User.findOne({
     username : req.body.username
 }) 
 res.send(user)
})
api.get('/login', (req, res) =>{res.render('login')})
api.get('/login',(req,res ) => { 
    //res.redirect('/')
    //if('user' in session){
     // return next()  
   // }
    res.render('login')
  })

api.use('/login', login)
api.use('/produtos',produtos)

const CreateInitialuser =  async() => {
    const total = await User.count({username:'felipe programmer'})
    if(total === 0){
        const user = new User ({
            username:'felipe programmer',
            email:'machadofeipe2015@outlook.com.br',
            password:'432423marrtints',
        })
       await user.save()
       console.log('user created')
    }else{
        console.log('user created shiped')
    }
}


mongoose.connect(mongo,{useNewUrlParser: true,
useUnifiedTopology: true })
.then(() => {
    CreateInitialuser()
    api.listen(port, () => console.log('listing port: '+ port))   
})
.catch(e => console.log(e))



