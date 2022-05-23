// import express, express-ejs-layouts, and fs
const express = require('express')
const ejsLayouts = require('express-ejs-layouts')
const methodOverride = require('method-override')

// creating an instance of an express app
const app = express()

// MIDDLEWARE
// tell express that I'm using ejs as the view engine
app.set('view engine', 'ejs')
// tell my app that I'm using ejs layouts
app.use(ejsLayouts)
// body parser middleware
app.use(express.urlencoded({extended: false}))
// allow non GET/POST methods from an HTML 5 form
app.use(methodOverride('_method'))

// controllers
app.use('/dinosaurs', require('./controllers/dinosaurs'))

// HOME ROUTE
app.get('/', (req, res)=>{
    res.render('home.ejs')
})

app.listen(8000, ()=>{
    console.log('cruddy dinos on port 8000')
})