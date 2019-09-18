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
        db.Item.findAll({
            order: [["createdAt", "DESC"]]

        }).then(function(dbItems) {
            var hbsObject = {
                items: dbItems
            };
    
            res.render("index", hbsObject);

        });

    });

    app.get("/dashboard", isAuthenticated, function(req, res) {
        db.Item.findAll({
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
    // app.get("/example/:id", function(req, res) {
    //     db.Example.findOne({ where: { id: req.params.id } }).then(function(dbExample) {
    //         res.render("example", {
    //             example: dbExample
    //         });
    //     } else {
    //         res.render("index");
    //     }
    // });
  

    app.get("/mainsearch", function(req, res) {
        res.render("mainsearch");
    });

    

    app.get("");
  
    // Render 404 page for any unmatched routes
    app.get("*", function(req, res) {
        res.render("404");
    });
};
  
