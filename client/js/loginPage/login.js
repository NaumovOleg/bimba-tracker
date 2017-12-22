/**
 * author Oleg .
 */

$(document).ready( function (  ) {

    (function (  ) {
        var emailInput = $('#email');
        var passwordInput = $('#password');

        var loginButton = $('#login');
        loginButton.on('click', function (  ) {

            var body = {
                email: emailInput.val(),
                password:passwordInput.val()
            }

            ipsRenderer.send('login', body )

        })
    })()



})


