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

    //Post request to confirm the user's password.
    app.post("/api/login", passport.authenticate("local"), function(req, res) {
        res.json(req.user);
    });


    //Route for creating Items.
    app.post("/api/items", function(req, res) {

        db.Item.create({
            title: req.body.title,
            body: req.body.body,
            image: req.body.image,
            UserId: req.user.id
        }).then(function(dbItem) {
            res.json(dbItem);
        });
    });


    // You can confirm the user information is correct and the user is logged in by going to this route.
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


    // app.get("/dashboard", isAuthenticated, function(req, res) {
    //     db.item.findAll({
    //         where: {UserId: req.user.id},
    //         order: [["createdAt", "DESC"]]

    //     }).then(function(dbItems) {
    //         var hbsObject = {
    //             items: dbItems
    //         };

    //         res.render("dashboard", hbsObject);

    //     });



    app.get("/", function(req, res) {

        db.Item.findAll({
            order: [["createdAt", "DESC"]]

        }).then(function(dbItems) {
            var newItems = {
                items: dbItems
            };

            res.render("index", newItems);

        });
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