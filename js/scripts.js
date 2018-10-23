const table = document.getElementsByTagName("table");



class Employee {
  constructor(firstname, lastname, hours) {
    this.firstname = firstname;
    this.lastname = lastname;
    this.hours = hours;
    // this.date = date;
  }
  // get hours(){
  //   return this._hours;
  // }
  // set hours(hours){
  //   this._hours = hours;
  // }
  get date(){
    return this._date;
  }
  set date(date){
    this._date = date;
  }
}
let employees = [];
$(function() {






  // This button will increment the value
  $('[data-quantity="plus"]').click(function(e) {
    // Stop acting like a button
    e.preventDefault();
    // Get the field name
    fieldName = $(this).attr('data-field');
    // Get its current value
    var currentVal = parseInt($('input[name=' + fieldName + ']').val());
    // If is not undefined
    if (!isNaN(currentVal)) {
      // Increment
      $('input[name=' + fieldName + ']').val(currentVal + 1);
      // $('tr').html('<td>' + currentVal + '</td>')
    } else {
      // Otherwise put a 0 there
      $('input[name=' + fieldName + ']').val(0);
    }

  });
  // This button will decrement the value till 0
  $('[data-quantity="minus"]').click(function(e) {
    // Stop acting like a button
    e.preventDefault();
    // Get the field name
    fieldName = $(this).attr('data-field');
    // Get its current value
    var currentVal = parseInt($('input[name=' + fieldName + ']').val());
    // If it isn't undefined or its greater than 0
    if (!isNaN(currentVal) && currentVal > 0) {
      // Decrement one
      $('input[name=' + fieldName + ']').val(currentVal - 1);
    } else {
      // Otherwise put a 0 there
      $('input[name=' + fieldName + ']').val(0);
    }

  });









  $('#addEmployeeBtn').click(function() {
    var dialog = document.querySelector('#addEmployeeDialog');
    if (!dialog.showModal) {
      dialogPolyfill.registerDialog(dialog);
    }
    $('#submitButton').click(function() {
      dialog.close();
    })
    dialog.showModal();
  });

  // adding employee first na
  $('#submitButton').on('click', function(event) {
    var $firstname = $('#firstname').val();
    var $lastname = $('#lastname').val();
    var $hours = 0;
    var $date = $('#date').val();
    console.log('JOPE');
    var employeedata = new Employee($firstname, $lastname, $hours);

    var firebaseRef = firebase.database().ref('employee');
    firebaseRef.push().set(employeedata);

  });


  // date dialog
  $('#addDateButton').click(function() {
    var dialog = document.querySelector('#addDateDialog');
    if (!dialog.showModal) {
      dialogPolyfill.registerDialog(dialog);

    }
    $('#submitDateButton').click(function() {
      dialog.close();
    })
    dialog.showModal();
  });
  $('#submitDateButton').on('click', function(event) {
    database = firebase.database();
    var ref = database.ref('employee');
    ref.on('value', function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
      var childKey = childSnapshot.key;
      var childData = childSnapshot.val();
      console.log(childKey);

      // ...

    var $hours = $('#hours').val();
    var $date = $('#date').val();


    var firebaseRef = firebase.database().ref('employee/' + childKey);
    firebaseRef.update({date : $date, hours: $hours});
  });
})

});



  //retrieve the data

  database = firebase.database();
  var ref = database.ref('employee');
    // console.log(Object.keys(ref.val());
  ref.on("child_added", snap => {

    var firstname = snap.child("firstname").val();
    var lastname = snap.child("lastname").val();
    var hours = snap.child("hours").val();
    var date = snap.child("date").val();
console.log(firstname);

    $('#displayDate').html('<div>' + date + '</div>');
    $('tbody').append('<tr><td>' + firstname + '</td>' + '<td>' + lastname + '</td>' + '<td contenteditable = "true" id = "hours">' + hours + '</td>' + '<td>' + 'hello' + '</td>' + '<tr>');
    // var oldPostKey = firebase.database().ref().child('hours').key;

  });

  // $(document).on('focusout', updateFireBase)
  // function updateFireBase() {
  //   if ($(this).attr('text') == true) {
  //     return false;
  //   }
  //   const firebaseRef = firebase.database().ref()
  //   var $firstname = $('#firstname').text();
  //   var $lastname = $('#lastname').text();
  //   var $hours = $('#hours').text();
  //   var $date = $('#date').text();
  //   var employeedata = new Employee($firstname, $lastname, $hours, $date);
  //   return firebaseRef.child('employee').update(employeedata);
  // }

  // ref.on("child_changed", snap => {
  //   var firstname = snap.child("firstname").val();
  //   var lastname = snap.child("lastname").val();
  //   var hours = snap.child("hours").val();
  //   $('tbody').append('<tr><td>' + firstname + '</td>' + '<td>' + lastname + '</td>' + '<td contenteditable = "true">' + hours + '</td><tr>');
  // });
  // function gotData(data)
  // {
  //   var tablebody = document.getElementById("tablebody");
  //   // tablebody.forEach(function(list){
  //   //   list.remove();
  //   // });
  //   while(tablebody.hasChildNodes()){
  //   tablebody.removeChild(tablebody.firstChild);
  //   }
  //   // console.log(data.val());
  //   var worker = data.val();
  //   var keys = Object.keys(worker);
  //   keys.forEach(function(key){
  //     var firstname = worker[key].firstname
  //     var lastname =worker[key].lastname;
  //     var hours =worker[key].hours;
  //     console.log(firstname, lastname, hours);
  //      $('#tablebody').append('<tr><td>' + firstname + '</td>' + '<td>' + lastname + '</td>' + '<td contenteditable = "true">' + hours + '</td><tr>');
  //   });
  // }
  function errData(err) {
    console.log('Error!');
    console.log(err);
  }

})
