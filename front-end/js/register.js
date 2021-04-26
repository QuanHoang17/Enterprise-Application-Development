// Input validation
function displayError(errorDisplay, errorString) {
    // Display error string at specific element
    errorDisplay.innerHTML += `<p>${errorString}</p>`;
    errorDisplay.classList.add("display");
}

function displayRegisterStatus(registerStatus, statusString) {
    // Display error string at specific element
    registerStatus.innerHTML = `<p>${statusString}</p>`;
    registerStatus.classList.add("display");
}

async function validateName(userName, errorName, registerStatus) {
    // Validate empty name
    if (userName === "") {
        displayError(errorName, "- The field is blank");
        return false;
    }

    // Check if name contain space
    if (/\s/.test(userName)) {
        displayError(errorName, "- Name must not contain space")
        return false;
    }

    return true;
}

async function validateEmail(email, errorEmail, registerStatus) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    
    // Validate empty email
    if (email === "") {
        displayError(errorEmail, "- The field is blank");
        return false;
    }

    // Validate email string
    if (re.test(String(email).toLowerCase()) === false) {
        displayError(errorEmail, "- Invalid email format");
        return false;
    }

    return true;
}

function validatePhone(phone, errorPhone) {
    // Validate phone email
    if (phone === "") {
        displayError(errorPhone, "- The field is blank");
        return false;
    }

    // Validate phone string
    if (/[0-9]+/.test(phone) === false) {
        displayError(errorPhone, "- Phone number must only contain number");
        return false;
    }

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

    // Validate empty password
    if (password === "") {
        displayError(errorPassword, "- The field is blank");
        return false;
    }

    // Validate length
    if (password.length < 6) {
        displayError(errorPassword, "- Password need to have more than 5 characters")
    }

    // Validate at least 1 special character
    if (specialChar.test(password) === false) {
        displayError(errorPassword, "- The password must have at least 1 special character");
        containSpecial = false;
    }

    // Validate at least 1 lowercase character 
    if (lowercase.test(password) === false) {
        displayError(errorPassword, "- The password must have at least 1 lowercase character");
        containLowercase = false;
    }

    // Validate at least 1 uppercase character 
    if (uppercase.test(password) === false) {
        displayError(errorPassword, "- The password must have at least 1 uppercase character");
        containUppercase = false;
    }

    // Validate at least 1 number
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

// Register User
async function registerUsers(userName, email, phone, password) {
    let userInfo = {
        name: userName,
        email: email,
        phone: phone,
        password: password
    };
    try {
        let res = await fetch("http://localhost:8080/api/users", {
            method: 'POST',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(userInfo)
        });
        if (res.ok) {
            let resData = await res.json();
            console.log(resData);
            return resData;
        };
    } catch (error) {
        
    }
    return 404;
}



// Create Btn click event
var createBtn = document.querySelector("#create-btn");

createBtn.addEventListener("click", async () => {
    createBtn.disabled = true;

    // Input field
    let userName = document.querySelector("#input-name");
    let email = document.querySelector("#input-email");
    let phone = document.querySelector("#input-phone");
    let password = document.querySelector("#input-password");
    let confirmedPassword = document.querySelector("#input-confirmed-password");

    //Error field
    let errorName = document.querySelector("#error-name");
    let errorEmail = document.querySelector("#error-email");
    let errorPhone = document.querySelector("#error-phone");
    let errorPassword = document.querySelector("#error-password");
    let errorConfirmedPassword = document.querySelector("#error-confirmed-password");
    let registerStatus = document.querySelector("#register-status");

    // Hide error field value
    errorName.classList.remove("display");
    errorEmail.classList.remove("display");
    errorPhone.classList.remove("display");
    errorPassword.classList.remove("display");
    errorConfirmedPassword.classList.remove("display");
    registerStatus.classList.remove("display");

    // Reset error field value
    errorName.innerHTML = "";
    errorEmail.innerHTML = "";
    errorPhone.innerHTML = "";
    errorPassword.innerHTML = "";
    errorConfirmedPassword.innerHTML = "";
    registerStatus.innerHTML = "";

    let allValidated = true;
    if (await validateName(userName.value, errorName, registerStatus) === false) {
        allValidated = false;
    }
    
    if (await validateEmail(email.value, errorEmail, registerStatus) === false) {
        allValidated = false;
    }

    if (validatePhone(phone.value, errorPhone) === false) {
        allValidated = false;
    }

    if (validatePassword(password.value, errorPassword) === false) {
        allValidated = false;
    } else if (validateConfirmedPassword(password.value, confirmedPassword.value, errorConfirmedPassword) === false) {
        allValidated = false;
    }

    if (!allValidated) {
        confirmedPassword.value = "";
    }

    // Register user when everything is validated
    if (allValidated) {
        let redirectSecond = 5;
        let registerRes = await registerUsers(userName.value, email.value, phone.value, password.value);
        if (registerRes == 404) {
            displayRegisterStatus(registerStatus, "- Cannot connect to server");
        } else {
            if (registerRes.email == "existed") {
                displayError(errorEmail, "- Email already exsisted")
            }
            if (registerRes.name == "existed") {
                displayError(errorName, "- Name already exsisted")
            }
            if (registerRes.status == "success") {
                displayRegisterStatus(registerStatus, `Account successfully created! Redirect to login page in ${redirectSecond} seconds`);
                // registerStatus.classList.add("display");
                // registerStatus.innerHTML = `<p>Account successfully created! Redirect to login page in ${redirectSecond} seconds</p>`;
                userName.value = "";
                email.value = "";
                phone.value = "";
                password.value = "";
                confirmedPassword.value = "";
                setInterval(() => {
                    redirectSecond = redirectSecond - 1;
                    displayRegisterStatus(registerStatus, `Account successfully created! Redirect to login page in ${redirectSecond} seconds`);
                }, 1000)
                await new Promise(() => setTimeout(() => {
                    window.location.replace("login.html");
                }, 5000));
            }
        }
    }
    createBtn.disabled = false;
})