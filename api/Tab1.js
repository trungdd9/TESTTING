const express = require("express")
const router = express.Router()
const fs = require('fs')
const client = require("../mqtt/mqtt")
const path = require("path")

router.get("/", (req, res) => {
    res.render("index")
})
router.post("/", (req, res, next) => {
    res.render('index')
    so = req.body.so_thiet_bi
    var imei = []
    for (var i = 0; i < req.body.device; i++) {
        imei.push(randomimei(10))
    }
    var input = {
        so_thiet_bi: req.body.device,
        timer: req.body.timer,
        event: req.body.selectevent,
        imei: imei
    }
    fs.writeFile('public/info.json', JSON.stringify(input), 'utf8', function (err) {
        if (err)
            console.log(err);
        console.log("The file was saved!");
    })
})
router.get("/result", (req, res) => {
    var dem = 0;
    var codewarning = [201, 202, 203, 206, 208, 209, 212, 213, 214, 215, 219, 220, 221, 223, 227, 228, 229]
    fs.readFile('public/info.json', 'utf8', function (err, data) {
        if (err) throw err;
        if (!data) {
            console.log("No Data")
        } else {
            var strin = ""
            var result = JSON.parse(data)
            demsothietbi = result.imei.length;
            console.log(result.event)
            switch (result.event) {
                case "ALARM":
                    setInterval(() => {
                    for (var i = 0; i < result.imei.length; i++) {
                        // console.log(demsothietbi)
                        client.publish(`/${result.event}`, `{ "id": "${result.imei[i]}", "code":${getRndInteger(101, 109)},"info":${JSON.stringify(create_info_901())}}`)
                        dem += 1;
                        console.log("1")
                    }

                }, result.timer * 1000)
                break;
             case "WARNING":
                setInterval(() => {
                    for (var i = 0; i < result.imei.length; i++) {
                        // console.log(demsothietbi)
                        client.publish(`/${result.event}`, `{ "id": "${result.imei[i]}", "code":${codewarning[getRndInteger(0, 16)]},"info":${JSON.stringify(create_info_901())}}`)
                        dem += 1;
                        console.log("2")
                    }

                }, result.timer * 1000)
                break;
                
            }
            for (var i = 0; i < result.imei.length; i++) {
                strin = strin + "Imei:  " + result.imei[i] + "\r"
            }
            res.render("index2", { sothietbi: result.imei.length, timer: result.timer, imeilist: strin, event: "/" + result.event })
        }
    })
})
function getRndInteger(min, max) {
    var so = Math.floor(Math.random() * (max - min + 1)) + min;
    return so
}
function randomimei(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}
function randomstate() {
    var so = getRndInteger(0, 1)
    if (so == 0) return result = "FALSE";
    else return result = "TRUE"
}
function create_info_901() {
    return thongso = {
        STATE: randomstate(),
        DETUP: randomstate(),
        DETDWN: randomstate(),
        DETSM: randomstate(),
        DETC: randomstate(),
        DETVR: randomstate(),
        DETGBK: randomstate(),
        SMVR: randomstate(),
        TEMP: getRndInteger(1, 100),
        SIGNAL: getRndInteger(0, 31),
        LEAKAGE: randomstate(),
        BAT: getRndInteger(0, 100),
        ACPOWER: randomstate()
    }
}
function auto_push_901() {
    client.publish('/Request', ` "info" : ${JSON.stringify(create_info_901)}`)
}
module.exports = router