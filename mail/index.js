// ?from=from@gmail.com&to=to@gmail.com&subject=emaple&message=example Message
var express = require("express");
var http = require("http")
var p// ?from=from@gmail.com&to=to@gmail.com&subject=emaple&message=example Message
var express = require("express");
var http = require("http")
var path = require("path")
var nodemailer = require("nodemailer")

var app = express();
var server = http.Server(app)
var port = 5000
app.set("port", port)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, "static")))

//Routing
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "static/index.html"))
})

app.get("/send_email", function (req, res) {
    const from = 'admin@ashifsadiq.com'
    const to = req.query.to
    const subject = req.query.subject
    const message = req.query.message
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'admin@ashifsadiq.com',
            pass: 'bwpepoeemgtpzlsh'
        }
    })

    var mailOptions = {
        from: from,
        to: to,
        subject: subject,
        text: message
    }

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error)
        } else {
            res.send({ sucess: { to: to, subject: subject, message: message } })
        }
        res.redirect("/")
    })
})

//Initialize Web Server
server.listen(port, function () {
    console.log("starting server on port " + port)
})
console.clear()