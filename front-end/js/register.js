// Input validation
function displayError(errorDisplay, errorString) {
    errorDisplay.innerHTML += `<p>${errorString}</p>`;
    errorDisplay.classList.add("display");
}

async function validateName(name, errorName) {
    // Check name empty
    if (name === "") {
        console.log("Name is empty");
        displayError(errorName, "- The field is blank");
        return false;
    }

    // Check if name available
    return true;
}

async function validateEmail(email, errorEmail) {
    // Check email empty
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (email === "") {
        console.log("Email is empty");
        displayError(errorEmail, "- The field is blank");
        return false;
    }

    // Check invalid email
    if (re.test(String(email).toLowerCase()) === false) {
        displayError(errorEmail, "- Invalid email format");
        return false;
    }

    // Check if email is available
    return true;
}

function validatePassword(password, errorPassword) {
    let containLowercase = true;
    let containUppercase = true;
    let containNumber = true;
    let containSpecial = true;
    let correctLength = true;

    // let specialChar = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    let specialChar = /[!@#$%^&*]/;
    let lowercase = /[a-z]/;
    let uppercase = /[A-Z]/;
    let number = /\d/

    if (password.length < 6) {
        displayError(errorPassword, "- Password need to have more than 5 characters")
    }

    if (specialChar.test(password) === false) {
        displayError(errorPassword, "- The password must have at least 1 special character");
        containSpecial = false;
    }

    if (lowercase.test(password) === false) {
        displayError(errorPassword, "- The password must have at least 1 lowercase character");
        containLowercase = false;
    }

    if (uppercase.test(password) === false) {
        displayError(errorPassword, "- The password must have at least 1 uppercase character");
        containUppercase = false;
    }

    if (number.test(password) === false) {
        displayError(errorPassword, "- The password must have at least 1 number");
        containNumber = false;
    }

    if (!containNumber || !containLowercase || !containUppercase || !containSpecial || !correctLength) {
        return false;
    }
    
    return true;
}

function validateConfirmedPassword(password, confirmedPassword, errorConfirmedPassword) {
    if (password !== confirmedPassword) {
        displayError(errorConfirmedPassword, "- The confirmed password doesn't match");
        return false;
    }
    return true;
}

// Create Btn input
var createBtn = document.querySelector("#create-btn");

createBtn.addEventListener("click", async () => {
    // Input field
    let name = document.querySelector("#input-name");
    let email = document.querySelector("#input-email");
    let password = document.querySelector("#input-password");
    let confirmedPassword = document.querySelector("#input-confirmed-password");

    //Error field
    let errorName = document.querySelector("#error-name");
    let errorEmail = document.querySelector("#error-email");
    let errorPassword = document.querySelector("#error-password");
    let errorConfirmedPassword = document.querySelector("#error-confirmed-password");

    //Reset error field
    errorName.classList.remove("display");
    errorEmail.classList.remove("display");
    errorPassword.classList.remove("display");
    errorConfirmedPassword.classList.remove("display");
    errorName.innerHTML = "";
    errorEmail.innerHTML = "";
    errorPassword.innerHTML = "";
    errorConfirmedPassword.innerHTML = "";

    let allValidated = true;
    if (await validateName(name.value, errorName) === false) {
        allValidated = false;
    }

    if (await validateEmail(email.value, errorEmail) === false) {
        allValidated = false;
    }

    if (validatePassword(password.value, errorPassword) === false) {
        allValidated = false
    } else if (validateConfirmedPassword(password.value, confirmedPassword.value, errorConfirmedPassword) === false) {
        allValidated = false;
    }
})