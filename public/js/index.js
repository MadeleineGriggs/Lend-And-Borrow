

$(document).ready(function() {
    var $usernameSignup = $("#username-signup");
    var $emailSignup = $("#email-signup");
    var $passwordSignup = $("#password-signup");
    var $signupSubmit = $(".signup");

    var $usernameLogin = $("#username-login");
    var $passwordLogin = $("#password-login");
    var $loginSubmit = $(".login");


    $signupSubmit.on("submit", function(event) {
        event.preventDefault();
        var userData = {
            username: $usernameSignup.val().trim(),
            email: $emailSignup.val().trim(),
            password: $passwordSignup.val()
        };

        //Need to check if all data is available.

        signUpUser(userData);
        $usernameSignup.val("");
        $emailSignup.val("");
        $passwordSignup.val("");
    });

    $loginSubmit.on("submit", function(event) {
        event.preventDefault();
        var userData = {
            username: $usernameLogin.val().trim(),
            password: $passwordLogin.val()
        };

        //Need to check if all data is available.
        loginUser(userData);
    });

    // Does a post to the signup route. If successful, we are redirected to the dashboard page
    // Otherwise we log any errors
    function signUpUser(user) {
        $.post("/api/signup", user)
            .then(function() {
                window.location.replace("/dashboard");
                console.log("send correctly.");
            // If there's an error, handle it by throwing up a bootstrap alert
            })
            .catch(handleLoginErr);
    }

    function loginUser(user) {
        $.post("/api/login", user)
            .then(function() {
                window.location.replace("/dashboard");
            // If there's an error, log the error
            })
            .catch(function(err) {
                console.log(err);
            });
    }
    
    
    function handleLoginErr(err) {
        $("#alert .msg").text(err.responseJSON);
        $("#alert").fadeIn(500);
    }
});

