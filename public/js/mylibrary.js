// var deletebtn = document.querySelector(".deletebtn");
// var editbtn = document.querySelector("editbtn");

$('.deletebtn').on("click", function (event) {
    event.preventDefault();
    var selectedItem = $(this);
    var blogId = selectedItem[0].value
    console.log('delete clicked for blog ' + blogId)
    fetch((`/api/blogs/${blogId}`),{
        method:"DELETE",
    }).then(res=>{
        if(res.ok){
            console.log("blog deleted")
            location.href="/mylibrary"
        } else {
            alert("please try again")
        }
    })
})

$('.editbtn').on("click", function (event) {
    event.preventDefault();
    var selectedItem = $(this);
    var blogId = selectedItem[0].value
    console.log('edit clicked for blog ' + blogId)
    location.href=`/blogs/${blogId}`
    // fetch((`/api/blogs/${blogId}`),{
    //     method:"PUT",
    // }).then(res=>{
    //     if(res.ok){
    //         console.log("blog deleted")
    //         location.href="/mylibrary"
    //     } else {
    //         alert("please try again")
    //     }
    // })
})