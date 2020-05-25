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
app.post('/login', (request,  response) => {
  let username = request.body.username
  // let password = request.body.password

  //Hash a new password -> should be in register
  // bcrypt.hash('travelcommunity', 10, function(err, hash) {
  //   console.log(hash)
  // })

  con.query(`SELECT username, password FROM userdetails WHERE username = ${con.escape(username)}`, function(err, result) {
    if (err) throw err
    console.log(result)

    if (!result.length){
      return response.status(401).send()
    }

    const hash = result[0]["password"]
    bcrypt.compare(request.body.password, hash, function(err, cryptResult) {
      if(err) throw err

      if(cryptResult){
        return response.status(200).send()
      }

    })

  })
})