const express = require("express")
const app = express()

require("./config/database")
require('dotenv').config()



app.use(express.json())
const fileUpload = require("express-fileupload")


app.use(fileUpload());

const authRoute = require("./route/auth")
const jobRoute = require("./route/job")
// console.log(process.env.JWT_SECRET_KEY);
// app.get("/api/", function(req,res){
// res.send("connected")
// })

app.use("/api", authRoute)
app.use("/api", jobRoute)



app.use((req, res) => {
    res.status(404).send({
        msg: "Resource not found"
    })
})

app.use((err, req, res, next) => {
    let status = 500
    let message = "Server Error"
    console.log(err.name);
    let errors = []
    if (err.name == "ValidationError") {
        status = 400
        message = "Bad Request"

        let arr = Object.entries(err.errors)
        // console.log(arr);

        let temp = []

        arr.forEach(el => {
            let obj = {}
            obj.params = el[0]
            obj.msg = el[1].message
            temp.push(obj)
        })

        console.log(temp);
        errors = temp
    }

    if(err.name == "CastError"){
        status = 400
        message = "Bad Request"
    }

    res.status(status).send({
        msg: message,
        errors: errors
    })
})


app.listen(5000, () => {
    console.log("Server Started");
})