let serverURL;
let serverPort;
let url;

$.ajax({
  url: 'config.json',
  type: 'GET',
  dataType: 'json',
  success:function(keys){
    serverURL = keys['SERVER_URL'];
    serverPort = keys['SERVER_PORT'];
    url = `${keys['SERVER_URL']}:${keys['SERVER_PORT']}`;
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
                        <div class="card h-100">
                        <div class="card-body">
                          <img src="${data[i].imageUrl}" class="card-img-top" alt="">
                          <h5 class="card-title">${data[i].title}</h5>
                          <h6 class="card-subtitle mb-2 text-muted">${data[i].author}</h6>
                          <a href="${data[i].url}"><p class="card-text">Click here to check out the website!</p></a>
                          <a href="#" class="card-link">Edit</a>
                          <a href="#" class="card-link">Delete</a>
                        </div>
                        </div>
                        </div>`

                        $("#workList").append(workCard);
      }
    },
    error: function(err){
      console.log(err);
      console.log('something went wrong with getting all the products');
    }
  })
}

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
      url: `${url}/addWorkItem`,
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
        $('#workAuthorInput').val(null);
        $('#workURLInput').val(null);
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
