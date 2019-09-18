var db = require("../models");

// eslint-disable-next-line no-unused-vars
var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {



    app.get("/search", function(req, res) {
        db.Item.findAll({
            order: [["createdAt", "DESC"]]
        }).then(function(dbItems){
            res.render("mainsearch", {
                items: dbItems
            });
        })


    });


    app.get("/", function(req, res) {
        db.Item.findAll({
            order: [["createdAt", "DESC"]]
        }).then(function(dbItems){
            res.render("index", {
                items: dbItems
            });
        })


    });


    // app.get("/mainsearch", function(req, res) {
    //     res.render("mainsearch");
    // });


    app.get("/dashboard", function(req, res) {
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

                    res.render("dashboard", 
                        {
                            user: dbUser,
                            items: dbItems
                        }
                    );
                });

            });
        }
    });



    app.get("/select", function(req, res) {
        res.render("select");
    });




    app.get("/mainsearch", function(req, res) {
        res.render("mainsearch");
    });

    

    app.get("");
  

    // Render 404 page for any unmatched routes
    app.get("*", function(req, res) {
        res.render("404");
    });
};