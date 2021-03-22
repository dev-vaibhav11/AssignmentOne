const mongoose=require('mongoose')

//create schema
const commentSchema=new mongoose.Schema({
    comment:{
        type:String
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    },
    story_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Story'
    },
},{
    timestamps:true
})

const Comment=new mongoose.model('Comment',commentSchema) 
module.exports=Comment

