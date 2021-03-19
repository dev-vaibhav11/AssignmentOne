const mongoose=require('mongoose')
const validator=require('validator')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')

//create schema
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true,
        validate(value)
        {
            if(!validator.isEmail(value))
            {
                throw new Error("Email is invalide")
            }
        }
    },
    password:{
        type:String,
        required:true,
        minlength:7,
        trim:true,
        validate(value){
            if(value.toLowerCase().includes('password'))
            {
                throw new Error('password can not contain "password"')
            }
        }
    },
    age:{
        type:Number,
        default:0,
        validate(value){
            if(value<0)
            {
                throw new Error("Age must be Positive No.")
            }
        }
    },
    gender:{
        type:String
    },
    dob:{
        type:Date
    },
    tokens:[{
        token:{
            type:String,
            required:true
        }
    }],
    avatar:{
        type:Buffer
    }
},{
    timestamps:true
})

userSchema.methods.toJSON=function(){
    const user=this
    const userObject=user.toObject()
    
    delete userObject.password
    delete userObject.tokens
    delete userObject.avatar
    //console.log(userObject)
    return userObject
}


userSchema.methods.generateAuthToken=async function(){
    const user=this

    const token=jwt.sign({_id:user._id.toString()},process.env.JWT_SECRETE)

    user.tokens=user.tokens.concat({token})
    await user.save()
    return token
}

userSchema.statics.findByCredentials=async(email,password)=>{
        const user=await User.findOne({email})
       // console.log(user)
        if(!user)
        {
            throw new Error('Unable to Login !!')
        }
        const isMatch=await bcrypt.compare(password,user.password)

        if(!isMatch){
            throw new Error('Unable to Login !!')
        }

        return user
}

//Hash the plain text password brfore saving
userSchema.pre('save',async function(next){
    const user=this

//    console.log('just before saving !!')

    if(user.isModified('password')){

        user.password=await bcrypt.hash(user.password,8)
     //   console.log(user.password)
    }


    next()
})

const User=new mongoose.model('User',userSchema)

module.exports=User