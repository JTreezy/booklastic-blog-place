var genreselection = document.querySelector("#genreselection");
var newbooktitle = document.querySelector("#newbooktitle");
var newauthortitle = document.querySelector("#newauthortitle");

var newreviewTitle = document.querySelector("#newreviewTitle");
var newcomment = document.querySelector("#newcomment");

var newairplaneButton = document.querySelector("#newairplaneButton");

newairplaneButton.addEventListener("click", event => {
    event.preventDefault();
    let bookTitle = newbooktitle.value.trim();
    let bookAuthor = newauthortitle.value.trim();
    let bookGenre = genreselection.value;
    let reviewTitle = newreviewTitle.value.trim();
    let reviewComment = newcomment.value.trim();
// TODO:technically, someone could access this page by going to the URL and then enter a duplicate book
    // SUBMISSION OF NEW BOOK
    if (!bookTitle || !bookAuthor) {
        alert('Please enter both the book title and author! Optionally, please add a genre.')
        return;
    }
    const bookObj = {
        title: bookTitle,
        author: bookAuthor,
        // NEED GENRES TO HAVE GENREID
        // genreId: 
    }
    fetch("/api/books", {
        method: "POST",
        body:JSON.stringify(bookObj),
        headers:{
            "Content-Type":"application/json"
        }
    }).then(res => {
        if(res.ok){
            return res.json()
            console.log('yay')
        } else {
            alert("error; please try again")
        }
    }).then (data => {
        console.log(data)            
        // SUBMISSION OF NEW REVIEW
        if (!reviewTitle || !reviewComment) {
            alert('Please select a book then enter both a title and a review!')
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
                console.log('YAY')
                location.href='/mylibrary'
            } else {
                alert("error; please try again")
            }
        })
    })
    }
)