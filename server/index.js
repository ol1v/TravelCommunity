//Require
const express = require("express"); //npm install express
const cors = require("cors"); //npm install cors
const bodyParser = require("body-parser"); //npm install body-parser
const bcrypt = require("bcryptjs"); //npm install bcryptjs
const mysql = require("mysql"); //npm install mysql

//Settings
const app = express();
const port = 3005;

app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

var con = mysql.createConnection({
  host: "den1.mysql1.gear.host",
  user: "travelcommunity",
  password: "De21A21aZ~-c",
  database: "travelcommunity",
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected to database");
});

app.listen(port);

//Login fetch
app.post("/login", (request, response) => {
  let username = request.body.username;

  con.query(`SELECT username, password, admin, banned FROM userdetails WHERE username = ${con.escape(username)}`, function (err, result) {
    if (err) throw err
    console.log(result.length + " < ---")

    if (result.length) {
      //Retrieve hash from the result
      const hash = result[0].password

      //Compare the password with hased one.
      bcrypt.compare(request.body.password, hash, function (err, cryptResult) {
        if (err) throw err

        //Check if user password matches the database.
        if (cryptResult) {
          const adminUser = result[0].admin

          //Check if user is banned
          if (result[0].banned) {
            return response.status(403).send({
              message: 'Detta konto är avstängt'
            })
          }
          return response.status(200).send({
            admin: adminUser
          })
        }
        else {
          return response.status(401).send({
            message: 'Fel användarnamn eller lösenord'
          })
        }
      })
    }
    else {
      return response.status(401).send({
        message: 'Fel användarnamn eller lösenord'
      })
    }
  })
})

app.post("/register", (request, response) => {
  let username = request.body.username
  let email = request.body.email
  let password = request.body.password

  con.query(`SELECT username FROM userdetails WHERE username = ${con.escape(username)}`, function (err, userNameResult) {
    if (userNameResult.length > 0) {
      return response.status(406).send({
        message: "Användarnamnet finns redan!"
      })
    }
    else {
      con.query(`SELECT email FROM userdetails WHERE email = ${con.escape(email)}`, function (err, emailResult) {
        if (emailResult.length > 0) {
          return response.status(406).send({
            message: "Email adressen finns redan!"
          })
        }
        else {
          //Hash the password
          bcrypt.hash(password, 10, function (err, hash) {
            con.query(`INSERT INTO userdetails (password, admin, username, email, banned) VALUES(${con.escape(hash)}, ${con.escape(0)}, ${con.escape(username)}, ${con.escape(email)}, ${con.escape(0)})`, function (err, result) {
              return response.status(201).send({
                message: "Registering lyckades"
              })
            })
          })
        }
      })
    }
  })
})

//Get travels
app.post("/travels", (request, response) => {
  con.query(`SELECT * FROM travel ORDER BY ratingScore DESC, JSON_LENGTH(rating) DESC`, function (err, result) {
    if (err) throw err;

    //Array to store object data
    const dataArr = [];

    //Creating an object of the result
    for (let i = 0; i < result.length; i++) {

      const milestones = result[i].milestones;
      const milestonesJson = JSON.parse(milestones);

      //Insert data into object
      let obj = {
        id: result[i].id,
        username: result[i].username,
        from: result[i].fromLoc,
        fromCountry: result[i].fromCountry,
        fromTrans: result[i].fromTransportation,
        milestones: milestonesJson,
        to: result[i].toLoc,
        toCountry: result[i].toCountry,
        toTrans: result[i].toTransportation,
        traveltime: result[i].traveltime,
        timestamp: result[i].timestamp,
        price: result[i].price,
        ratingScore: result[i].ratingScore
      };
      dataArr.push(obj);
    }

    //Response code 200 if succeded
    response.status(200).send({
      travelData: dataArr,
    });
  });
});

// Search fetch
// Might want to change the query depending on db structure.
app.post("/search", (request, response) => {
  let from = request.body.from
  let to = request.body.to

  // Get travels which responds to from and to searchwords
  con.query(`SELECT * FROM travel WHERE fromLoc = ${con.escape(from)} AND toLoc = ${con.escape(to)}`, function (err, result) {
    if (err) throw err;
    console.log(request.body.from + " " + request.body.to + " <-");
    console.log(result);

    let resultArray = []

    for (let i = 0; i < result.length; i++) {
      // Parse milestones so that it formats as supposed to
      const milestones = result[i].milestones;
      const jsonData = JSON.parse(milestones);

      let resultObject = {
        id: result[i].id,
        username: result[i].username,
        from: result[i].fromLoc,
        milestones: jsonData,
        to: result[i].toLoc,
        traveltime: result[i].traveltime
      }
      resultArray.push(resultObject)
    }
    // If no match in database
    if (!result.length) {
      return response.status(404).send({
        message: "Vi hittade inga resultat för din sökning",
      });
      // Return match
    } else {
      return response.status(200).send({
        searchresults: resultArray,
      });
    }
  });
});


//Get travels where user
app.post("/my-travels", (request, response) => {
  let username = request.body.username;

  con.query(
    `SELECT * FROM travel WHERE username = ${con.escape(username)}`,
    function (err, result) {
      if (err) throw err;

      //Array to store object data
      const dataArr = [];

      for (let i = 0; i < result.length; i++) {
        const milestones = result[i].milestones;
        const milestonesJson = JSON.parse(milestones);
  
        //Insert data into object
        let obj = {
          username: result[i].username,
          from: result[i].fromLoc,
          fromCountry: result[i].fromCountry,
          fromTrans: result[i].fromTransportation,
          milestones: milestonesJson,
          to: result[i].toLoc,
          toCountry: result[i].toCountry,
          traveltime: result[i].traveltime,
          timestamp: result[i].timestamp,
          price: result[i].price
        };
        dataArr.push(obj);
      }

      //Response code 200 if succeded
      response.status(200).send({
        travelData: dataArr,
      });
    }
  );
});

// Insert travels in Database as Array ()
app.post("/create-trip", (request, response) => {
  let newTrip = request.body.newTrip;

  con.query(
    `INSERT INTO Travel (username, from, milestones, to, traveltime) VALUES(${newTrip[0]}, ${newTrip[1]}, ${newTrip[2]}, ${newTrip[3]}, ${newTrip[4]}, ${newTrip[5]}`, function (err, result) {
      if (err) throw err;
      console.log(result);
      response.status(200).send();
    })
})

//Admin panel
//Ban user
app.post("/ban", (request, response) => {
  let user = request.body.username;

  con.query(
    `SELECT banned from userdetails WHERE username = ${con.escape(user)}`,
    function (err, result) {
      if (err) throw err;

      let error404 = "Användare hittades inte!";

      if (!result.length) {
        response.status(404).send({
          message: error404,
        });
      } else {
        let banUser = 1;
        con.query(
          `UPDATE userdetails SET banned=${con.escape(
            banUser
          )} WHERE username=${con.escape(user)}`,
          function (err, result) {
            if (err) throw err;
            console.log("Successfully banned user '" + user + "'");

            response.status(200).send({
              message: `Avstäningsstatus för användare '${user}' har ändrats.`,
            });
          }
        );
      }
    }
  );
});

//Unban user
app.post('/unban', (request, response) => {
  let user = request.body.username

  con.query(`SELECT banned from userdetails WHERE username = ${con.escape(user)}`, function (err, result) {
    if (err) throw err

    let error404 = "Användare hittades inte!"

    if (!result.length) {
      response.status(404).send({
        message: error404
      })
    }
    else {
      let banUser = 0
      con.query(`UPDATE userdetails SET banned=${con.escape(banUser)} WHERE username=${con.escape(user)}`, function (err, result) {
        if (err) throw err
        console.log("Successfully unbanned user '" + user + "'")

        response.status(200).send({
          message: `Avstäningsstatus för användare '${user}' har ändrats.`
        })
      })
    }
  })
})

//Add rating 
app.post('/rating', (request, response) => {
  let travelIndex = request.body.index
  let rating = request.body.rating

  con.query(`SELECT rating, ratingScore FROM travel WHERE id= ${con.escape(travelIndex)}`, function(err, result){
    if(err) throw err

    var obj = { "v": rating }

    console.log(result[0].ratingScore + " <-- scoren")

    //Retrieve the current rating result
    const ratingRes = result[0].rating

    //Parse rating into JSON
    const ratingJson = JSON.parse(ratingRes);

    //Push JSON to ratingJson array
    ratingJson.push(obj)

    //Calculate score
    let ratingScore = 0
    for(let i=0; i < ratingJson.length; i++){
      ratingScore += ratingJson[i].v
    }
    ratingResult = ratingScore / ratingJson.length

    //Compile it into a string
    let json = JSON.stringify(ratingJson)

    //Update the current value
    con.query(`UPDATE travel SET rating=${con.escape(json)}, ratingScore=${con.escape(ratingResult)} WHERE id=${con.escape(travelIndex)}`, function(err, updateResult){
      if(err) throw err

      console.log("updated")
    })
  })
})

//Settings
//Change password
app.post('/change-pass', (request, response) => {
  let username = request.body.username
  let currentPass = request.body.currentPass
  let newPass = request.body.newPass

  con.query(`SELECT password FROM userdetails WHERE username = ${con.escape(username)}`, function (err, result) {
    if (err) throw err

    //Retrieve the current hashed password
    let hash = result[0].password

    bcrypt.compare(currentPass, hash, function (err, cryptResult) {
      if (cryptResult) {
        bcrypt.hash(newPass, 10, function (err, newHash) {
          con.query(`UPDATE userdetails SET password=${con.escape(newHash)} WHERE username = ${con.escape(username)}`, function (err, updatedResult) {
            if (err) throw err
            response.status(200).send({
              message: "Lösenordet har ändrats!"
            })
          })
        })
      }
      else {
        response.status(404).send({
          message: "Fel lösenord"
        })
      }
    })
  })
})

//Remove account for user
app.post('/remove-account', (request, response) => {
  let username = request.body.username
  let password = request.body.password
  let removeAllData = request.body.removeAllData

  //Select all from userdetails
  con.query(`SELECT * FROM userdetails WHERE username = ${con.escape(username)}`, function (err, result) {
    if (err) throw err

    let hash = result[0].password
    //Compare input password with database password
    bcrypt.compare(password, hash, function (err, cryptResult) {
      if (err) throw err

      //Check if password matches
      if (cryptResult) {
        //Remove user from userdetails
        con.query(`DELETE FROM userdetails WHERE username = ${con.escape(username)}`, function (err, removeAccountResult) {
          if (err) throw err

          //If user want to remove ALL travels
          if (removeAllData) {
            //Delete all data from travel
            con.query(`DELETE FROM travel WHERE username = ${con.escape(username)}`, function (err, _) {
              if (err) throw err

              //Successfully removed account and all it's content
              response.status(200).send({
                message: "Ditt konto & alla dina resor är raderade."
              })
            })
          }
          else {
            //Successfully removed account without content
            response.status(200).send({
              message: "Ditt konto är raderat. Men innehållet förblir på webbsidan."
            })
          }
        })
      } else {
        response.status(404).send({
          message: "Lösenordet är inkorrekt."
        })
      }
    })
  })
})

//Reset password
const nodemailer = require('nodemailer')
const randomstring = require('randomstring')

app.post('/reset-password', (request, response) => {
  let toEmail = request.body.email

  con.query(`SELECT password FROM userdetails WHERE email = ${con.escape(toEmail)}`, function (err, result) {
    if (err) throw err

    const newTempPass = randomstring.generate(7);

    bcrypt.hash(newTempPass, 10, function (err, newHash) {
      con.query(`UPDATE userdetails SET password=${con.escape(newHash)} WHERE email = ${con.escape(toEmail)}`, function (err, updatedResult) {
        if (err) throw err

        //Send an email with the new password
        let transporter = nodemailer.createTransport({
          service: "hotmail",
          auth: {
            user: "reset-travelcommunity@hotmail.com",
            pass: "travelcommunity1"
          }
        })

        let mailOptions = {
          from: "reset-travelcommunity@hotmail.com",
          to: toEmail,
          subject: "Återställ lösenord",
          text: `Ditt lösenord har återställts! Logga in på webbsidan och byt till ett nytt lösenord. Lösenord: ${newTempPass}`
        }

        transporter.sendMail(mailOptions, function (err, info) {
          if (err) {
            console.log(err)
            response.status(404).send({
              message: "Email was NOT sent successfully"
            })
          }
          else {
            console.log("Email was sent")
            response.status(200).send({
              message: "Email was sent successfully"
            })
          }
        })
      })
    })
  })
})
// update users travel
app.post('/updatetravel', (request, response) => {
  let travel = request.body.travel
  console.log(travel)

  con.query(`SELECT * from travel WHERE id = ${con.escape(travel.id)}`, function (err, result) {
    if (err) throw err

    console.log(result)
    // Update travel
    con.query(`UPDATE travel SET fromLoc=${con.escape(travel.from)} WHERE id=${con.escape(travel.id)}`, function (err, result) {
      if (err) throw err

      // Lägg till resten av querys
      response.status(200).send({
        message: `Uppdaterade resan!`
      })
    })

  })
})


//Putte's notering. DONT TOUCHHHHHHHHHH
  // var obj = [{"city":"asd", "country":"asd"}]
  // let json = JSON.stringify(obj)

  // console.log(obj)

  // con.query(`INSERT INTO travel (username, fromLoc, milestones) VALUES("putt", "älv", ?)`, json, function(err, result){
  //   if(err) throw err
  //   console.log("pushed new")
  // })