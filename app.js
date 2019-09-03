const express = require('express');
const ejs = require("ejs")
const bodyparser = require("body-parser")
const app = express();
const port = process.env.PORT||3000;

app.set('views','./views');
app.set('view engine', 'ejs')

app.use(bodyparser.urlencoded({extended:true}))
app.use(bodyparser.json())

app.use(express.static('./public'))

app.use("/test",require("./api/Tab1"))

app.listen(port, console.log(`Server running at port ${port}`))