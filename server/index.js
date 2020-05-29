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

  //Hash a new password -> should be in register
  // bcrypt.hash('travelcommunity', 10, function(err, hash) {
  //   console.log(hash)
  // })

  con.query(`SELECT username, password, admin, banned FROM userdetails WHERE username = ${con.escape(username)}`, function (err, result) {
    if (err) throw err
    console.log(result.length + " < ---")

    if(result.length){
      //Retrieve hash from the result
      const hash = result[0].password

      //Compare the password with hased one.
      bcrypt.compare(request.body.password, hash, function (err, cryptResult) {
        if (err) throw err

        //Check if user password matches the database.
        if (cryptResult) {
          const adminUser = result[0].admin

          //Check if user is banned
          if(result[0].banned){
            console.log("banned")
            return response.status(403).send({
              message: 'Ditt konto är avstängt'
            })
          }
          return response.status(200).send({
            admin: adminUser
          })
        }
        else{
          return response.status(401).send({
            message: 'Fel användarnamn eller lösenord'
          })
        }
      })
    }
    else{
      return response.status(401).send({
        message: 'Fel användarnamn eller lösenord'
      })
    }

  })
})

//Get travels
app.post("/travels", (request, response) => {
  con.query(`SELECT * FROM travel`, function (err, result) {
    if (err) throw err;

    //Array to store object data
    const dataArr = [];

    //Creating an object of the result
    for (let i = 0; i < result.length; i++) {
      const milestones = result[i].milestones;
      const jsonData = JSON.parse(milestones);

      //Insert data into object
      let obj = {
        username: result[i].username,
        from: result[i].from,
        milestones: jsonData,
        to: result[i].to,
        traveltime: result[i].traveltime,
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
  console.log(from + " " + to)
  // Get travels which responds to from and to searchwords
  // SELECT * FROM travel WHERE from = ${request.body.from} AND to = ${request.body.to}
  con.query(`SELECT * FROM travel WHERE fromLoc = ${con.escape(from)} AND toLoc = ${con.escape(to)}`, function (err, result) {
    if (err) throw err;
    console.log(request.body.from + " " + request.body.to);
    console.log(result);

    let resultArray = []

    for (let i = 0; i < result.length; i++) {
      // Parse milestones so that it formats as supposed to
      const milestones = result[i].milestones;
      const jsonData = JSON.parse(milestones);

      let resultObject = {
        username: result[i].username,
        from: result[i].from,
        milestones: jsonData,
        to: result[i].to,
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

      //Creating an object of the result
      for (let i = 0; i < result.length; i++) {
        const milestones = result[i].milestones;
        const jsonData = JSON.parse(milestones);

        //Insert data into object
        let obj = {
          username: result[i].username,
          from: result[i].from,
          milestones: jsonData,
          to: result[i].to,
          traveltime: result[i].traveltime,
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

//Unban user
app.post('/unban', (request, response) => {
  let user = request.body.username

  con.query(`SELECT banned from userdetails WHERE username = ${con.escape(user)}`, function(err, result){
    if(err) throw err

    let error404 = "Användare hittades inte!"

    if(!result.length){
      response.status(404).send({
        message: error404
      })
    }
    else{
      let banUser = 0
      con.query(`UPDATE userdetails SET banned=${con.escape(banUser)} WHERE username=${con.escape(user)}`, function(err, result) {
        if(err) throw err
        console.log("Successfully unbanned user '" + user + "'")

        response.status(200).send({
          message: `Avstäningsstatus för användare '${user}' har ändrats.`
        })
      })
    }
  })
})
