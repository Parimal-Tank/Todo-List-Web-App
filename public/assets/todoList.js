$(document).ready(function(){

  $('form').on('submit', function(){

      let item = $('form input');
      let todo = {item: item.val()};

      $.ajax({
        type: 'POST',
        url: '/todo',
        data: todo,
        success: function(data){
          //do something with the data via front-end framework
          // window.href();
          location.reload();
          console.log(data);
        }
      });
      return false;
  });

  $('li').on('click', function(){
    var item = $(this).text().replace(/ /g, "");
    console.log(item);
    alert(item);
    $.ajax({
      type: "DELETE",
      url: "/todo/" + item,
      success: function (data) {
        //do something with the data via front-end framework
        //   location.reload();
        location.href = "/todo";
      },
    });
  });

});