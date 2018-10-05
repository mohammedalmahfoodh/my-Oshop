const mongoose=require('mongoose')
const schema=mongoose.Schema
const userSchema=new schema(
    {id:Number,name:String,username:String,email:String,
        address:{street:String,suite:String,city:String,zipcode:String},
        phone:String,website:String,
        company:{name:String,catchPhrase:String,bs:String}
})
const User=mongoose.model('user',userSchema)
module.exports=User;