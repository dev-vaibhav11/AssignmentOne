const express=require('express')
const router=new express.Router()
const User=require('../models/user')
const FriendRequest=require('../models/friendReq')
const auth=require('../middleware/auth')

//create user
router.post('/user',async(req,res)=>{
    const user=new User(req.body)
    try{
        const token=await user.generateAuthToken()
        await user.save()
        res.status(201).send({user,token})
    }catch(e){
        res.send(e)
    }
})

//update user
router.patch('/user/update',auth,async(req,res)=>{
    const updates=Object.keys(req.body)
    const allowedUpdates=['name','email','password','age','gender','dob']
    const isValid=updates.every((update)=>allowedUpdates.includes(update))
    
    if(!isValid){
        return res.status(400).send({error:'Invalid updates!!'})
    }
    try{
        //const user=await User.findById(req.params.id)
        
        updates.forEach((update)=>req.user[update]=req.body[update])
        await req.user.save()

        //const user=await User.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true})

    // if(!user){
    //     return res.status(404).send()
    //     }
        res.send(req.user)
    }catch(e){
        res.status(500).send(e)
    }

})

//login user
router.post('/user/login',async(req,res)=>{

    try{
        const user=await User.findByCredentials(req.body.email,req.body.password)
        const token=await user.generateAuthToken()
        res.status(200).send({user,token})
    }catch(e)
    {
        res.status(400).send(e)
    }
})

//logout user
router.post('/user/logout',auth,async(req,res)=>{
    try{

        req.user.tokens=req.user.tokens.filter((tkn)=>{
            return tkn.token !=req.token
        })

        await req.user.save()
        res.send("Logout Successfully !!")

    }catch(e){
        res.status(500).send()
    }
})

//read user
router.get('/user/me',auth,async(req,res)=>{

        res.send(req.user)
})

//get all user
router.get('/user/:name',auth,async(req,res)=>{
    const name=req.params.name
    
    try{
    const users=await User.find({})
    const user=users.find((value)=>{
        return value.name===name
    })
    if(!user)
        {
             //throw new Error("")
            return res.status(404).send("No user found !!!") 
        }
        res.status(200).send(user)
    }catch(e){
        res.status(500).send()
    }
})

//send friend request
router.post('/send-request',auth,async(req,res)=>{
    const senderId=req.user._id
    const receiverId=req.body.id
    try{
        const friend=new FriendRequest({sender_id:senderId,receiver_id:receiverId})
        const result=await friend.save()
         res.status(200).send(result)
    }catch(e){
        res.status(500).send()
    }
})

//cancel friend reqest
router.post('/cancel-request',auth,async(req,res)=>{
    const senderId=req.user._id
    const receiverId=req.body.id
    try{
        const friend=new FriendRequest({sender_id:senderId,receiver_id:receiverId})
        const result=await friend.save()
         res.status(200).send(result)
    }catch(e){
        res.status(500).send()
    }
})


//my incoming frnd request
router.get('/my-request',auth,async(req,res)=>{
    const receiverId=req.user._id
    
    try{
        const allFriendRequest=await FriendRequest.find({receiver_id:receiverId})
        res.send(allFriendRequest)
    }catch(e){
        res.status(500).send()

    }
})

//accept or reject friend request
router.post('/request-status',auth,async(req,res)=>{
    //0=arrive
    //1=accept
    //2=reject
    const sender_id=req.body.id
    const receiver_id=req.user._id
    const status=req.body.status
    
    console.log(sender_id+"--"+receiver_id+"--"+status)
    let reqStatus
    try{
        if(status==="1")
        {
            reqStatus=await FriendRequest.where({sender_id,receiver_id}).update({$set: {'status':1}}).exec();
        }
        if(status==="2")
        {
             reqStatus=await FriendRequest.findOneAndDelete({sender_id,receiver_id})
        }
        res.status(200).send(reqStatus)
    }catch(e){
        res.status(500).send(e)

    }
})

module.exports=router