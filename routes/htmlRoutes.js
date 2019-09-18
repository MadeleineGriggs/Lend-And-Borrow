var db = require("../models");

// eslint-disable-next-line no-unused-vars
var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {
    // Load index page
    // app.get("/", function(req, res) {
    //     db.Example.findAll({}).then(function(dbExamples) {
    //         res.render("index", {
    //             msg: "Welcome!",
    //             examples: dbExamples
    //         });
    //     });
    // });


    app.get("/", function(req, res) {

        res.render("index");

    });

    // db.Item.findAll({
    //     order: [["createdAt", "DESC"]]

    // }).then(function(dbItems) {
    //     var newItems = {
    //         items: dbItems
    //     };

    //     res.render("index", newItems);

    // });


    app.get("/dashboard", function(req, res) {
        if(req.isAuthenticated()){
            db.Item.findOne({where: {UserId: req.user.id}}).then(function(dbUser) {
                res.render("dashboard", {
                    user: dbUser
                });
            });
        
            // db.Item.findOne({where: {userId: req.user.id}}).then(function(dbItems) {

            //     res.render("dashboard", {
            //         items: dbItems
            //     });

            // });
            // });

        } else {
            res.render("index");
        }
        // res.render("dashboard");
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
  
