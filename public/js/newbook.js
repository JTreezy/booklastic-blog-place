var genreselection = document.querySelector("#genreselection");
var newbooktitle = document.querySelector("#newbooktitle");
var newauthortitle = document.querySelector("#newauthortitle");

var newreviewTitle = document.querySelector("#newreviewTitle");
var newcomment = document.querySelector("#newcomment");

var newairplaneButton = document.querySelector("#newairplaneButton");

$(function () {
    $('[data-toggle="tooltip"]').tooltip()
  })

newairplaneButton.addEventListener("click", event => {
    event.preventDefault();
    let bookTitle = newbooktitle.value.trim();
    let bookAuthor = newauthortitle.value.trim();
    let numCheckbox = $(':checkbox');
    let checkedGenres = [];
    console.log(numCheckbox)
    for (i=0; i < numCheckbox.length; i++ ) {
        if (numCheckbox[i].checked) {
            checkedGenres.push(numCheckbox[i].value);
            }
    }
    console.log(checkedGenres)
    const reformatcheckedGenres = checkedGenres.map(str => {
        return Number(str);
    })
    console.log(reformatcheckedGenres)
    let reviewTitle = newreviewTitle.value.trim();
    let reviewComment = newcomment.value.trim();
    // check for data completion
    if (!bookTitle && !bookAuthor && !reviewTitle && !reviewComment) {
        var myModal = new bootstrap.Modal(document.getElementById('modalA'))
        myModal.show();
        $('#modalAclose').on("click", function (event){
            event.preventDefault();
            return;
        })
    } else if ((!bookTitle || !bookAuthor) && (!reviewTitle && !reviewComment)) {
        var myModal = new bootstrap.Modal(document.getElementById('modalB'))
        myModal.show();
        $('#modalBclose').on("click", function (event){
            event.preventDefault();
            return;
        })
    } else if ((reviewTitle || reviewComment) && (!bookTitle || !bookAuthor)) {
        var myModal = new bootstrap.Modal(document.getElementById('modalC'))
        myModal.show();
        $('#modalCclose').on("click", function (event){
            event.preventDefault();
            return;
        })
    } else {

    // SUBMISSION OF NEW BOOK
    const bookObj = {
        title: bookTitle,
        author: bookAuthor,
        genreIds: reformatcheckedGenres
    }
    fetch("/api/books", {
        method: "POST",
        body:JSON.stringify(bookObj),
        headers:{
            "Content-Type":"application/json"
        }
    }).then(res => {
        if(res.ok){
            var myModal = new bootstrap.Modal(document.getElementById('bookadded'))
            myModal.show();
            $('#bookaddedclose').on("click", function (event){
                event.preventDefault();
            }) 
            return res.json()
        } else {
            var myModal = new bootstrap.Modal(document.getElementById('bookexists'))
            myModal.show();
            $('#bookexistsclose').on("click", function (event){
                event.preventDefault();
                location.href='/review'
            })
        }
    }).then (data => {
        console.log(data)            
        // SUBMISSION OF NEW REVIEW
        if (!reviewTitle || !reviewComment) {
            var myModal = new bootstrap.Modal(document.getElementById('bookaddednoreview'))
            myModal.show();
            $('#bookaddednoreviewclose').on("click", function (event){
                event.preventDefault();
                location.href='/review'
            })
            return;
        }
        const blogObj = {
            title:reviewTitle,
            review:reviewComment,
            bookId: data.id
        }
        fetch("/api/blogs",{
            method:"POST",
            body:JSON.stringify(blogObj),
            headers:{
                "Content-Type":"application/json"
            }
        }).then(res=>{
            if(res.ok){
                var myModal = new bootstrap.Modal(document.getElementById('successfulreview'))
                myModal.show();
                $('#successfulreviewclose').on("click", function (event){
                    event.preventDefault();
                    location.href='/mylibrary'
                })
            } else {
                alert("error; please try again")
            }
        })
    })
    }
}
)