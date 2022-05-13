// turn on tooltip
$(function () {
    $('[data-toggle="tooltip"]').tooltip()
  })

// commit button, on click redirect to comment page and pass off blog id in parameters
$('.commentbtn').on("click", function (event) {
    event.preventDefault();
    var selectedItem = $(this);
    var blogId = selectedItem[0].value
    console.log('comments clicked for blog ' + blogId)
    location.href=`/reviewcomments/${blogId}`
})