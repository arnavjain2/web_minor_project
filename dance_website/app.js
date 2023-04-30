const express = require('express');
const path = require('path');
const app = express();
const mongoose = require('mongoose');
const port = 800;



mongoose.set('strictQuery', false);
main().catch(err => console.log(err));
async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/contactdance');
}

const ContactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email : String,
    address : String,
    desc: String
  });

  const contact = mongoose.model('contact', ContactSchema);


app.use(express.static(path.join(__dirname,'static')))
app.use(express.urlencoded({extended: true})); 
app.use(express.json()); 

app.set('view engine', 'pug')
app.set('views', path.join(__dirname,'views'))


app.get('/' , (req,res)=>{
    params = { }
    res.status(200).render('home.pug',params)
})

app.get('/about' , (req,res)=>{
    params = { }
    res.status(200).render('about.pug',params)
})

app.get('/contact' , (req,res)=>{
    params = { }
    res.status(200).render('contact.pug',params)
})

app.post('/contact' , (req,res)=>{
    var newdata = new contact(req.body)
    newdata.save().then(()=>{
        res.send('added to database')
    });
    res.status(200).render('contact.pug',params)
})
app.get('/services' , (req,res)=>{
    params = { }
    res.status(200).render('services.pug',params)
})



// start server 
app.listen(port ,()=>{
    console.log(`the application is running on port ${port}`)
})
