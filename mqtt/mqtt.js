var mqtt = require('mqtt')
var client = mqtt.connect('172.30.117.213:1883')


// client.on('connect', () => {
//     client.subscribe('IMEI/Alarm', function (err) {
//         if (err) {
//             console.log("Error sub Topic /Alarm")
//         }
//     })
//     client.subscribe('IMEI/Warning', function (err) {
//         if (err) {
//             console.log("Error sub Topic /Warning")
//         }
//     })
//     client.subscribe('IMEI/Notif', function (err) {
//         if (err) {
//             console.log("Error sub Topic /Notif")
//         }
//     })
//     client.subscribe('/Request', function (err) {
//         if (err) {
//             console.log("Error sub Topic /Request")
//         }
//     })
//     client.subscribe('/Response', function (err) {
//         if (err) {
//             console.log("Error sub Topic /Response")
//         }
//     })
// })
// client.on('connect', () => {
//     setInterval(()=>{
//     client.publish('IMEI/Alarm', `{ "id": "xxxxxabcdxxxxxx", "code":${getRndInteger(100,109)}}`)
//     client.publish('IMEI/Notif', `{ "id": "xxxxxefdsxxxxxx", "code":${getRndInteger(300,309)}}`)
//     client.publish('IMEI/Warning', `{ "id": "xxxxxefghxxxxxx", "code":${getRndInteger(200,209)}}`)
// },10000)
// })


// client.on('message', function (topic, message) {
//     // message is Buffer
//     var obj = JSON.parse(message)
//     console.log(obj)
//     console.log(topic)
//     console.log("=====================================")

//     //client.end()
// })

// function getRndInteger(min, max) {
//     var so =Math.floor(Math.random() * (max - min + 1)) + min;
//     return so
// }
module.exports = client