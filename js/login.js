console.log("login linked1")
document.querySelector("#loginButton").addEventListener("submit",e=>{
    e.preventDefault();
    const userObj = {
        username:document.querySelector("#loginuser").value,
        password:document.querySelector("#loginpass").value,
    }
    console.log(userObj)
    fetch("users/login",{
        method:"POST",
        body:JSON.stringify(userObj),
        headers:{
            "Content-Type":"application/json"
        }
    }).then(res=>{
        if(res.ok){  //200 status code
            console.log("logged in")
            location.href="/profile"
        } else {
            alert("trumpet sound")
        }
    })
})

// document.querySelector("#signup").addEventListener("submit",e=>{
//     e.preventDefault();
//     const userObj = {
//         username:document.querySelector("#signupUsername").value,
//         password:document.querySelector("#signupPassword").value,
//     }
//     console.log(userObj)
//     fetch("/api/users/",{
//         method:"POST",
//         body:JSON.stringify(userObj),
//         headers:{
//             "Content-Type":"application/json"
//         }
//     }).then(res=>{
//         if(res.ok){
//             location.href="/profile"
//         } else {
//             alert("trumpet sound")
//         }
//     })
// })