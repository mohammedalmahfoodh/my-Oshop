//### recipe module #####
const mongoose=require('mongoose')
const schema=mongoose.Schema
const recipeSchema=new schema({_instructions:{type:[]},_ingredients:[{nummer:string,Namn:string,
    ViktGram:string,Huvudgrupp:string,Naringsvarden:{Naringsvarde:[{Namn:string,Varde:string}]}}],_name:{type:string},
    _category:{type:string},_persons:number,_urlToImg:{type:string},_desicription:{type:string} 

})
