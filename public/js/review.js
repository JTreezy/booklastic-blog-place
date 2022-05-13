var bookList = document.querySelector("#bookList");
var bookSubmit = document.querySelector("#bookSubmit");
const airplaneButton = document.querySelector("#airplaneButton");
var bookInput = document.querySelector("#bookInput");
var autopopTitle = document.querySelector("#autopopTitle");
var autopopAuth = document.querySelector("#autopopAuth");
var reviewTitle = document.querySelector("#reviewTitle");
var reviewComemnt = document.querySelector("#comment");
var autopopulatecontainer = document.querySelector("#autopopulatecontainer");

// turn on tooltips
$(function () {
    $('[data-toggle="tooltip"]').tooltip()
  })

pageLoad();

// on page load, get request for all books; create datalist option for each one
function pageLoad() {
    fetch("/api/books", {
        method: "GET",
        body: JSON.stringify()
    }).then (res => {
        if (res.ok) {
            return res.json()
        } else {
            console.log('error occured')
        }
    }).then((data) => { 
            for (i=0; i < data.length; i++){
                var book = data[i]
                const newOptionEl = document.createElement('option');
                newOptionEl.setAttribute('value', book.title);
                newOptionEl.setAttribute('data-id', book.id);
                bookList.append(newOptionEl)
            }
        })
}

// book submit button clicked
bookSubmit.addEventListener("click", event => {
    // trim input 
    thisBook = bookInput.value.trim();
    // if empty, send modal and redirect to newbook page
    if (!thisBook) {
        var myModal = new bootstrap.Modal(document.getElementById('booknotinDB'))
        myModal.show();
        $('#booknotinDBclose').on("click", function (event){
            event.preventDefault();
            location.href='/newbook'
        })
        return;
    }
    event.preventDefault();
    // create object with book
    var bookSelection = {
        title:thisBook};
    // send post request to find book by its title
    fetch("/api/books/findbytitle",{
        method:"POST",
        body:JSON.stringify(bookSelection),
        headers:{
            "Content-Type":"application/json"
        }
    }).then(res=>{
        if(res.ok){ 
            return res.json()
        } else {
            // if book is not in our system, redirect to newbook page
            var myModal = new bootstrap.Modal(document.getElementById('booknotinDB'))
            myModal.show();
            $('#booknotinDBclose').on("click", function (event){
                event.preventDefault();
                location.href='/newbook'
            })
        }
    }).then(data => {
        // load selected book title and author to bottom half of page (where the review section is) - element was previously hidden so showing it
        autopopulatecontainer.setAttribute('class', 'container')
        autopopTitle.textContent=data.title;
        autopopAuth.textContent=data.author;
        autopopTitle.setAttribute('value', data.id);
        
    })
})

// review submit button clicked
airplaneButton.addEventListener("click",e=>{
    e.preventDefault()
    // trim title and review
    let title = reviewTitle.value
    title = title.trim(); 
    let review = comment.value;
    review = review.trim();
    // if either are empty, show modal
    if (!title || !review || !autopopTitle.value) {
        var myModal = new bootstrap.Modal(document.getElementById('reviewincomplete'))
        myModal.show();
        return;
    }
    // create object for review post using book id pulled from the title
    const blogObj = {
        title:title,
        review:review,
        bookId:autopopTitle.value
    }
    // send post request with new post
    fetch("/api/blogs",{
        method:"POST",
        body:JSON.stringify(blogObj),
        headers:{
            "Content-Type":"application/json"
        }
    }).then(res=>{
        if(res.ok){
            // if successful, show success modal and redirect to my library
            var myModal = new bootstrap.Modal(document.getElementById('reviewcreated'))
            myModal.show();
            $('#reviewcreatedclose').on("click", function (event){
                event.preventDefault();
                location.href='/mylibrary'
            })
        } else {
            console.log('error occured')
            alert("please try again")
        }
    })
})