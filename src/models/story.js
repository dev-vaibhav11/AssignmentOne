const mongoose=require('mongoose')

//create schema
const storySchema=new mongoose.Schema({
    uploadImage:{
        type:String
    },
    description:{
        type:String
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    },
    comments:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Comment'
    }]
},{
    timestamps:true
})

const Story=new mongoose.model('Story',storySchema)
module.exports=Story