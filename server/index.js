//Require
const express = require('express')            //npm install express
const cors = require('cors')                 //npm install cors
const bodyParser = require('body-parser')    //npm install body-parser
const bcrypt = require('bcryptjs')           //npm install bcryptjs
const mysql = require('mysql')               //npm install mysql

//Settings
const app = express()
const port = 3005

app.use(bodyParser.json())
app.use(cors())
app.use(express.json())

var con  = mysql.createConnection({
  host: "den1.mysql1.gear.host",
  user: "travelcommunity",
  password: "De21A21aZ~-c",
  database: "travelcommunity"
})

con.connect(function(err) {
  if (err) throw err
  console.log("Connected to database")
})

app.listen(port)

//Login fetch
app.post('/login', (request,  response) => {
  let username = request.body.username

  //Hash a new password -> should be in register
  // bcrypt.hash('travelcommunity', 10, function(err, hash) {
  //   console.log(hash)
  // })

  con.query(`SELECT username, password, admin FROM userdetails WHERE username = ${con.escape(username)}`, function(err, result) {
    if (err) throw err
    console.log(result)

    //Check if username exists
    if (!result.length){
      return response.status(401).send({
        message: 'Fel användarnamn eller lösenord'
      })
    }

    //Retrieve hash from the result
    const hash = result[0]["password"]

    //Compare the password with hased one.
    bcrypt.compare(request.body.password, hash, function(err, cryptResult) {
      if(err) throw err

      //Check if user password matches the database.
      if(cryptResult){
        const adminUser = result[0]["admin"]
        console.log(adminUser)
        return response.status(200).send({
          admin: adminUser
        })
      }
    })
  })
})

//Get travels
app.post('/travels', (request, response) => {
  con.query(`SELECT * FROM travel`, function(err, result) {
    if(err) throw err

    const tstArr = []

    const milestones = result[0].milestones
    const jsonData = JSON.parse(milestones)

    let obj = {
      "username":result[0].username,
      "from":result[0].from,
      "milestones":jsonData,
      "to":result[0].to,
      "traveltime":result[0].traveltime
    }

    console.log(obj.milestones[0].city)
    tstArr.push(obj)

    console.log(tstArr[0].username)


    response.status(200).send({
      travelData: tstArr
    })

  })
})