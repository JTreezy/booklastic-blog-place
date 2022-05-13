// on clicking log in button
document.querySelector("#loginButton").addEventListener("click",e=>{
    e.preventDefault();
    // create new user object grabbing data from page
    const userObj = {
        email:document.querySelector("#loginEmail").value,
        password:document.querySelector("#loginPassword").value,
    }
    // send post request  
    fetch("api/users/login",{
        method:"POST",
        body:JSON.stringify(userObj),
        headers:{
            "Content-Type":"application/json"
        }
    }).then(res=>{
        if(res.ok){  
            // redirect to my library
            location.href="/mylibrary"
        } else {
            // show modal of failure and reload page
            var myModal = new bootstrap.Modal(document.getElementById('loginfail'))
            myModal.show();
            $('#loginfailclose').on("click", function (event){
                event.preventDefault();
                location.reload();
            })
        }
    })
})

// on clicking signup button
document.querySelector("#signupButton").addEventListener("click",e=>{
    e.preventDefault();
    // create user object
    const userObj = {
        first_name:document.querySelector("#signupFirstname").value,
        email:document.querySelector("#signupEmail").value,
        password:document.querySelector("#signupPassword").value,
    }
    // sned fetch post with user object
    fetch("/api/users/",{
        method:"POST",
        body:JSON.stringify(userObj),
        headers:{
            "Content-Type":"application/json"
        }
    }).then(res=>{
        if(res.ok){
            // if successful, show success modal then redirect to homepage NOT my library as it will be empty
            var myModal = new bootstrap.Modal(document.getElementById('signupsuccess'))
            myModal.show();
            $('#signupsuccessclose').on("click", function (event){
                event.preventDefault();
                location.href='/'
            })
        } else {
            // if unsuccessful, show fail modal and refresh page
            var myModal = new bootstrap.Modal(document.getElementById('signupfail'))
            myModal.show();
            $('#signupfailclose').on("click", function (event){
                event.preventDefault();
                location.reload();
            })
        }
    })
})

