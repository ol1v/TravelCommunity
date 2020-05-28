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

var con = mysql.createConnection({
  host: "den1.mysql1.gear.host",
  user: "travelcommunity",
  password: "De21A21aZ~-c",
  database: "travelcommunity"
})

con.connect(function (err) {
  if (err) throw err
  console.log("Connected to database")
})

app.listen(port)

//Login fetch
app.post('/login', (request, response) => {
  let username = request.body.username

  //Hash a new password -> should be in register
  // bcrypt.hash('travelcommunity', 10, function(err, hash) {
  //   console.log(hash)
  // })

  con.query(`SELECT username, password, admin FROM userdetails WHERE username = ${con.escape(username)}`, function (err, result) {
    if (err) throw err
    console.log(result)

    //Check if username exists
    if (!result.length) {
      return response.status(401).send({
        message: 'Fel användarnamn eller lösenord'
      })
    }

    //Retrieve hash from the result
    const hash = result[0]["password"]

    //Compare the password with hased one.
    bcrypt.compare(request.body.password, hash, function (err, cryptResult) {
      if (err) throw err


      //Check if user password matches the database.
      if (cryptResult) {
        const adminUser = result[0]["admin"]
        console.log(adminUser)
        return response.status(200).send({
          admin: adminUser
        })
      }
    })
  })
})

// Search fetch
// Might want to change the query depending on db structure.
app.post('/search/', (request, response) => {
  // Get travels which responds to from and to searchwords
  // SELECT * FROM travel WHERE from = ${request.body.from} AND to = ${request.body.to} 
  con.query(`SELECT * FROM userdetails`, function (err, result) {
    if (err) throw err;
    console.log(request.body.from + " " + request.body.to)
    console.log(result)
    // If no match in database
    if (!result.length) {
      return response.status(404).send({
        message: 'Vi hittade inga resultat för din sökning'
      })
      // Return match
    } else {
      return response.status(200).send({
        searchresults: result
      })
    }
  })


})