var updatebtn = document.querySelector("#updatebtn");
var titleEl = document.querySelector("#titleEl");
var reviewEl = document.querySelector("#reviewEl");

// update submit butotn clicked
updatebtn.addEventListener("click", event => {
    event.preventDefault();
    // grab values and create object
    var blogId = updatebtn.value;
    var editBlog = {
        title: titleEl.value,
        review: reviewEl.value
    }
    console.log(blogId)
    // send object in fetch PUT request
    fetch((`/api/blogs/${blogId}`),{
        method:"PUT",
        body:JSON.stringify(editBlog),
        headers:{
            "Content-Type":"application/json"
        }
    }).then(res=>{
        if(res.ok){
            // if successful, show success modal
            var myModal = new bootstrap.Modal(document.getElementById('blogupdated'))
            myModal.show();
            $('#blogupdatedClose').on("click", function (event){
                event.preventDefault();
                location.href='/mylibrary'
            })
        } else {
            console.log('error occured')
            alert("please try again")
        }
    })
})