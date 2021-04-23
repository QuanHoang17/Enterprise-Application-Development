// Input validation
function displayError(errorDisplay, errorString) {
    // Display error string at specific element
    errorDisplay.innerHTML += `<p>${errorString}</p>`;
    errorDisplay.classList.add("display");
}

function validateName(userName, errorName) {
    // Validate empty name
    if (userName === "") {
        displayError(errorName, "- The field is blank");
        return false;
    }
    return true;
}

function validatePassword(password, errorPassword) {
    // Validate empty password
    if (password === "") {
        displayError(errorPassword, "- The field is blank");
        password.innerHTML = "";
        return false;
    }
    return true;
}

async function validateLogin(name, password, errorLogin) {
    
    return true
}

// Create Btn click event
var loginBtn = document.querySelector("#log-in-btn");

loginBtn.addEventListener("click", async () => {
    // Input field
    let name = document.querySelector("#input-name");
    let password = document.querySelector("#input-password");

    //Error field
    let errorName = document.querySelector("#error-name");
    let errorPassword = document.querySelector("#error-password");
    let errorLogin = document.querySelector("#error-login");

    //Reset error field
    errorName.classList.remove("display");
    errorPassword.classList.remove("display");
    errorLogin.classList.remove("display");
    errorName.innerHTML = "";
    errorPassword.innerHTML = "";
    errorLogin.innerHTML = "";

    let allValidated = true;
    if (validateName(name.value, errorName) === false) {
        password.value = "";
        allValidated = false;
    }

    if (validatePassword(password.value, errorPassword) === false) {
        password.value = "";
        allValidated = false;
    }

    if (allValidated && await validateLogin(name.value, password.value, errorLogin) === false) {
        password.value = "";
        allValidated = false;
    }
})