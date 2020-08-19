var express = require('express')
var router = express.Router()
var User = require('../models/User')
var jwt = require('jsonwebtoken')

const secret = "mysecu"
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

    // res.json({
    //     message:"OK"
    // })

})

router.post('/api/authenticate',function(req, res, next){
    const {email, password} = req.body
    // console.log(req.body)
    // res.send("Success")
    User.findOne({email}, function(err, user){
        if(err) {
            console.log(err)
            res.status(500).json({error:'Internal error please try again'})
        } else if (!user){
            res.status(401).json({error:'email is not existed'})
        } else {
            user. isCorrectPassword(password, function(err, same){
                // console.log(same)
                // res.send("Success")
                if(err){
                    console.log(err)
                    res.status(500).json({error:'Internal error please try again'})
                } else if(!same){
                    res.status(401).json({error:'Incorrect password'})
                } else {
                    const payload = {email};
                    const token = jwt.sign(payload, secret, { expiresIn:'1h' })
                    console.log(token)
                    res.cookie('token', token,{httpOnly:true} ).sendStatus(200)
                }})
        }
    })
})

module.exports = router;