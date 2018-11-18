var express = require("express");
var path = require("path");

var app = express();

var PORT = process.env.port || 3000;

app.use(express.urlencoded({extended: true }))
app.use(express.json());

var users = [
    {
        routeName: "max",
        firstName: "max",
        lastName: "korenvaes",
        age: 30,
        zipCode: 75230
    },
    {
        routeName: "bob",
        firstName: "bob",
        lastName: "smith",
        age: 27,
        zipCode: 75219
    }
];

//The client requests the view html file from the server with the root url, the view.html file has a button called "add users" that will take the url to a /add see blow for more notes 
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "view.html"));
});
//when the url arrives at the /add via the "add users" button on the view.html page, then the server will serve up the add.html page
app.get("/add", function (req, res) {
    res.sendFile(path.join(__dirname, "add.html"));
});
//when the url arrives at the /users route,the server will serve up the json array of user objects
app.get("/api/users", function (req, res) {
    return res.json(users);
});

//the view.html page has functionality in it the code section that takes user input, converts it into a route name and sends the get via this route, if route name = route name in the users array of objects, then the server will return the data as a response to the get on the view.html page 
app.get("/api/users/:user", function(req, res) {
    var chosen = req.params.user;
    console.log(chosen);

    for (var i = 0; i < users.length; i++) {
        if (chosen === users[i].routeName) {
            return res.json(users[i]);
        }
    }
    return res.json(false);
});

//
app.post("/api/users", function(req, res) {
    var newUser = req.body;

    //this takes the post from the add.html page and adds a routeName that takes out the spaces and changes all characters in entered into the input field into lowercase; this is necessary because the form does not prompt the user for a route name
    newUser.routeName = newUser.firstName.replace(/\s+/g,"").toLowerCase();

    //this will log the newUser information to the console/server, likely after raw input field data is logged to the server via the add.html page
    console.log(newUser);

    //this pushses the newly created newUser object from the add.html page into the users array of objects, this newUser will exist so long as the server is running
    users.push(newUser);

    res.json(newUser);

});



app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});

