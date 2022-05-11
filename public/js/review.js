var dataList = document.querySelector("#bookList");
var bookSubmit = document.querySelector("#bookSubmit");
const airplaneButton = document.querySelector("#airplaneButton");
var bookInput = document.querySelector("#bookInput");

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
            // console.log(data);
            // console.log(data[0])
            for (i=0; i < data.length; i++){
                var book = data[i]
                const newOptionEl = document.createElement('option');
                newOptionEl.setAttribute('value', book.title);
                newOptionEl.setAttribute('id', i);
                bookList.append(newOptionEl)
            }
            // console.log(bookList)
        })
}

bookSubmit.addEventListener("click", event => {
    event.preventDefault();
    console.log('clicked');
    var bookSelection = bookInput.value;
    console.log(bookSelection);
    fetch("/api/books",{
        method:"POST",
        body:JSON.stringify(bookSelection),
        headers:{
            "Content-Type":"application/json"
        }
    }).then(res=>{
        if(res.ok){ 
            console.log(JSON.stringify(bookSelection))
            console.log("success")
            // location.href="/mylibrary"
        } else {
            alert("Failed!")
        }
    })
})


// airplaneButton.addEventListener("click",e=>{
//     console.log(e)
//     e.preventDefault()
//     const title = document.querySelector("#userReviewTitle").value
//     title = title.trim(); 
//     const review = document.querySelector("#comment").value;
//     review = review.trim();
//     if (!title || !review) {
//         alert('Please enter both a title and a review!')
//         return;
//     }
//     const blogObj = {
//         title:title,
//         review:review,
//         // TODO: bookId: 
//     }
//     fetch("/api/blogs",{
//         method:"POST",
//         body:JSON.stringify(blogObj),
//         headers:{
//             "Content-Type":"application/json"
//         }
//     }).then(res=>{
//         if(res.ok){
//            location.href('/mylibrary')
//         } else {
//             alert("error; please try again")
//         }
//     })
// })