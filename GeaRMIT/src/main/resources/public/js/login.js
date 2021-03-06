window.onload = () => {
    let userName = window.localStorage.getItem("name");
    let userPrivilage = window.localStorage.getItem("privilage");
    if (userName != null && userPrivilage == "admin") {
        window.location.replace("admin.html");
    } else if (userName != null && userPrivilage == "user") {
        window.localStorage.removeItem("name");
        window.localStorage.removeItem("privilage")
    }
};

// Input validation
function displayError(errorDisplay, errorString) {
    // Display error string at specific element
    errorDisplay.innerHTML += `<p>${errorString}</p>`;
    errorDisplay.classList.add("display");
}

function displayLoginStatus(loginStatus, statusString) {
    // Display error string at specific element
    loginStatus.innerHTML = `<p>${statusString}</p>`;
    loginStatus.classList.add("display");
}

function validateName(userName, errorName) {
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

function validatePassword(password, errorPassword) {
    // Validate empty password
    if (password === "") {
        displayError(errorPassword, "- The field is blank");
        password.innerHTML = "";
        return false;
    }
    return true;
}

async function validateLogin(userName, password) {
    let userInfo = {
        name: userName,
        password: password
    };
    let res;
    try {
        res = await fetch(`${window.location.origin}/api/login`, {
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
        }
    } catch (error) {

    }
    return 404;
}

// Create Btn click event
var loginBtn = document.querySelector("#log-in-btn");

loginBtn.addEventListener("click", async () => {
    loginBtn.disabled = true;

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
        allValidated = false;
    }

    if (validatePassword(password.value, errorPassword) === false) {
        allValidated = false;
    }

    if (!allValidated) {
        password.value = "";
    }

    if (allValidated) {

        // Button styling indicating processing.
        loginBtn.innerText = "Processing...";
        loginBtn.style.opacity = '0.5';

        let loginRes = await validateLogin(name.value, password.value);
        if (loginRes.message == "password") {
            displayLoginStatus(errorLogin, "- Incorrect password");
        } else if (loginRes.message == "name") {
            displayLoginStatus(errorLogin, "- Username not found, please register!");
        } else if (loginRes.message == "email") {
            displayLoginStatus(errorLogin, "- Account not activated. Please verify email");
        } else if (loginRes.message == "success") {
            window.localStorage.setItem("privilage", loginRes.privilege);
            window.localStorage.setItem("name", loginRes.name);
            if (loginRes.privilege == "admin") {
                window.location.replace("admin.html");
            } else {
                window.location.replace("../index.html");
            }
        } else {
            displayLoginStatus(errorLogin, "- Cannot connect to server");
        }
    }
    //Reset Button styling after processing.
    loginBtn.innerText = "Log In!";
    loginBtn.style.opacity = '1';
    loginBtn.disabled = false;
})