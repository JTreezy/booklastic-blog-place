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

    // check for data completion
    if (!bookTitle && !bookAuthor && !reviewTitle && !reviewComment) {
        alert('Oops! Please complete this page with a book title, book author, review title, and review!')
        return location.reload();
    } else if ((!bookTitle || !bookAuthor) && (!reviewTitle && !reviewComment)) {
        alert("Please enter both the book title and author to add a book to our database! Optionally, please add a genre.")
        return location.reload();
    } else if ((reviewTitle || reviewComment) && (!bookTitle || !bookAuthor)) {
        alert("We don't know what book your review is for! Please provide the book information.")
        return location.reload();
    } else {

    // SUBMISSION OF NEW BOOK
    const bookObj = {
        title: bookTitle,
        author: bookAuthor,
        // TODO: Singular v multiple genres
        genreId: bookGenre
    }
    fetch("/api/books", {
        method: "POST",
        body:JSON.stringify(bookObj),
        headers:{
            "Content-Type":"application/json"
        }
    }).then(res => {
        if(res.ok){
            alert('Book added to our database!')
            return res.json()
        } else {
            alert("Your book already exists in our database! Please select from the drop down.")
            location.href='/review'
        }
    }).then (data => {
        console.log(data)            
        // SUBMISSION OF NEW REVIEW
        if (!reviewTitle || !reviewComment) {
            alert('For your post, please enter both a title and a review!')
            location.href='/review'
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
                location.href='/mylibrary'
            } else {
                alert("error; please try again")
            }
        })
    })
    }
}
)