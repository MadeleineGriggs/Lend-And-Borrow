

$(document).ready(function() {
    var $usernameSignup = $("#username-signup");
    var $emailSignup = $("#email-signup");
    var $passwordSignup = $("#password-signup");
    var $signupSubmit = $(".signup");

    var $usernameLogin = $("#username-login");
    var $passwordLogin = $("#password-login");
    var $loginSubmit = $(".login");

    var $newItemTitle = $("#newItemTitle");
    var $newItemImgLink = $("#newItemImgLink");
    var $newItemDesc = $("#newItemDesc");
    var $newItemSubmit = $(".newItem");

    var $borrowClick = $(".btn-borrow");
    var $returnClick = $(".btn-return");

    var $logoutClick = $("#btn-logout");

    var $contactBorrowerBtn = $(".btn-contact");

    $contactBorrowerBtn.on("click", function(event) {
        event.preventDefault();

        var borrowerID = $(this).attr("data-borrower");
        console.log(borrowerID);
        getBorrowingUser(borrowerID);
    });

    $logoutClick.on("click", function(event) {
        event.preventDefault();
        logoutUser();
    });


    $borrowClick.on("click", function(event) {
        event.preventDefault();
        var itemId = $(this).attr("id");
        console.log(itemId);
        rentItem(itemId);
    });

    $returnClick.on("click", function(event) {
        event.preventDefault();
        var itemId = $(this).attr("id");
        console.log(itemId);
        returnItem(itemId);
    });

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


    $newItemSubmit.on("submit", function(event) {
        event.preventDefault();
        var itemData = {
            title: $newItemTitle.val().trim(),
            body: $newItemDesc.val().trim(),
            image: $newItemImgLink.val().trim()
        };
        //Need to check if all data is available.
        addItem(itemData);
        $newItemTitle.val("");
        $newItemDesc.val("");
        $newItemImgLink.val("");
    });

    // Does a post to the signup route. If successful, we are redirected to the dashboard page
    // Otherwise we log any errors
    function signUpUser(user) {
        $.post("/api/signup", user)
            .then(function() {
                window.location.replace("/dashboard");

            })
            .catch(function(err) {
                console.log(err);
            });
    }

    function getBorrowingUser(borrowerID) {
        window.location.replace("/borrowing/" + borrowerID);
    }

    //Logs user out of their passport session.
    function logoutUser() {
        $.get("/logout")
            .then(function() {
                window.location.replace("/");

            })
            .catch(function(err) {
                console.log(err);
            });
    }

    //Changes availability of an item by it's ID. (ie. renting.)
    function rentItem(itemId) {
        $.post("/api/borrow", {id: itemId})
            .then(function() {
                window.location.replace("/search");
            })
            .catch(function(err) {
                console.log(err);
            });
    }

    //Makes a rented item available to rent again (ie. it's been returned.)
    function returnItem(itemId) {
        $.post("/api/lend", {id: itemId})
            .then(function() {
                window.location.replace("/dashboard");
            })
            .catch(function(err) {
                console.log(err);
            });
    }


    function addItem(item) {
        $.post("/api/items", item)
            .then(function() {
                window.location.replace("/dashboard");

            })
            .catch(function(err) {
                console.log(err);
            });
    }

    function loginUser(user) {
        $.post("/api/login", user)
            .then(function() {
                window.location.replace("/dashboard");

            })
            .catch(function(err) {
                console.log(err);
            });
    }
    
    
});

