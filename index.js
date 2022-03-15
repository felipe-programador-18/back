const express= require('express')
const api = express()
const port = process.env.Port || 3000
const path = require('path')
const User = require('./models/user')
const session = require('express-session')
const bodyParser = require('body-parser')

const mongo = process.env.MONGODB || 'mongodb://localhost/catalogo'
const mongoose= require('mongoose')
mongoose.Promise = global.Promise 


const produtos = require('./routes/produtos')
const home = require('./routes/home')


api.use(session({secret:"testando se esta logado"}))

api.set('views', path.join(__dirname, 'views'))
api.set('view engine','ejs')
api.use(express.static(path.join( __dirname ,'views')))

api.use(bodyParser.urlencoded({extended:true}))


api.get('/', (req, res) =>{res.render('home')})

api.use('/produtos',produtos)
api.get('/produtos',(req,res, next ) => { 
  if('user' in session){
    return next()  
  }
  res.redirect('/login')
  
})

api.use('/login', home)
api.get('/login', (req, res) =>{res.render('login')})
api.post('/login', async(req,res) => {
    const user = await User.findOne({username: req.body.username}) 
    //const isValed = await user.checkPassword(req.body.password)
    res.send(user)
       //isValed
        
   })



const CreateInitialuser =  async() => {
    const total = await User.count({username:'felipe programmer'})
    if(total === 0){
        const user = new User ({
            username:'felipe programmer',
            email:'machadofelipe2016@outlook.com',
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



