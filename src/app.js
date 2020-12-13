const express = require('express');
const mongo = require('mongoose');
const path = require('path')
const hbs = require('hbs')
const schema1 = require('../src/Mongo/schema'); 
require("dotenv").config(); //keep this on top to load all the .env varibles in the project.
require('../src/Mongo/DB.js')
const randomNum = require('../src/Utility/generateRandom')

const app = express();

app.use(express.json());

const pathValue = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../template/views')
const partialsPath = path.join(__dirname,'../template/partials')

app.set('view engine', 'hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(pathValue))

app.get('/home',(req,res)=>{
    res.render('index',{
        companyName :'MINIURL'
    })
})

app.post('/:id',async (req,res)=>{
    const body = req.body;
    try{
        const Numb = randomNum.gR();
        const iurl= body.URL;
        const userdata = new schema1({
            MAINURL:req.body.URL,
            KeyValue:Numb
        })
        await userdata.save();
        res.send({
            newurl: `localhost:1492/${Numb}`
        });
    }
    catch(e){
        res.status(400).send(e);
    }

})
app.get('/:URL',async (req,res)=>{
    const URL = req.params.URL;
    
    try{
        const data = await schema1.CheckTheCode(URL);
        console.log(data)
        res.status(301).redirect(data.MAINURL)
    }catch(e){
        res.status(400).send(e);
    }
    //res.send("find the url and redirect to that page");
})

const PORT = process.env.PORT ;
app.listen(PORT,()=>{
    console.log(`URL-PROJECT IS UP ON ${PORT}`);
})