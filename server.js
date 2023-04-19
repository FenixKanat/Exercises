const path = require('node:path')
const express = require ("express")
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")
require("dotenv").config()
const app = express()
app.set('views', path.join(__dirname, 'view'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended:false}))
app.use(express.json())

var dbEncryption

 
app.get('/', (req,res) => {
    res.render('views')
    var token = jwt.sign("username",process.env.TOKEN)
    //console.log(process.env.TEST)
    console.log(token)
})

app.post('/', async(req,res)=>{
    console.log(req.body)
    if(req.body.encrypt != ''){
        try{
            dbEncryption = await bcrypt.hash(req.body.encrypt,10)

        }catch(error){
            console.log(error)
        }

       
    }

    if(req.body.compare != ''){
        try{
            if(await bcrypt.compare(req.body.compare,dbEncryption)){
                console.log("true")
            }else {
                console.log("false")
            }
        }catch(error){
            console.log(error)
        }
    }

    req.method = 'GET'
    res.redirect("/")
})


/*app.get('/view2', (req, res) =>{
    res.render('view2')
})*/
 
app.listen(8000)