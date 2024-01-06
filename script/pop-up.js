$(document).ready(function(){
    // Handle button clicks
    $(".read-more-btn").click(function(){
      var contentBlock = $(this).siblings(".card-body").html();
      $("#modalBody").html(contentBlock);
    });
  });