const express=require('express')
const router=express.Router()

// get a list of recipes from mongodb #####
router.get('/recipes',(req,res)=>{
    res.send({type:'Get'})
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