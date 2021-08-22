const express = require("express")
const app = express();
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const authRoute = require("./routes/auth")

//config acess to env variables
dotenv.config();

//connect to mongodb
mongoose.connect(
    process.env.MONGO_URL,
     {  useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
     })
     .then(()=>{console.log(("DB connection sucessfull"))})
     .catch((err)=>console.log(err));

//allow app to acept json     
app.use(express.json())

//set midleware for auth router     
app.use("/api/auth",authRoute)

//set server 
app.listen(3000,()=>{
    console.log("app running on port 3000")
})