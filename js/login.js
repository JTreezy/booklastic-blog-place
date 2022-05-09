console.log("login linked1")
document.querySelector("#loginButton").addEventListener("submit",e=>{
    e.preventDefault();
    const userObj = {
        useremail:document.querySelector("#loginuser").value,
        password:document.querySelector("#loginpass").value,
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
            res.redirect("/")
        } else {
            alert("trumpet sound")
        }
    })
})

document.querySelector("#signupButton").addEventListener("submit",e=>{
    e.preventDefault();
    const userObj = {
        firstname:document.querySelector("#logname").value,
        useremail:document.querySelector("#loginemail").value,
        password:document.querySelector("#loginpass").value,
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
            res.redirect("/")
        } else {
            alert("trumpet sound")
        }
    })
})