

$(document).ready(function() {
    var $usernameSignup = $("#username-signup");
    var $emailSignup = $("#email-signup");
    var $passwordSignup = $("#password-signup");
    var $signupSubmit = $(".signup");


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

    // Does a post to the signup route. If successful, we are redirected to the dashboard page
    // Otherwise we log any errors
    function signUpUser(user) {
        $.post("/api/signup", user)
            .then(function(data) {
                window.location.replace("/dashboard");
                console.log("send correctly.");
            // If there's an error, handle it by throwing up a bootstrap alert
            })
            .catch(handleLoginErr);
    }

    function handleLoginErr(err) {
        $("#alert .msg").text(err.responseJSON);
        $("#alert").fadeIn(500);
    }
});

