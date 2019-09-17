var db = require("../models");
// eslint-disable-next-line no-unused-vars
var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {
    // Load index page
    app.get("/", function(req, res) {
        db.Example.findAll({}).then(function(dbExamples) {
            res.render("index", {
                msg: "Welcome!",
                examples: dbExamples
            });
        });
    });

    app.get("/dashboard", function(req, res) {
        if(req.isAuthenticated()){
            res.render("dashboard");
        } else {
            res.render("index");
        }
    });
  

    app.get("");
  
    // Render 404 page for any unmatched routes
    app.get("*", function(req, res) {
        res.render("404");
    });
};
  
