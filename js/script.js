let serverURL;
let serverPort;
let url;
let editing = false;

$.ajax({
  url: 'config.json',
  type: 'GET',
  dataType: 'json',
  success:function(keys){
    serverURL = keys.SERVER_URL;
    serverPort = keys.SERVER_PORT;
    url = `${keys.SERVER_URL}:${keys.SERVER_PORT}`;
    showWorkCards();
  },
  error: function(){
    console.log('cannot find config.json file, cannot run application');
  }
});

showWorkCards = () => {
  $.ajax({
    url: `${url}/allWork`,
    type: 'GET',
    dataType: 'json',
    success:function(data) {
      $("#workList").empty();
      console.log(data);
      for (var i = 0; i < data.length; i++) {

        let workCard = `<div class="col-12 col-sm-6 col-md-4 mb-3 mt-3 text-center">
                        <div class="card h-100 workItem" data-id="${data[i]._id}">
                        <div class="card-body">
                          <img src="${data[i].imageUrl}" class="card-img-top" alt="">
                          <h5 class="card-title">${data[i].title}</h5>
                          <h6 class="card-subtitle mb-2 text-muted">${data[i].author}</h6>
                          <a href="${data[i].url}"><p class="card-text">Click here to check out the website!</p></a>`;
                          if(sessionStorage.userName){
                            if(sessionStorage.userID === data[i].user_id){
                            workCard += `<button type="button" class="btn btn-secondary editBtn">Edit</button>
                                          <button type="button" class="btn btn-secondary deleteBtn">Delete</button>`;
                            }
                          }
                    workCard += `</div>
                                  </div>
                                  </div>`;

          $("#workList").append(workCard);
      }
    },
    error: function(err){
      console.log(err);
      console.log('something went wrong with getting all the products');
    }
  });
};

$(document).ready(function(){
  console.log(sessionStorage);

  if(sessionStorage.userName){
    console.log('you are now logged in');
    $('#modalBtn').hide();
    $('#logoutBtn').removeClass('d-none');
    $('#addWorkSection').removeClass('d-none');
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
    if(editing === true){
      const id = $('#workID').val();
      $.ajax({
        url: `${url}/product/${id}`,
        type: 'PATCH',
        data: {
          name: productName,
          price: productPrice,
          userId: sessionStorage.userId
        },
        success:function(result){
          console.log(result);
          $('#workTitleInput').val(null);
          $('#workImageURLInput').val(null);
          $('#workAuthorInput').val(null);
          $('#workURLInput').val(null);
          $('#addProductButton').text('Submit').removeClass('btn-warning');
          $('#heading').text('Add Work');
          editing = false;
          const allWork = $('.workItem');
          allProducts.each(function(){
            if($(this).data('id') === id){
              $(this).find('.productName').text(productName);
            }
          });
        },
        error: function(err){
          console.log(err);
          console.log('something went wront with editing the product');
        }
      });
    } else {
    $.ajax({
      url: `${url}/addWorkItem`,
      type: 'POST',
      data: {
        title: workTitle,
        imageUrl: workImageURL,
        author: workAuthor,
        url: workURL,
        userID: sessionStorage.userID
      },
      success:function(result){
        $('#workTitleInput').val(null);
        $('#workImageURLInput').val(null);
        $('#workAuthorInput').val(null);
        $('#workURLInput').val(null);
        console.log(sessionStorage.userID);
          $('#workList').append(`<div class="col-12 col-sm-6 col-md-4 mb-3 mt-3 text-center">
                          <div class="card h-100 workItem" data-id="${result._id}">
                          <div class="card-body">
                            <img src="${result.imageUrl}" class="card-img-top" alt="">
                            <h5 class="card-title">${result.title}</h5>
                            <h6 class="card-subtitle mb-2 text-muted">${result.author}</h6>
                            <a href="${result.url}"><p class="card-text">Click here to check out the website!</p></a>
                            <button type="button" class="btn btn-secondary editBtn">Edit</button>
                            <button type="button" class="btn btn-secondary deleteBtn">Delete</button></div></div></div>`);
      },
      error:function(err){
        console.log(err);
        console.log('oops, something went wrong');
      }
    });
  }
}
});

$('#workList').on('click', '.editBtn', function() {
  event.preventDefault();
  if (!sessionStorage.userID) {
    alert('401, permission denied');
    return;
  }
  const id = $(this).parent().parent().data('id');
  console.log(id);
  $.ajax({
    url: `${url}/work/${id}`,
    type: 'post',
    data: {
      userID: sessionStorage.userID
    },
    dataType: 'json',
    success:function(result){
      console.log(result);
      $('#workTitleInput').val(result.title);
      $('#workImageURLInput').val(result.imageUrl);
      $('#workAuthorInput').val(result.author);
      $('#workURLInput').val(result.url);
      $('#workID').val(result._id);
      $('#addWorkItemBtn').text('Edit Work').addClass('btn-warning');
      $('#heading').text('Edit Work');
      editing = true;
    },
    error:function(err){
      console.log(err);
      console.log('something went wrong with getting the single product');
    }
  });
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
      url: `${url}/users`,
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
      url: `${url}/loginUser`,
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
          $('#addWorkSection').removeClass('d-none');
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
  $('#addWorkSection').addClass('d-none');
});
