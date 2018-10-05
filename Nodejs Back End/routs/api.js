const express=require('express')
const router=express.Router()
const User=require('../models/user.js')

// get a list of recipes from mongodb #####
router.get('/recipes',(req,res)=>{
    res.send({type:'Get'})
})
//## post a user ######
router.post('/saveuser',(req,res)=>{
    //let user=new User(req.body)
   // user.save()
   //or we can use create methode from Post model
   User.create(req.body).then(user=>{
       res.send(user)
   })
    
})
//### get users ######
router.get('/getusers',(req,res)=>{   
   User.find({}).then((users)=>{
       res.json(users);  })    
})
//### get a user ######
router.get('/getuser/:startOfName',(req,res)=>{   
    User.find({name:req.params.startOfName}).then((user)=>{
        res.json(user);  })    
 })


//## post a reipe ######
router.post('/saverecipe',(req,res)=>{
    console.log(req.body)
    res.send({type:'Post',
name:req.body.name,
age:req.body.age})
})
//### update recipe ######
router.put('/updaterecipe/:name',(req,res)=>{
    res.send({type:'put'})
})

module.exports=router