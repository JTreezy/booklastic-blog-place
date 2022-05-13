// turn on tooltip
$(function () {
    $('[data-toggle="tooltip"]').tooltip()
  })

var hiddenEl = document.querySelector("#hiddenEl");
var newcomment = document.querySelector("#newcomment");
var airplaneButton = document.querySelector("#airplaneButton");

// upon submitting comment
airplaneButton.addEventListener("click", event => {
    event.preventDefault();
// trim input in box; if empty send modal message
    var commentbody = newcomment.value.trim();
    if (!commentbody) {
        var myModal = new bootstrap.Modal(document.getElementById('emptycomment'))
        myModal.show();
        return;
    }
//  grab id for the blog post that the comment belongs to 
    var blogId = hiddenEl.getAttribute('data-id')
// create comment object with the text input and the blog id
    var commentObj = {
        body: commentbody,
        blogId: blogId
    }
// send post request 
    fetch(`/api/comments`, {
        method:"POST", 
        body: JSON.stringify(commentObj),
        headers:{
            "Content-Type":"application/json"
        }
    }).then(res=> {
        // if successful, modal showing success and reload page
        if (res.ok) {
            var myModal = new bootstrap.Modal(document.getElementById('commentcreated'))
            myModal.show();
            $('#commentcreatedclose').on("click", function (event){
                event.preventDefault();
                location.reload();
            })
        // else console log unsuccessful
        } else {
            console.log('error occured')
        }
    })
})