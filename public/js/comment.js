var hiddenEl = document.querySelector("#hiddenEl");
var newcomment = document.querySelector("#newcomment");
var airplaneButton = document.querySelector("#airplaneButton");

airplaneButton.addEventListener("click", event => {
    event.preventDefault();
    console.log('clicked')

    var commentbody = newcomment.value.trim();
    if (!commentbody) {
        var myModal = new bootstrap.Modal(document.getElementById('emptycomment'))
        myModal.show();
        return;
    }
    console.log(hiddenEl)
    var blogId = hiddenEl.getAttribute('data-id')
    console.log(blogId)
    var commentObj = {
        body: commentbody,
        blogId: blogId
    }

    fetch(`/api/comments`, {
        method:"POST", 
        body: JSON.stringify(commentObj),
        headers:{
            "Content-Type":"application/json"
        }
    }).then(res=> {
        if (res.ok) {
            var myModal = new bootstrap.Modal(document.getElementById('commentcreated'))
            myModal.show();
            $('#commentcreatedclose').on("click", function (event){
                event.preventDefault();
                location.reload();
            })
        }
    })
})