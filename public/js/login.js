console.log("login linked1")
document.querySelector("#loginButton").addEventListener("click",e=>{
    e.preventDefault();
    const userObj = {
        email:document.querySelector("#loginEmail").value,
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
            location.href="/mylibrary"
            // changing the stylesheet in login 
            document.getElementById('css-source').setAttribute("href", "/css/style.css")
        } else {
            alert("Login failed; please try again!")
        }
    })
})

document.querySelector("#signupButton").addEventListener("click",e=>{
    e.preventDefault();
    const userObj = {
        first_name:document.querySelector("#signupFirstname").value,
        email:document.querySelector("#signupEmail").value,
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
            console.log("signed up")
            location.href="/mylibrary"
            // changing the stylesheet in signup 
            document.getElementById('css-source').setAttribute("href", "/css/style.css")
        } else {
            alert("Signup failed; please try again!")
        }
    })
})

