require('dotenv').config();
const express = require("express");
const cors = require("cors")
const bodyParser = require("body-parser");
const path = require("path");
const mongoose = require("mongoose");
const session = require("express-session"); //saving data
const passport = require("passport"); //authentication
const passportLocalMongoose = require("passport-local-mongoose");
const { log } = require('console');



const app = express();

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(session({
    secret: "Our little secret.",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session()); 

let PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const userSchema = mongoose.Schema({
    username: String,
    password: String,
    role: String,
    teacher: String
});

const sessionSchema = mongoose.Schema({
    teacher: String,
    currentDate: String,
    currentTime: String,
    isOn: Boolean,
    latitude: Number,
    longitude: Number
});

const entrySchema = mongoose.Schema({
    username: String,
    teacher: String,
    date: String,
    time: String, 
    isPresent: String
});

const connectionSchema = mongoose.Schema({
    student: String,
    teacher: String,
});



userSchema.plugin(passportLocalMongoose);
const User = new mongoose.model("User", userSchema);
const Session = new mongoose.model("Session", sessionSchema);
const Entry = new mongoose.model("Entry", entrySchema);
const Connection = new mongoose.model("Connection", connectionSchema);

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



app.post("/teacherregister", (req, res) => {
    const { username, password} = req.body;
    console.log(username);

    User.findOne({username: username})
        .then(teacher => {
        if(teacher) {
            if(teacher.role === "student") {
                res.send({message: "Invalid Input"})
            }
            else {
                res.send({message: "teacher already Registered"});
            }
        }
        else {
            User.register({username: username, role: "teacher", teacher: "No"}, password, function(err, teacher){
                if(err) {
                    console.log(err);
                }
                else {
                    passport.authenticate("local")(req, res, function() {
                        res.send({message: "Successfully registered"});
                    });
                }
            });
        }
    });
});

app.post("/teacherlogin", (req, res) => { //teacherlogin
    const {username, password, role} = req.body;
    console.log(username);
    if(role === "teacher") {
        const teacher = new User ({
            username: username,
            password: password,
            role: role,
            teacher: "No"
        });
    
        req.login(teacher, function(err) {
            if(err) {
                console.log(err);
            } else {
                passport.authenticate("local")(req, res, function() {
                    res.send({message: "login Successfull"});
                });
            }
        });
    }
    else {
        res.send({message: "Invalid Input"});
    }
});

app.post('/insertstudent', (req, res) => {
    if (req.isAuthenticated()) {
      const { username, password, role } = req.body;
    
    Connection.findOne({student: username, teacher: req.user.username})
    .then(data => {
        if(data) {
            console.log("Connection already established");
        }
        else {
            const connection = new Connection ({
                student: username,
                teacher: req.user.username
            });
            connection.save()
            .then(() => {
                console.log("connection Established");
            })
            .catch(error => {
                console.log("error in connection establishing: ", error);
            });
        }
    });

    User.findOne({ username: username, role: 'student'})
    .then(student => {
    if (student) {
        res.send({ message: 'student already Registered' });
    } else {
        User.register({ username: username, role: role, teacher: req.user.username}, password, (err, newStudent) => {
        if (err) {
            console.log(err);
            res.send({ message: 'Failed to insert student' });
        } else {
            res.send({ message: 'Successfully Inserted' });
        }
        });
    }
    });
    } else {
      res.send({ message: 'not authenticated' });
    }
  });

  app.post("/create-session", (req, res) => {

    const {currentDate, currentTime, password, latitude, longitude} = req.body;
    const session = new Session ({
        teacher: req.user.username,
        currentDate: currentDate,
        currentTime: currentTime,
        isOn: true,
        latitude: latitude,
        longitude: longitude
    });
    session.save()
    .then(() => {
        res.send({message: "Successfully Created"});
    })
    .catch(error => {
        console.log("error in saving result in insert marks: ", error);
    });
});


app.post("/get-sessions", (req, res) => {
    Session.find({})
    .then((result) => {
    //   console.log(result);
      res.send({sessions: result});
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send('Error getting Sessions');
    });
});

app.post("/studentlogin", (req, res) => { 
    const {username, password, role} = req.body;
    console.log("hel");
    if(role === "student") {
        console.log(username);
        const student = new User ({
            username: username,
            password: password,
            role: role
        });
    
        req.login(student, function(err) {
            if(err) {
                console.log(err);
            } else {
                passport.authenticate("local")(req, res, function() {
                    res.send({message: "login Successfull"});
                });
            }
        });
    }
    else {
        res.send({message: "Invalid Input"});
    }
});

app.post("/give-attendance", (req, res) => { 
    const {currentTime, currentDate, teacher} = req.body.session;
    Entry.findOne({username: req.user.username, teacher: teacher, time: currentTime, date: currentDate})
    .then(entry => {
        if (entry) {
          res.send({ message: 'already Marked' });
        } else {
            const entry = new Entry({
                username: req.user.username,
                teacher: teacher,
                date: currentDate,
                time: currentTime, 
                isPresent: true
            });
            entry.save()
            .then(() => {
                res.send({message: "success"});
            })
            .catch(error => {
                console.log("error in saving result in insert marks: ");
            });
        }
      })
    .catch((err) => {
      console.log(err);
      res.status(500).send('Error in giving attendance');
    });
});

app.post("/check-attendance", (req, res) => { 
    const {teacher} = req.body;
    Entry.findOne({username: req.user.username, teacher: teacher})
    .then(entry => {
        if (entry) {
          res.send({ message: 'present' });
        } else {
          res.send({message: "fail"});
        }
      })
    .catch((err) => {
      console.log(err);
      res.status(500).send('Error in checking attendance');
    });
});

app.post("/get-teachers", (req, res) => {

    Connection.find({student: req.user.username})
    .then(teachers => {
        if (teachers) {
          res.send({ teachers: teachers });
        } else {
          res.send({message: "fail"});
        }
      })
    .catch((err) => {
      console.log(err);
      res.status(500).send('Error in checking attendance');
    });
});

app.post("/get-attendance", (req, res) => {
    const {teacher} = req.body;
    console.log(teacher);
    Entry.find({username: req.user.username, teacher: teacher})
    .then(entries => {
        if(entries) {
            console.log(entries);
            res.send({entries: entries});
        }
        else {
            console.log("error in getting attendance");
        }
    })
    .catch((err) => {
        console.log(err);
        res.status(500).send('Error in getting attendance 2');
      });
});

app.post("/stop-session", (req, res) => {
    const { date, time } = req.body;
    console.log(date);
    Session.findOneAndUpdate(
      { currentDate: date, currentTime: time },
      { $set: { isOn: false } },
      { new: true }
    )
      .exec()
      .then((updatedSession) => {
        console.log(updatedSession);
        res.send({ message: "success" });
      })
      .catch((err) => {
        console.log(err);
      });
  });
  

app.post("/attendances", (req, res) => {
    const {date, time} = req.body;
    console.log(date);
    Entry.find({date: date, time: time})
    .then(entries => {
        if(entries) {
            res.send({message: "success", entries: entries});
        }
        else {
            console.log("error in getting attendance 3");
        }
    })
    .catch((err) => {
        console.log(err);
        res.status(500).send('Error in getting attendance 3');
      });
});


app.post("/update-attendances", (req, res) => {
    const { username, date, time } = req.body;
    console.log(date);
    Entry.findOneAndUpdate(
      { date: date, time: time },
      { $set: { isPresent: false } },
      { new: true }
    )
      .exec()
      .then((updatedUser) => {
        console.log(updatedUser);
        res.send({ message: "success" });
      })
      .catch((err) => {
        console.log(err);
      });
  });
  
      

    // User.find({username: req.user.username})
    // .then((result) => {
    // //   console.log(result);
    //   res.send({teachers: result});
    // })
    // .catch((err) => {
    //   console.log(err);
    //   res.status(500).send('Error getting Teachers');
    // });






app.post("/logout", (req, res) => {
    req.logout(function(err) {
        if(!err) {
            res.send({message: "logout successfully"});
        }
        else {
            console.log("error in server.js /logout");
        }
    });
});

//static files
app.use(express.static(path.join(__dirname, "./client/build")));

app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "./client/build/index.html"))
})

//

app.listen(PORT, function () {
    console.log("Server has started Successfully on " + PORT);
});