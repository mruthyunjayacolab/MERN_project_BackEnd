const express = require('express')
const app = express()
const cors = require('cors')
const PORT = 3047
const mongoose = require('mongoose')

//! require  data models 
const User = require('./models/user')

//!middleswares
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())//! cros origin for the resource sharing  between the front end back end.

//!  to revoming the wariing
mongoose.set('strictQuery', false);
const dbUrl = "mongodb://localhost:27017/foodie"
//! connecting to the mongoose

mongoose.connect(dbUrl).then(() => {

    console.log("conncted to database");
})

app.post('/login',(req,res)=>{

    User.findOne({email:req.body.email},(err,userData)=>{

        if(userData){

            if(req.body.password==userData.password){
                res.send({message:'login Seccessful'})
            }
            else{
                res.send({message:'login failed'})
            }

        }
        else{
            res.send({message:' no acccount not to be matching with your macthing with your password'})
        }

    })
})



//!posting the data from the signin page
app.post('/signup', async (req, res) => {

    //! user moduls
    User.findOne({ email: req.body.email }, (err, userData) => {

        if (userData) {
            res.send({ message: "User already exits with this emailId" })
        }

        else {
            const Data = new User({
                name: req.body.name,
                mobile:req.body.mobile,
                email: req.body.email,
                password: req.body.password
            })

            Data.save(() => {
                if (err) {
                    res.send(err)
                }
                else {
                    res.send({ message: "User register Secussfully" })
                }
            })
        }
    })
})

app.listen(PORT, () => {
    console.log(`Listing on ${PORT}`);
})
