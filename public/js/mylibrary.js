$(function () {
    $('[data-toggle="tooltip"]').tooltip()
  })

$('.deletebtn').on("click", function (event) {
    event.preventDefault();
    var selectedItem = $(this);
    var blogId = selectedItem[0].value
    console.log('delete clicked for blog ' + blogId);
    $('#confirmdelete').on("click", function (event) {
        fetch((`/api/blogs/${blogId}`),{
            method:"DELETE",
        }).then(res=>{
            if(res.ok){
                return(res.json())
            } else {
                alert("please try again")
            }
        })
    })
})

$('#itemwasdeleted').on("click", function (event){
    event.preventDefault();
    location.reload();
})

$('.editbtn').on("click", function (event) {
    event.preventDefault();
    var selectedItem = $(this);
    var blogId = selectedItem[0].value
    console.log('edit clicked for blog ' + blogId)
    location.href=`/blogs/${blogId}`
})