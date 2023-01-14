const express = require("express")
const { UserModel } = require("../model/usermodel")
const userrouter = express.Router()
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")


userrouter.post("/register", async (req, res) => {
    // const payload = req.body
    const { email, pass, name, age } = req.body
    try {
        bcrypt.hash(pass, 5, async (err, secure_password) => {
            if (err) {
                console.log(err)
            } else {
                const user = new UserModel({ email, pass: secure_password, name, age })
                await user.save()
                res.json("Registered")
            }
        })

    } catch (error) {
        res.send("Error in Registering the user")
        console.log(error)
    }


})

userrouter.post("/login", async (req, res) => {
    const { email, pass } = req.body

    try {
        const user = await UserModel.find({ email: email })
        console.log(user)

        const hashed_pass = user[0].pass
        console.log(hashed_pass)
        if (user.length > 0) {
            // res.send("Login Done")
            bcrypt.compare(pass, hashed_pass, (err, result) => {
                if (result) {
                    const token = jwt.sign({ course: 'backend',userID:user[0]._id}, 'masai');
                    res.send({ "msg": "Login Successfull", "token": token })
                } else {
                    res.send("Wrong Credentials1")
                }
            });


        } else {
            res.send("Wrong Credentials")
        }
    } catch (error) {
        res.send("Error in Logging the user")
        console.log(error)
    }

})


module.exports = {
    userrouter
}



// "name":"Nikhil Kumar",
// "email":"nikhil@gmail.com",
// "pass":"nikhil191",
// "age":26



// "email":"monu@gmail.com",
// "pass":"monu191"