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

    app.get("/logout", function(req, res){
        req.logout();
        res.redirect("/");
    });

    // API route to check the users items.
    app.get("/api/user_items", function(req, res) {
        if(req.isAuthenticated()) {
            db.User.findOne(
                {
                    where: {Id: req.user.id},
                }
            ).then(function(dbUser) {
                db.Item.findAll({
                    include: [db.User],
                    where: {
                        userID: req.user.id
                    }
                }).then(function (dbItems) {

                    res.json(dbItems);
                });

            });
        }
    });

    //Route for updating the availability the item so it is not available to borrow.
    app.post("/api/borrow", function (req, res) {
        db.Item.update({
            available: 0,
            borrowingUserId: req.user.id
        }, {where: {id: req.body.id}}
        ).then(function(item) {
            res.json(item);
        });
    });

    //Route for the owner of the item to mark that it has been returned.
    app.post("/api/lend", function (req, res) {
        db.Item.update({
            available: 1,
            borrowingUserId: null
        }, {where: {id: req.body.id}}
        ).then(function(item) {
            res.json(item);
        });
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


};