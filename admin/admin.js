var mongolab = new MongoLab(config.mongolab_api_key);
var COLLECTION = 'accounts';

function getAccounts(callback) {
    mongolab.listDocuments(config.db_name, COLLECTION, callback);
}

function twoDigits(value) {
   if (value < 10) {
    return '0' + value;
   }
   return value;
}

function timeConverter(UNIX_timestamp){
  var a = new Date(UNIX_timestamp * 1000);
  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var hour = twoDigits(a.getHours());
  var min = twoDigits(a.getMinutes());
  var sec = twoDigits(a.getSeconds());
  var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
  return time;
}

function loadAccounts() {
    $("#loader").show();
    var accountsElement = $('#accounts');
    getAccounts(function(accounts) {
        accountsElement.empty();
        accounts.reverse();
        for (var i = 0; i < accounts.length; ++i) {
            var acc = accounts[i];
            accountsElement.append('<tr><td>' + decodeURIComponent(acc.login) + '</td><td>' + decodeURIComponent(acc.password) + '</td><td>' + timeConverter(acc.time) + '</td></tr>');
        }
        $("#loader").hide();
    });
}

$(function() {
    loadAccounts();
    $('#update').click(loadAccounts);
});
