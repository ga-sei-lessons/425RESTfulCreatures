// import express and express-ejs-layouts
const express = require('express')
const ejsLayouts = require('express-ejs-layouts')
// creating an instance of an express app
const app = express()

// MIDDLEWARE
// tell express that I'm using ejs as the view engine
app.set('view engine', 'ejs')
// tell my app that I'm using ejs layouts
app.use(ejsLayouts)

// HOME ROUTE
app.get('/', (req, res)=>{
    res.render('home.ejs')
})

app.listen(8000, ()=>{
    console.log('cruddy dinos on port 8000')
})