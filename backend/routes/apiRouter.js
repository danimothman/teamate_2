var express = require('express')
var router = express.Router()
var User = require('../models/User')

router.get('/api/home',function(req, res, next){
    app.get('/data' , function(req, res , next){
        res.json({
            message:"Hello",
            name:"KIM"
        })
    })
})

var mockData = {
    carNum:1004,
    brend:'Hyundai',
    model:'BMW i8',
    owner:'dani',
    img:'https://upload.wikimedia.org/wikipedia/commons/e/e9/2016_BMW_i8.jpg'
}

router.get('/api/items' ,function(req, res, next){
    res.json(mockData);
})

router.post('/api/register', function(req, res, next){
    const {email, password, username} = req.body
    // console.log(req.email)
    const user = new User({email, password, username})
    user.save(function(err){
        if(err){
            console.log(err)
            res.status(500).send("Error registering new user pls try again")
        } else {
            res.status(200).send("Registering is Success")
        }
    })

    res.json({
        message:"OK"
    })

})


module.exports = router;