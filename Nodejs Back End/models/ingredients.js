const mongoose=require('mongoose')
const schema=mongoose.Schema
const ingredientSchema=new schema({
    Nummer:string,Namn:string,ViktGram:string,Huvudgrupp:string,Naringsvarden:{
        Naringsvarde:[{
            Namn:string,Varde:number  } ]    }                         })