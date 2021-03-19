const mongoose=require('mongoose')

const URL=process.env.MONGODB_URL;

mongoose.connect(URL,{useNewUrlParser:true,useUnifiedTopology:true,useFindAndModify:false})

const db = mongoose.connection;
// console.log(db)

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log(" we're connected!")
});