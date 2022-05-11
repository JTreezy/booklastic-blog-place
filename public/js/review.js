var bookList = document.querySelector("#bookList");
var bookSubmit = document.querySelector("#bookSubmit");
const airplaneButton = document.querySelector("#airplaneButton");
var bookInput = document.querySelector("#bookInput");
var autopopTitle = document.querySelector("#autopopTitle");
var autopopAuth = document.querySelector("#autopopAuth");
var reviewTitle = document.querySelector("#reviewTitle");
var reviewComemnt = document.querySelector("#comment");

pageLoad();

function pageLoad() {
    fetch("/api/books", {
        method: "GET",
        body: JSON.stringify()
    }).then (res => {
        if (res.ok) {
            return res.json()
        }
    }).then((data) => { 
            for (i=0; i < data.length; i++){
                var book = data[i]
                const newOptionEl = document.createElement('option');
                newOptionEl.setAttribute('value', book.title);
                newOptionEl.setAttribute('data-id', book.id);
                bookList.append(newOptionEl)
            }
            console.log(bookList)
        })
}

bookSubmit.addEventListener("click", event => {
    event.preventDefault();
    var bookSelection = {
        title:bookInput.value};
    // console.log(bookSelection);
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
            // alert("We don't have that book in our database yet! Please provide some more info.")
            location.href='/newbook'
        }
    }).then(data => {
        console.log(data)
        autopopTitle.textContent=data.title;
        autopopAuth.textContent=data.author;
        autopopTitle.setAttribute('value', data.id);
    })
})

// SAVE NEW BOOK TO DB 


airplaneButton.addEventListener("click",e=>{
    console.log(e)
    e.preventDefault()
    let title = reviewTitle.value
    title = title.trim(); 
    let review = comment.value;
    review = review.trim();
    if (!title || !review || !autopopTitle.value) {
        alert('Please select a book then enter both a title and a review!')
        return;
    }
    const blogObj = {
        title:title,
        review:review,
        bookId:autopopTitle.value
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