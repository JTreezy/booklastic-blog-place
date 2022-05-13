var genreselection = document.querySelector("#genreselection");
var newbooktitle = document.querySelector("#newbooktitle");
var newauthortitle = document.querySelector("#newauthortitle");

var newreviewTitle = document.querySelector("#newreviewTitle");
var newcomment = document.querySelector("#newcomment");

var newairplaneButton = document.querySelector("#newairplaneButton");

// turn on tool tips
$(function () {
    $('[data-toggle="tooltip"]').tooltip()
  })

//   upon clicking submit button 
newairplaneButton.addEventListener("click", event => {
    event.preventDefault();
    // grab title and authors
    let bookTitle = newbooktitle.value.trim();
    let bookAuthor = newauthortitle.value.trim();
    // genre check boxes - first create variable of all checkboxes
    let pageCheckboxes = $(':checkbox');
    // empty array for checked
    let checkedGenres = [];
    // for loop iterating over all the checkboxes
    for (i=0; i < pageCheckboxes.length; i++ ) {
        // if checked, push its value to checkedGenre array
        if (pageCheckboxes[i].checked) {
            checkedGenres.push(pageCheckboxes[i].value);
            }
    }
    // reformat from array of strings to numbers
    const reformatcheckedGenres = checkedGenres.map(str => {
        return Number(str);
    })
    // trim review title and comment
    let reviewTitle = newreviewTitle.value.trim();
    let reviewComment = newcomment.value.trim();
    // check for data completion - if all empty send appropriate modal
    if (!bookTitle && !bookAuthor && !reviewTitle && !reviewComment) {
        var myModal = new bootstrap.Modal(document.getElementById('modalA'))
        myModal.show();
        $('#modalAclose').on("click", function (event){
            event.preventDefault();
            return;
        })
        // if there missing book title OR author and review section was empty, send appropriate modal
    } else if ((!bookTitle || !bookAuthor) && (!reviewTitle && !reviewComment)) {
        var myModal = new bootstrap.Modal(document.getElementById('modalB'))
        myModal.show();
        $('#modalBclose').on("click", function (event){
            event.preventDefault();
            return;
        })
        // if typed in review section but left out necessary book information, send appropriate modal
    } else if ((reviewTitle || reviewComment) && (!bookTitle || !bookAuthor)) {
        var myModal = new bootstrap.Modal(document.getElementById('modalC'))
        myModal.show();
        $('#modalCclose').on("click", function (event){
            event.preventDefault();
            return;
        })
    } else {

    // SUBMISSION OF NEW BOOK (even if review incomplete)
    // create book object
    const bookObj = {
        title: bookTitle,
        author: bookAuthor,
        genreIds: reformatcheckedGenres
    }
    // send fetch post request
    fetch("/api/books", {
        method: "POST",
        body:JSON.stringify(bookObj),
        headers:{
            "Content-Type":"application/json"
        }
    }).then(res => {
        if(res.ok){
            // if successful, show booked added modal and 
            var myModal = new bootstrap.Modal(document.getElementById('bookadded'))
            myModal.show();
            $('#bookaddedclose').on("click", function (event){
                event.preventDefault();
            }) 
            return res.json()
        } else {
            // if unsuccessful because book already exists and cant send duplicate title as book title must be unique, show this modal
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
        // if either review title or comment are empty send incomplete (but book added) modal and redirect to review page as the book is now in the drop down list. 
        if (!reviewTitle || !reviewComment) {
            var myModal = new bootstrap.Modal(document.getElementById('bookaddednoreview'))
            myModal.show();
            $('#bookaddednoreviewclose').on("click", function (event){
                event.preventDefault();
                location.href='/review'
            })
            return;
        }
        // create blog object with the data and send post request
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
                // if successful, show in modal and redirect to my library 
                var myModal = new bootstrap.Modal(document.getElementById('successfulreview'))
                myModal.show();
                $('#successfulreviewclose').on("click", function (event){
                    event.preventDefault();
                    location.href='/mylibrary'
                })
            } else {
                console.log('error occured')
            }
        })
    })
    }
}
)