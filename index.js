// import express, express-ejs-layouts, and fs
const express = require('express')
const ejsLayouts = require('express-ejs-layouts')
const fs = require('fs')
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

// INDEX ROUTE
app.get('/dinosaurs', (req, res)=>{
    let dinosaurs = fs.readFileSync('./dinosaurs.json')
    let dinoData = JSON.parse(dinosaurs)
    res.render('dinosaurs/index.ejs', {myDinos: dinoData})
})

// SHOW ROUTE (a specific dinosaur)
app.get('/dinosaurs/:id', (req, res)=>{
    // get the array of dinos from the json
    let dinosaurs = fs.readFileSync('./dinosaurs.json')
    let dinoData = JSON.parse(dinosaurs)
    // identify the index of the dino in question
    let dinoIndex = req.params.id
    console.log(`The dino you\'re searching for is ${dinoIndex}`)
    // isolate the dino in question
    // console.log(dinoData[dinoIndex])
    res.render('dinosaurs/show.ejs', {myDino: dinoData[dinoIndex]})
})

app.listen(8000, ()=>{
    console.log('cruddy dinos on port 8000')
})