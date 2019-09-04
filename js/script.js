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
