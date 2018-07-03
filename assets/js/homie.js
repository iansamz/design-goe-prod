$(document).ready(function() {
    // $('#btn').click(function() {
    //     $("#notif-err").removeClass('hidden');
    //     $("#notif-suc").removeClass('hidden');
    // });
});

function sendHomie(type, package) {

    var okayEmail = false;
    var okayName = false;
    var okayInfo = false;

    var name = document.forms["homie"]["name"].value;
    var fname = document.getElementById('fname');

    if (name == "" || name == null) {
        fname.innerHTML = "Please enter your name";
        okayName = false;
    } else {
        fname.innerHTML = "";
        okayName = true;
    };

    var email = document.forms["homie"]["email"].value;
    var femail = document.getElementById('femail');
    var regex = /\b[A-Z0-9._%+-]+@(?:[A-Z0-9-]+\.)+[A-Z]{2,20}\b/gi;
    // /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (email == "" || email == null) {
        femail.innerHTML = "Please enter your email";
        okayEmail = false;
    } else {
        femail.innerHTML = "";
        if (regex.test(email)) {
            okayEmail = true;
        } else {
            femail.innerHTML = "Please enter valid email";
            okayEmail = false;
        };
    };

    var info = document.forms["homie"]["info"].value;
    var finfo = document.getElementById('finfo');
    if (info == "" || info == null) {
        finfo.innerHTML = "Please enter your info";
        okayInfo = false;
    } else {
        finfo.innerHTML = "";
        okayInfo = true;
    };

    var sendbtn = document.getElementById('btn');

    if (okayName == true && okayEmail == true && okayInfo == true) {
        sendbtn.innerHTML = "Sending...";
        var accRef = firebase.database().ref('enquiries').push();

        accRef.set({
            name: name,
            email: email,
            info: info,
            type: type,
            package: package

        }, function(error) {
            if (error) {
                $("#notif-err").removeClass('hidden');
                sendbtn.innerHTML = "Send Messgae";
            } else {
                sendbtn.innerHTML = "Send Message";
                $("#notif-suc").removeClass('hidden');
            }
        });
    }
}