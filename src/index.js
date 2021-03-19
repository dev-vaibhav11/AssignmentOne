require('./db/mongoose')
const express=require('express')
const userRouter=require('./routers/user')
const storyRouter=require('./routers/story')


const app=express();
const port=process.env.PORT

app.use(express.json())
app.use(userRouter)
app.use(storyRouter)


app.listen(port,()=>{
    console.log("server is up on port "+port);
})
