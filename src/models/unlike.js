const mongoose=require('mongoose')

//create schema
const unlikeSchema=new mongoose.Schema({
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    },
    story_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'Story'
    }
},{
    timestamps:true
})

const Unlike=new mongoose.model('Unlike',unlikeSchema) 
module.exports=Unlike
