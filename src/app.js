const express = require('express')
const path = require("path")
const hbs = require('hbs')
const geocode = require("./utils/geocode")
const forecast = require("./utils/forecast")

const app = express()
const port = process.env.PORT || 3000
const htmlpath = path.join(__dirname, "../public")
const viewspath = path.join(__dirname, "../templates/views")
const partialspath = path.join(__dirname, "../templates/partials")

app.set("view engine","hbs")
app.set('views', viewspath)
hbs.registerPartials(partialspath)
app.use(express.static(htmlpath))

app.get('', (req, res) => {
    res.render('index',{
        title: "Stanley Chen",
        name: "Stanley chen"

    })
})
app.get('/weatherapp', (req, res) => {
    res.render('Weather',{
        title: "Weather Application",
        name: "Stanley chen"

    })
})
app.get("/contactInfo", (req,res) =>{
    res.render('ContactInfo',{
        title: "Contact Info",
        name:"Stanley chen"
    })
})

app.get('/about', (req, res) => {
    res.render('About',{
        title: "About Me",
        name: "stanley chen"

    })
})
app.get('/socialmedia', (req, res) => {
    res.render('social',{
        title: "Social Media",
        message: "Github (click me!)",
        message2: "Linkedin (click me!)",
        name: "Stanley Chen"

    })
})
app.get("/weather",(req,res) =>{
    if (!req.query.address){
        return res.send({
            error: "You did not search for an address"
        })
    }
    geocode(req.query.address,(error,{latitude,longitude,location} = {})=>{
        if (error){
            return res.send({
                error
            })
        }

        forecast(latitude,longitude,(error,forecastData)=>{
            if (error){
                return res.send({error})
            }
            res.send({
                
                forecast: forecastData,
                location,
                address: req.query.address

            })
            console.log(forecastData)

    
        })
    })
})


app.get('/help/*' , (req,res)=> {
    res.render('404',{
        title: "404",
        error: "help article not found",
        name: "stanley chen"
    })
    
})

app.get('*', (req,res)=>{
    res.render('404',{
        title: "404",
        error: "Page not found",
        name: "stanley chen"
    })
})

app.listen(port, ()=>{

    console.log('server is up on port' + port)


})