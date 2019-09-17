var db = require("../models");
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
        db.item.findAll({
            order: [["createdAt", "DESC"]]

        }).then(function(dbItems) {
            var hbsObject = {
                items: dbItems
            };
    
            res.render("index", hbsObject);

        });

    });

    app.get("/dashboard", isAuthenticated, function(req, res) {
        db.item.findAll({
            where: {UserId: req.user.id},
            order: [["createdAt", "DESC"]]

        }).then(function(dbItems) {
            var hbsObject = {
                items: dbItems
            };
    
            res.render("dashboard", hbsObject);

        });
        
    });
  
    // Load example page and pass in an example by id
    app.get("/example/:id", function(req, res) {
        db.Example.findOne({ where: { id: req.params.id } }).then(function(dbExample) {
            res.render("example", {
                example: dbExample
            });
        });
    });
  
    // Render 404 page for any unmatched routes
    app.get("*", function(req, res) {
        res.render("404");
    });
};
  
