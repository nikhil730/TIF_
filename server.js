const dotenv=require('dotenv'); 
const mongoose=require('mongoose');
dotenv.config({path: './.env'});

const db=process.env.DATABASE ;
const app=require(`${__dirname}/app`);

process.on('unhandledRejection',function(err){
  console.log('Unhandled Rejection ')
  console.log(err.name,err.message);
  process.exit(1);
})
process.on('uncaughtException',function(err){
  console.log(err.name,err.message);
  process.exit(1);
  
})


mongoose.connect(db,{
    useNewUrlParser:true,

}).then(con => console.log('database is connected'));


const port=process.env.PORT ||3000;
const server=app.listen(port,()=>{
    console.log(`server is listing on port ${port}`);
})

process.on('SIGTERM',()=>{
  console.log('SIGTERM is working')
  server.close(()=>{
    console.log('process terminated')
  })
})