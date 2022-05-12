var updatebtn = document.querySelector("#updatebtn");
var titleEl = document.querySelector("#titleEl");
var reviewEl = document.querySelector("#reviewEl");

updatebtn.addEventListener("click", event => {
    event.preventDefault();
    var blogId = updatebtn.value;
    var editBlog = {
        title: titleEl.value,
        review: reviewEl.value
    }
    console.log(blogId)
    fetch((`/api/blogs/${blogId}`),{
        method:"PUT",
        body:JSON.stringify(editBlog),
        headers:{
            "Content-Type":"application/json"
        }
    }).then(res=>{
        if(res.ok){
            console.log("blog updated")
            var myModal = new bootstrap.Modal(document.getElementById('blogupdated'))
            myModal.show();
            $('#blogupdatedClose').on("click", function (event){
                event.preventDefault();
                location.href='/mylibrary'
            })
        } else {
            alert("please try again")
        }
    })
})