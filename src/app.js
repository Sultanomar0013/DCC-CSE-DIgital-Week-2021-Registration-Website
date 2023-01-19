const express = require("express");
const path = require("path");
const bodyParser = require('body-parser');
const app = express();
const hbs = require("hbs");
require("./db/conn");
const Registration = require("./models/registration");
const { json, request } = require("express"); 
const port = process.env.PORT || 3000;

const static_path = path.join(__dirname, "../public" );
const template_path = path.join(__dirname, "../templates/views" );

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(express.static(static_path))
app.set("view engine","hbs");
app.set("views", template_path);

app.get("/", (req , res) => {
  res.render("1testnavbar")
});
app.get("/2registration",(req, res) =>{
    res.render("2registration")
});
app.get("/3bannerdesign",(req, res) =>{
    res.render("3bannerdesign")
});
app.get("/4IdeaSubmission",(req, res) =>{
    res.render("4IdeaSubmission")
});
app.get("/5WebsiteDesign",(req, res) =>{
    res.render("5WebsiteDesign")
});
app.get("/6ProgrammingOlympiad",(req, res) =>{
    res.render("6ProgrammingOlympiad")
});
app.get("/7posterpresentation",(req, res) =>{
    res.render("7posterpresentation")
});


//creat a new user in our database registration
app.post("/2registration", async (req, res) =>{
    try {
        const registerStudent = new Registration({
            name: req.body.name,
            batch: req.body.batch,
            section: req.body.section,
            roll: req.body.roll,
            userid: req.body.batch + req.body.section.toLowerCase() + req.body.roll,
            email: req.body.email,
            phone: req.body.phone,
            password: req.body.password,
            count:0,
            eventName :{
                banner: false,
                idea : false,
                poster : false,
                website : false,
                olympiad : false
            }
        })
        
        const registered = await registerStudent.save();
        res.status(201).render("1testnavbar");

    } 
    catch(eror){
        res.status(400).send(error);
    }
});


//banner design authentication
app.post("/3bannerdesign", async (req, res) =>{
    try{
        const userid = req.body.userid;
        const password = req.body.password;
        
        const userId = await Registration.findOne({userid:userid});

        if(userId.password === password && userId.count < 3 
            && userId.eventName.banner === false){     
            Registration.findOneAndUpdate({userid: userId.userid}, {$inc : {'count' : 1}}).exec();
            Registration.findOneAndUpdate({userid: userId.userid}, {$set : {'eventName.banner' : true}}).exec();
            res.status(201).render("1testnavbar");
        }
        else if(userId.count === 3) res.send("You can't registred for more than 3 events");
        else if(userId.eventName.banner === true) res.send("Already registred");
        else res.send("Password Incorrect");     
    }
    catch(error){
        res.status(400).send("invalid UserID or Password");
    }
});

//idea submission design authentication
app.post("/4IdeaSubmission", async (req, res) =>{
    try{
        const userid = req.body.userid;
        const password = req.body.password;
        const userId = await Registration.findOne({userid:userid});

        if(userId.password === password && userId.count < 3 
            && userId.eventName.idea === false){
            Registration.findOneAndUpdate({userid: userId.userid}, {$inc : {'count' : 1}}).exec();
            Registration.findOneAndUpdate({userid: userId.userid}, {$set : {'eventName.idea' : true}}).exec();
            res.status(201).render("1testnavbar");
        }
        else if(userId.count === 3) res.send("You can't registred for more than 3 events");
        else if(userId.eventName.idea === true) res.send("Already registred");
        else res.send("Password Incorrect");
    }
    catch(error){
        res.status(400).send("invalid UserID or Password")
    }
});

// 5WebsiteDesign authentication
app.post("/5WebsiteDesign", async (req, res) =>{
    try{
        const userid = req.body.userid;
        const password = req.body.password;
        const userId = await Registration.findOne({userid:userid});

        if(userId.password === password && userId.count < 3
            && userId.eventName.website === false){     
            Registration.findOneAndUpdate({userid: userId.userid}, {$inc : {'count' : 1}}).exec();
            Registration.findOneAndUpdate({userid: userId.userid}, {$set : {'eventName.website' : true}}).exec();
            res.status(201).render("1testnavbar");
        }
        else if(userId.count === 3) res.send("You can't registred for more than 3 events");
        else if(userId.eventName.website === true) res.send("Already registred");
        else res.send("Password Incorrect");
    }
    catch(error){
        res.status(400).send("invalid UserID or Password")
    }
});

// olympiad  authentication
app.post("/6ProgrammingOlympiad", async (req, res) =>{
    try{
        const userid = req.body.userid;
        const password = req.body.password;
        const userId = await Registration.findOne({userid:userid});

        if(userId.password === password && userId.count < 3 
            && userId.eventName.olympiad === false){     
            Registration.findOneAndUpdate({userid: userId.userid}, {$inc : {'count' : 1}}).exec();
            Registration.findOneAndUpdate({userid: userId.userid}, {$set : {'eventName.olympiad' : true}}).exec();
            res.status(201).render("1testnavbar");
        }
        else if(userId.count === 3) res.send("You can't registred for more than 3 events");
        else if(userId.eventName.olympiad === true) res.send("Already registred");
        else res.send("Password Incorrect");
    }
    catch(error){
        res.status(400).send("invalid UserID or Password")
    }
});

/// poster presentation
app.post("/7posterpresentation", async (req, res) =>{
    try{
        const userid1 = req.body.userid1;
        const password1 = req.body.password1;
        
        const userid2 = req.body.userid2;
        const password2 = req.body.password2;

        const userId1 = await Registration.findOne({userid:userid1});
        const userId2 = await Registration.findOne({userid:userid2});

        if(userId1.password === password1 && userId2.password === password2
            && userId1.count < 3 && userId2.count < 3
                && userId1.eventName.poster === false && userId2.eventName.poster === false){
                    Registration.findOneAndUpdate({userid: userId1.userid}, {$inc : {'count' : 1}}).exec();
                    Registration.findOneAndUpdate({userid: userId1.userid}, {$set : {'eventName.poster' : true}}).exec();
                    Registration.findOneAndUpdate({userid: userId2.userid}, {$inc : {'count' : 1}}).exec();
                    Registration.findOneAndUpdate({userid: userId2.userid}, {$set : {'eventName.poster' : true}}).exec();
                    res.status(201).render("1testnavbar");
                
            
        }
        else if(userId1.count === 3 || userId2.count === 3 ||
            userId1.eventName.poster === true || userId2.eventName.poster === true) 
                res.send("Someone has registred for 3 events or Someone has already registred");
        else res.send("Someone password incorrect");
    }
    catch(error){
        res.status(400).send("invalid UserID or Password")
    }
});




app.listen(port,() =>{
    console.log(`server is running ${port}`);
});


//eventArr
//array te string akare data kmne rakhe dekhte hbe



/*const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const app = express();
const hbs = require("hbs");
const Registration = require("./models/2registration");
const { json } = require("express"); 
app.use(express.json());

const port = process.env.PORT || 3000;

mongoose.connect( 'mongodb://localhost/Registration', {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
})
.then(() => console.log('Connection Successful'))
.catch((err) => console.log(err));

function errorHandler(err, req, res, next){
    if(res.headerSent){
        return next(err);
    }
    res.status(500).json({ error: err});
}

//app.listen(3000, () => {
   // console.log("app listening at port 3000");
//});
const static_path = path.join(__dirname, "../public" );


app.use(express.urlencoded({extended:false}));

app.use(express.static(static_path))
app.set("view engine","hbs");

app.get("/", (req , res) => {
  res.render("1testnavbar")
});
app.get("/2registration",(req, res) =>{
    res.render("2registration")
});
app.get("/3bannerdesign",(req, res) =>{
    res.render("3bannerdesign")
});
app.get("/4IdeaSubmission",(req, res) =>{
    res.render("4IdeaSubmission")
});
app.get("/5WebsiteDesign",(req, res) =>{
    res.render("5WebsiteDesign")
});
app.get("/6ProgrammingOlympiad",(req, res) =>{
    res.render("6ProgrammingOlympiad")
});
app.get("/7posterpresentation",(req, res) =>{
    res.render("7posterpresentation")
});

app.post("/2registration", async (req, res) =>{
    try {
        const registerStudent = new Registrat({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            batch: req.body.batch,
            section: req.body.section,
            roll: req.body.roll,
            email: req.body.email,
            phone: req.body.phone,
            password: req.body.password 
        })

        const registered = await registerStudent.save();
        res.status(201).render(index);

    } 
    catch(eror){
        res.status(400).send(error);
    }
});

app.listen(port,() =>{
    console.log(`server is running ${port}`);
})*/