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
// body parser middleware
app.use(express.urlencoded({extended: false}))

// HOME ROUTE
app.get('/', (req, res)=>{
    res.render('home.ejs')
})

// INDEX ROUTE
app.get('/dinosaurs', (req, res)=>{
    let dinosaurs = fs.readFileSync('./dinosaurs.json')
    let dinoData = JSON.parse(dinosaurs)

    let nameFilter = req.query.nameFilter
    if(nameFilter) {
        dinoData = dinoData.filter(dino=>dino.name.toLowerCase()===nameFilter.toLowerCase())
    }

    res.render('dinosaurs/index.ejs', {myDinos: dinoData})
})

// NEW DINO FORM ROUTE
app.get('/dinosaurs/new', (req, res)=>{
    res.render('dinosaurs/new.ejs')
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

// POST A NEW DINO ROUTE
app.post('/dinosaurs', (req, res)=>{
    // get the array of dinos from the json
    let dinosaurs = fs.readFileSync('./dinosaurs.json')
    let dinoData = JSON.parse(dinosaurs)

    // add the new dino to the array
    dinoData.push(req.body)

    // save the dinosaurs to the json file
    fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinoData))

    // redirect to the index route
    res.redirect('/dinosaurs')
})

app.listen(8000, ()=>{
    console.log('cruddy dinos on port 8000')
})