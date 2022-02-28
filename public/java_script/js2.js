function validateEmail(){
    var status = true;
    var regex = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');
    var email  = document.getElementById("email").value;
    var emailError = document.getElementById("emailError");
    if(email == ""){
        status = false;
        emailError.innerHTML = "please enter email id";
        emailError.style.color = "red";
    } 
    else if(!regex.test(email)){
        status = false;
        emailError.innerHTML = "Invalid email id";
        emailError.style.color = "red";
    }
    else
     emailError.innerHTML = "";
    return status;
}

function validateData(){
    var emailStatus = validateEmail();
    if(emailstatus)
    return true;
    return false;
}