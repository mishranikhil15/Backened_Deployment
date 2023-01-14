const express = require("express")

const { connection } = require("./config/db")
const cors=require("cors")
// const { UserModel } = require("./model/usermodel")
// const jwt = require("jsonwebtoken")
// const bcrypt = require('bcrypt');
const{userrouter}=require("./routes/userroute")
const{noterouter}=require("./routes/noteroute")
const{authenticate}=require("./middlewares/authenticate")

require("dotenv").config()

const app = express()
app.use(cors({
    origin:"*"
})) 

app.use(express.json())
app.use("/users",userrouter)
app.use(authenticate)
app.use("/notes",noterouter)



app.get("/", (req, res) => {
    res.send("Welcome")
})




// app.get("/data", (req, res) => {
//     // const token=req.query.token
//     const token = req.headers.authorization
//     // console.log(token)
//     jwt.verify(token, 'masai', (err, decoded) => {
//         if (err) {
//             res.send("invalid token")
//             console.log(err)
//         } else {
//             res.send("Data...")
//         }
//     });
// })

// app.get("/cart", (req, res) => {
//     //   const token=req.query.token
//     const token = req.headers.authorization
//     jwt.verify(token, 'masai', (err, decoded) => {
//         if (err) {
//             res.send("invalid token")
//             console.log(err)
//         } else {
//             res.send("cart page")
//         }
//     });



// })

// app.get("/contacts", (req, res) => {
//     res.send("contact page")
// })


app.listen(process.env.port, async () => {
    try {
        await connection
        console.log("Connected to db")
    } catch (error) {

        console.log(error)
        console.log("Trouble while connecting to db")
    }
    console.log(`running at ${process.env.port}` )
})