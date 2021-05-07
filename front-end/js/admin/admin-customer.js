var modalContainer = document.querySelector(".modal-container");
var deleteTrigger = document.querySelector(".show-modal");
var exitBtn = document.querySelector(".exit");
var deleteBtn = document.querySelector(".delete-button");
var modalSearchBtn = document.querySelector(".modal-search");

deleteTrigger.addEventListener("click", (e) => {
    modalContainer.style.cssText = "display: block";
})

deleteBtn.addEventListener("click", (e) => {
    alert('Hello World!');
})

exitBtn.addEventListener("click", (e) => {
    modalContainer.style.cssText = "display: none";
    
    // Clear input value when exiting the modal
    document.querySelector(".modal-input").value = "";
})

modalSearchBtn.addEventListener("click", (e) => {
    let customerName = document.querySelector(".modal-input").value;
    alert(customerName);
})