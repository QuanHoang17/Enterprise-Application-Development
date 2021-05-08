var modalContainer = document.querySelector(".customer-delete-modal-container");
var deleteTrigger = document.querySelector(".customer-delete-modal-trigger");
var exitBtn = document.querySelector(".customer-delete-exit");
var deleteBtn = document.querySelector(".customer-delete-button");
var modalSearchBtn = document.querySelector(".customer-delete-modal-search");

deleteTrigger.addEventListener("click", (e) => {
    modalContainer.style.cssText = "display: block";
})

deleteBtn.addEventListener("click", (e) => {
    alert('Hello World!');
})

exitBtn.addEventListener("click", (e) => {
    modalContainer.style.cssText = "display: none";
    
    // Clear input value when exiting the modal
    document.querySelector(".customer-delete-modal-input").value = "";
})

modalSearchBtn.addEventListener("click", (e) => {
    let customerName = document.querySelector(".customer-delete-modal-input").value;
    alert(customerName);
})