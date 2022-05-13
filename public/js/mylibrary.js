// turn on tool tips
$(function () {
    $('[data-toggle="tooltip"]').tooltip()
  })

// on clicking delete button
$('.deletebtn').on("click", function (event) {
    event.preventDefault();
    var selectedItem = $(this);
    var blogId = selectedItem[0].value
    console.log('delete clicked for blog ' + blogId);
    // modal will open via data redirect in hbs
    // if confirm delete button in modal is clicked, 
    $('#confirmdelete').on("click", function (event) {
        // send fetch delete request
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

// button on modal confirming delete -> reload page 
$('#itemwasdeleted').on("click", function (event){
    event.preventDefault();
    location.reload();
})

// upon clicking edit button, redirect to update page for that post
$('.editbtn').on("click", function (event) {
    event.preventDefault();
    var selectedItem = $(this);
    var blogId = selectedItem[0].value
    console.log('edit clicked for blog ' + blogId)
    location.href=`/blogs/${blogId}`
})