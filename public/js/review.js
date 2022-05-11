// on page load request all book titles and add to drop down list. 

pageLoad();

function pageLoad() {
    fetch("/api/books", {
        method: "GET"
    }).then (res => {
        if (res.ok) {
            // add books to drop down for book titles
        } else {
            // ???
        }
    })
}

// autocomplete to type in pre-populate book titles PLUS option to add new
    // user types in a book title in search
    // IF chooses to adds new, unhide option to add author and genre

// populate into review the title and author
    // 

const airplaneButton = document.querySelector("#airplaneButton")
airplaneButton.addEventListener("click",e=>{
    console.log(e)
    e.preventDefault()
    const title = document.querySelector("#userReviewTitle").value
    title = title.trim(); 
    const review = document.querySelector("#comment").value;
    review = review.trim();
    if (!title || !review) {
        alert('Please enter both a title and a review!')
        return;
    }
    const blogObj = {
        title:title,
        review:review,
        // TODO: bookId: 
    }
    fetch("/api/blogs",{
        method:"POST",
        body:JSON.stringify(blogObj),
        headers:{
            "Content-Type":"application/json"
        }
    }).then(res=>{
        if(res.ok){
           location.href('/mylibrary')
        } else {
            alert("error; please try again")
        }
    })
})