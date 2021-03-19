const express=require('express')
const router=new express.Router()
const Story=require('../models/story')
const Comment=require('../models/comment')
const Likes=require('../models/like')
const Unlike=require('../models/unlike')
const auth=require('../middleware/auth')
const multer=require('multer')


//posts image
const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'src/imageFolder')
    },
    filename:(req,file,cb)=>{
        cb(null,file.originalname)
    }
})


const upload=multer({storage})

router.post('/story/image',auth,upload.single('uploadImage'),async(req,res,next)=>{
    //console.log(req.file.path)
    const story=new Story({
        description:req.body.description,
        uploadImage:req.file.path,
        owner:req.user._id
    })
    try{
        await story.save()
        res.status(200).send(story)
    }catch(e){
        res.send(e)
        res.status(500).send()
    } 
    next()   
})

//comment on story
router.post('/story/comment',auth,async(req,res)=>{
    try{
        //find a story
        const story=await Story.findOne({_id:req.body.story_id})
       
         //console.log(story)
        const comment=new Comment({
            comment:req.body.comment,
            owner:req.user._id,
            story_id:req.body.story_id
        })
        await comment.save()
        
        //add cmnt id in Story
        story.comments.push(comment._id)
        await story.save()
        
        console.log(comment)
        res.send(comment)

    }catch(e){
        res.send(e)

    }
})

//read comment on particular post
router.get('/story/readcomment/:storyId',async(req,res)=>{
    
    try{
        const story=await Story.findOne({_id:req.params.storyId}).populate("comments");
        console.log(story.comments)
        res.send(story)
    }catch(e)
    {
        res.send(e)
    }

})

//like on story
router.post('/story/like',auth,async(req,res)=>{
    try{
        // console.log(req.body.like)
         const likes=new Likes({
             like:req.body.like,
             owner:req.user._id,
             story_id:req.body.story_id
         })
         await likes.save()
         console.log(likes)
         res.send(likes)
 
     }catch(e){
 
     }
 })

//unlike to story
router.post('/story/unlike',auth,async(req,res)=>{
    try{
        
        //console.log(req.user._id,req.body.story_id)

        const likes=await Likes.findOneAndDelete({owner:req.user._id,story_id:req.body.story_id})
        
        if(!likes){
            throw new Error("no likes")
        }
        res.send()

    }catch(e)
    {
        res.send(e)
        console.log(e)
    }
})

module.exports=router
