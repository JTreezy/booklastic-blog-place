$(function () {
    $('[data-toggle="tooltip"]').tooltip()
  })

$('.commentbtn').on("click", function (event) {
    event.preventDefault();
    var selectedItem = $(this);
    var blogId = selectedItem[0].value
    console.log('comments clicked for blog ' + blogId)
    location.href=`/reviewcomments/${blogId}`
})