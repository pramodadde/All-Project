
const express = require('express');
const cors = require('cors');
const path = require('path');
const bcrypt = require('bcrypt');
const session = require("express-session");
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mysql = require('mysql2');
const os = require('os');


const app = express();
app.use(express.urlencoded({extended: true})); 
app.use(express.json());

app.use(cors());

app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true
}));

// Create a MySQL connection pool
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'suraj',
  database: 'result'
});

const saltRounds = 10;

passport.serializeUser((user, done) => {
  done(null, user.username);
});

passport.deserializeUser(function(username, done) {
  pool.query('SELECT * FROM user WHERE username = ?', [username], function(err, results) {
    done(err, results[0]);
  });
});

function hashPassword(password) {
  return bcrypt.hashSync(password, saltRounds);
}

function checkPassword(password, hashedPassword) {
  return bcrypt.compareSync(password, hashedPassword);
}

// Use the LocalStrategy with Passport
passport.use(new LocalStrategy(
  function(username, password, done) {
    // Check if the username and password match a record in the database
    pool.query('SELECT * FROM user WHERE username = ?', [username], function(err, results) {
      if (err) { return done(err); }
      if (!results.length) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!checkPassword(password, results[0].password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, results[0]);
    });
  }
));

// Define the checkPassword function for checking the hashed password

// Use Passport's sessions for tracking user's login status
app.use(passport.initialize());
app.use(passport.session());

// Define the route for the login page
// app.get('/login', function(req, res) {
//   res.render('login');
// });

// Define the route for handling the login process

// code for getting machine id

app.post("/", function(req, res) {
  res.send("hello");
})

app.post('/teacher-login', function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
      if (err) {
        res.send({message: "error in teacherlogin router"});
      }
      else if (!user) {
        res.send({ message: "User not found" });
      }
      else {
        if(user.role === "teacher") {
          req.login(user, function(err) {
            if (err) {
              console.log(err);
              res.send({message: "error while login"});
            }
            else {
              res.send({ message: 'teacher login Successfull' });
            }
          });
        }
        else {
          res.send({message: "Invalid login"})
        }
      }
    })(req, res, next);
});

app.post('/student-login', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) {
      res.send({message: "error in teacherlogin router"});
    }
    else if (!user) {
      res.send({ message: "User not found" });
    }
    else {
      if(user.role === "student") {
        req.login(user, function(err) {
          if (err) {
            console.log(err);
            res.send({message: "error while login"});
          }
          else {
            res.send({ message: 'student login Successfull' });
          }
        });
      }
      else {
        res.send({message: "Invalid login"})
      }
    }
  })(req, res, next);
});


app.post('/register', function(req, res) {
    const username = req.body.username;
    const password = req.body.password;
    const role = req.body.role;
  
    // Hash the password before saving it to the database
    const hashedPassword = hashPassword(password);
  
    // Insert the new user into the database
    if(role === "teacher") {
      pool.query('INSERT INTO user (username, password, role) VALUES (?, ?, ?)', [username, hashedPassword, role], function(err, results) {
        if (err) {
          // Handle the error and return an error message
          console.log("error in /register");
          res.send({ message: 'An error occurred while registering the user.' });
        }
        else {
          // Return a success message
          console.log("successs");
          res.send({ message: 'teacher registered successfully.' });
        }
      });
    }
    else {
      pool.query('INSERT INTO user (username, password, role) VALUES (?, ?, ?)', [username, hashedPassword, role], function(err, results) {
        if (err) {
          // Handle the error and return an error message
          console.log("error in /register");
          res.send({ message: 'An error occurred while registering the user.' });
        }
        else {
          // Return a success message
          console.log("successs");
          res.send({ message: 'student registered successfully.' });
        }
      });
    }
  });

// app.post("/teacherlogin", (req, res) => {
//     const username = req.body.username;
//     const password = req.body.password;
// });

app.post("/insert-marks", (req, res) => {
  const {username, sem, subject, marks} = req.body;

  pool.query('INSERT INTO marks (username, sem, subject, marks) VALUES (?, ?, ?, ?)', [username, sem, subject, marks], function(err, results) {
    if (err) {
      // Handle the error and return an error message
      console.log(err);
      res.send({ message: 'An error occurred while inserting marks.' });
    }
    else {
      res.send({ message: 'Mark Inserted' });
    }
  })
})

app.post("/getresult", (req, res) => {
  // Get machine ID
const machineId = os.hostname();

console.log('Machine ID:', machineId);
  if (req.isAuthenticated()) {
    const username = req.user.username;
    pool.query('SELECT deviceId from devices WHERE deviceId = ?', [machineId], function(err, result) {
    if(err) {
      console.log(err);
    }
    else {
        if (result.length !== 0) {
          res.send({message: "You are not applicable to watch result"});
        }
        else {
          pool.query('SELECT * from marks WHERE username = ?', [username], function(err, results) {
            if (err) {
              // Handle the error and return an error message
              console.log("error in /get results");
              res.send({ message: 'An error occurred while get result.' });
            }
            else {
              // res.send({ message: 'Mark Inserted' });
              res.send({message: "success", result: results, username: username});
            }
          })
        }
    }
  })

  } else {
    console.log("not authenticated");
  }
});


app.post("/checkforauthentication", (req, res) => {
  if (req.isAuthenticated()) {
    pool.query('SELECT role from user WHERE username = ?', [req.user.username], function(err, result) {
      if(err) {
        console.log("error in checking authentication");
      }
      else {
        res.send({message: "authenticated", role:result[0].role});
      }
    })
  }
  else {
    res.send({ message: 'not authenticated' });
  }
  
});

// app.post("/checkforauthentication", (req, res) => {
//   pool.query('SELECT role from user WHERE username = ?', [req.user.username], function(err, result) {
//     if(err) {
//       console.log("error in checking authentication");
//     }
//     else {
//         if (req.isAuthenticated()) {
//           res.send({message: "authenticated", role:result[0].role});
//         }
//         else {
//           res.send({ message: 'not authenticated' });
//         }
//     }
//   })
// });

app.post("/insert-unauthorized-user", (req, res) => {
  const deviceId = req.body.deviceId;
   pool.query('SELECT deviceId from devices WHERE deviceId = ?', [deviceId], function(err, result) {
    if(err) {
      console.log("error in checking authentication");
    }
    else {
        if (result.length !== 0) {
          console.log(result.length);
          res.send({message: "device already exist in database"});
        }
        else {
          console.log("dajfd");
          pool.query('INSERT INTO devices (deviceId) VALUES (?)', [deviceId], function(err, results) {
            if (err) {
              // Handle the error and return an error message
              console.log(err);
              res.send({ message: 'An error occurred while inserting device.' });
            }
            else {
              res.send({ message: 'success' });
            }
          })
          // res.send({ message: 'not authenticated' });
        }
    }
  })
})


// Define the route for the dashboard
app.get('/dashboard', function(req, res) {
  if (!req.user) {
    return res.redirect('/login');
  }
  res.render('dashboard', { username: req.user.username });
});

// Define the route for the logout process
app.post('/logout', function(req, res) {
  console.log("hello");
  req.logout(function(err) {
    if(err) {
      console.log(err);
    }
    else {
      res.send({message: "logout successfull"});
    }
  });
});

app.post("/insert-")

// Start the Express server
app.listen(9002, function() {
  console.log('Server running at http://localhost:9002');
});
