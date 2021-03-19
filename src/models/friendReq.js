const mongoose=require('mongoose')

//create schema
const friendSchema=new mongoose.Schema({
    sender_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    },
    receiver_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    },
    status:{
        type:Number,
        default:0
    }
},{
    timestamps:true
})

const FriendRequest=new mongoose.model('FriendRequest',friendSchema) 
module.exports=FriendRequest
