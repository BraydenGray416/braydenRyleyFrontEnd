$(document).ready(function(){
  console.log(sessionStorage);

  if(sessionStorage.userName){
    console.log('you are now logged in');
    $('#modalBtn').hide();
    $('#logoutBtn').removeClass('d-none');
  }else {
    console.log('please sign in');
  }
});

$('#addWorkItemBtn').click(function(){
  event.preventDefault();
  let workTitle = $('#workTitleInput').val();
  let workImageURL = $('#workImageURLInput').val();
  let workAuthor = $('#workAuthorInput').val();
  let workURL = $('#workURLInput').val();
  if(workTitle.length === 0){
    console.log('Please give a title for this project');
  }else if(workImageURL.length === 0){
    console.log('Please give an image URL for this project');
  }else if(workAuthor.length === 0){
    console.log('Please give an author for this project');
  }else if(workURL.length === 0){
    console.log('Please give a URL for this project');
  }else {
    $.ajax({
      url: 'http://localhost:3000/addWorkItem',
      type: 'POST',
      data: {
        title: workTitle,
        imageUrl: workImageURL,
        author: workAuthor,
        url: workURL,
      },
      success:function(result){
        $('#workTitleInput').val(null);
        $('#workImageURLInput').val(null);
        $('#workAuthor').val(null);
        $('#workURL').val(null);
        console.log(workTitle);
        console.log(workImageURL);
        console.log(workAuthor);
        console.log(workURL);
      },
      error:function(err){
        console.log(err);
        console.log('oops, something went wrong');
      }
    });
  }
});

$('#modalBtn').click(function(){
  $('#authForm').modal('show');
});

$('#loginTabBtn').click(function(){
    event.preventDefault();
    $('.nav-link').removeClass('active');
    $(this).addClass('active');
    $('#loginForm').show();
    $('#registerForm').hide();
});

$('#registerTabBtn').click(function(){
    event.preventDefault();
    $('.nav-link').removeClass('active');
    $(this).addClass('active');
    $('#loginForm').hide();
    $('#registerForm').removeClass('d-none').show();
});

$('#registerForm').submit(function(){
  event.preventDefault();
  let username = $('#registerUsername').val();
  let email = $('#registerEmail').val();
  let password = $('#registerPassword').val();
  let confirmPassword = $('#confirmPassword').val();
  if(username.length === 0){
    console.log('please enter a username for register');
  }else if(email.length === 0){
    console.log('please enter a password for register');
  }else if(password.length === 0){
    console.log('please enter an email');
  }else if(confirmPassword.length === 0){
    console.log('please confirm a password');
  }else if(password !== confirmPassword){
    console.log('your password does not match your confirm password');
  }else {
    $.ajax({
      url: 'http://localhost:3000/users',
      type: 'POST',
      data: {
        username: username,
        email: email,
        password: password
      },
      success:function(result){
        console.log(result);
      },
      error:function(err){
        console.log(err);
        console.log('something went wrong with register a new user');
      }
    });
  }
});

$('#loginForm').submit(function(){
  event.preventDefault();
  let username = $('#loginUsername').val();
  let password = $('#loginPassword').val();
  if(username.length === 0){
    console.log('please enter a username');
  }else if(password.length === 0){
    console.log('please enter a password');
  }else {
    $.ajax({
      url: 'http://localhost:3000/loginUser',
      type: 'POST',
      data: {
        username: username,
        password: password
      },
      success:function(result){
        if(result === 'invalid user'){
          console.log('cannot fnd user with that username');
        }else if(result === 'invalid password'){
          console.log('password is incorrect');
        }else {
          console.log('let us log you in');
          console.log(result);

          sessionStorage.setItem('userID', result._id);
          sessionStorage.setItem('userName', result.username);
          sessionStorage.setItem('userEmail', result.email);
          $('#authForm').modal('hide');
          $('#modalBtn').hide();
          $('#logoutBtn').removeClass('d-none');
        }
      },
      error:function(err){
        console.log(err);
        console.log('there was an error with logging in');
      }
    });
  }
});

$('#logoutBtn').click(function(){
  sessionStorage.clear();
  $('#modalBtn').show();
  $('#logoutBtn').addClass('d-none');
  console.log(sessionStorage);
});
