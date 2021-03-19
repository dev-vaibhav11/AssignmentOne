const mongoose=require('mongoose')

//create schema
const likeSchema=new mongoose.Schema({
    like:{
        type:Boolean
    },
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

const Like=new mongoose.model('Like',likeSchema) 
module.exports=Like
