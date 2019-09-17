var db = require("../models");
var passport = require("../config/passport");

module.exports = function(app) {

    // Create a new user
    app.post("/api/signup", function(req, res) {
        db.User.create({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        }).then(function(dbUser) {
            res.json(dbUser);
        });
    });

    app.post("/api/items", function(req, res) {
        db.Item.create({
            title: req.body.title,
            body: req.body.body,
            image: req.body.image
        }).then(function(dbItem) {
            res.json(dbItem);
        });
    });

    app.post("/api/login", passport.authenticate("local"), function(req, res) {
        res.json(req.user);
    });

    app.get("/api/user_data", function(req, res) {
        if (!req.user) {
        // The user is not logged in, send back an empty object
            res.json({});
        } else {
        // Otherwise send back the user's email and id
            res.json({
                username: req.user.username,
                email: req.user.email,
                id: req.user.id
            });
        }
    });


    app.post("/", function(req, res) {
        db.User.create({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        }).then(function() {
            res.redirect(307, "/dashboard");
        }).catch(function(err) {
            res.status(401).json(err);
        });

    });
};