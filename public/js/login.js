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
        } else {
            var myModal = new bootstrap.Modal(document.getElementById('loginfail'))
            myModal.show();
            $('#loginfailclose').on("click", function (event){
                event.preventDefault();
                location.reload();
            })
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
            var myModal = new bootstrap.Modal(document.getElementById('signupsuccess'))
            myModal.show();
            $('#signupsuccessclose').on("click", function (event){
                event.preventDefault();
                location.href='/'
            })
        } else {
            var myModal = new bootstrap.Modal(document.getElementById('signupfail'))
            myModal.show();
            $('#signupfailclose').on("click", function (event){
                event.preventDefault();
                location.reload();
            })
        }
    })
})

