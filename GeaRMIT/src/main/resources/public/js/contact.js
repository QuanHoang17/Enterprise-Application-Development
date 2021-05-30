(() =>{ 
    //Check POST request status.
    async function validateRequest(userName, email, message) {
        let userMess = {
            name: userName,
            email: email,
            message: message
        };
        console.log(JSON.stringify(userMess));
        let res;
        try {
            res = await fetch(`${window.location.origin}/api/message`, {
                method: 'POST',
                headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                },
                body: JSON.stringify(userMess)
            });
            if (res.ok) {
                
                return res.status;
            }
        } catch (error) {
            console.log(error);
        }
        return 404;
}

    function validateEmail(email, errorEmail, registerStatus) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    
    // // Validate empty email
    // if (email === "") {
    //     displayError(errorEmail, "- The field is blank");
    //     return false;
    // }

    // Validate email string
    if (re.test(String(email).toLowerCase()) === false) {
        // displayError(errorEmail, "- Invalid email format");
        return false;
    }

    return true;
}

    const sendBtn = document.querySelector(".sendMessage");

    document.querySelector('.contactForm form').addEventListener('submit', async (e)=>{
        e.preventDefault();
        let email = document.querySelector('.email').value;
        let name = document.querySelector('.name').value;
        let message = document.querySelector('.message').value;
        
        if (!validateEmail){
            alert("Wrong format of email!");
            
        }else{
            // Button styling indicating sending process.
            sendBtn.innerText = "Sending...";
            sendBtn.style.opacity = '0.5';
            sendBtn.disabled = true;
            const postStatus = await validateRequest(name, email, message);
            
            if (postStatus === 200){
                alert("Successfully Send The Message");
                
            }else{
                 alert("Sorry! We can't send your message now. Please try again later.");
            }
            //Reset form after processing.
            document.querySelector('.contactForm form').reset();

            //Reset Button styling after processing.
            sendBtn.innerText = "Send Message!";
            sendBtn.style.opacity = '1';
            sendBtn.disabled = false;
            
        }
        


    })

})()