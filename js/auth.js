firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
  $('#logOutButton').show();
    $("login_cover").hide();
    var dialog = document.querySelector('#loginDialog');
    if (! dialog.showModal) {
    dialogPolyfill.registerDialog(dialog);
  }
    dialog.close();
    
    // $('#signout').show();
  } else {
    $('#logOutButton').hide();
    $('.login-cover').show();
    // No user is signed in.
    var dialog = document.querySelector('#loginDialog');
    if (! dialog.showModal) {
    dialogPolyfill.registerDialog(dialog);
  }
  dialog.showModal();
  }
});

  // login user
$('#loginButton').click(
  function(){
  var email = $('#loginEmail').val();
  var password = $('#loginPassword').val();


  if (email != "" && password != "")
  {
    $("#loginProgress").show();
    // $("#loginButton").hide();

  firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error){

    $("#loginError").show().text(error.message);
    $("#loginProgress").hide();
    // $("#loginButton").show();
  });
  }
});
// logout
$('#logOutButton').click( function(){
  firebase.auth().signOut().then(function() {
    // signout success
    $('#loginEmail').reset();
;  },
  function(error){
    alert(error.message)
  });
});
