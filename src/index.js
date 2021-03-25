require('./db/mongoose')
const express=require('express')
const userRouter=require('./routers/user')
const storyRouter=require('./routers/story')
const cors=require('cors')

var corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

// const whitelist = ["http://localhost:3000"];
// const corsOptionsDelegate = function (req, callback) {
//   let corsOptions = { credentials: true };
//   corsOptions['origin'] = whitelist.indexOf(req.header('Origin')) !== -1;
//   callback(null, corsOptions) // callback expects two parameters: error and options
// };

const app=express();
const port=process.env.PORT

app.use(express.json())
app.use(cors(corsOptions))
app.use(userRouter)
app.use(storyRouter)

app.listen(port,()=>{
    console.log("server is up on port "+port);
})

// app.use(express.json())
// //app.use(userRouter)
// //app.use(storyRouter)
// app.use('/api', cors(corsOptionsDelegate), userRouter);
// app.use('/api', cors(corsOptionsDelegate), storyRouter);

// app.listen(port,()=>{
//     console.log("server is up on port "+port);
// })

