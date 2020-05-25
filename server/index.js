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

//Login fetch
app.post('/login', (request,  response) => {
  let username = request.body.username

  //Hash a new password -> should be in register
  // bcrypt.hash('asdasdadsada', 10, function(err, hash) {
  //   console.log(hash)
  // })

  con.query(`SELECT username, password FROM userdetails WHERE username = ${con.escape(username)}`, function(err, result) {
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
        return response.status(200).send()
      }
    })
  })
})