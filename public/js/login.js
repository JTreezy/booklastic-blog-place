console.log("login linked1")
document.querySelector("#loginButton").addEventListener("submit",e=>{
    e.preventDefault();
    const userObj = {
        useremail:document.querySelector("#loginEmail").value,
        password:document.querySelector("#loginPassword").value,
    }
    console.log(userObj)
    fetch("api/users/login",{
        method:"POST",
        body:JSON.stringify(userObj),
        headers:{
            "Content-Type":"application/json"
        }
    }).then(res=>{
        if(res.ok){  //200 status code
            console.log("logged in")
            // res.redirect("")
            location.href="/home"
        } else {
            alert("trumpet sound")
        }
    })
})

document.querySelector("#signupButton").addEventListener("submit",e=>{
    e.preventDefault();
    const userObj = {
        firstname:document.querySelector("#signupFirstname").value,
        useremail:document.querySelector("#signupEmail").value,
        password:document.querySelector("#signupPassword").value,
    }
    console.log(userObj)
    fetch("/api/users/",{
        method:"POST",
        body:JSON.stringify(userObj),
        headers:{
            "Content-Type":"application/json"
        }
    }).then(res=>{
        if(res.ok){
            console.log("signup")
            // res.redirect("/")
        } else {
            alert("trumpet sound")
        }
    })
})