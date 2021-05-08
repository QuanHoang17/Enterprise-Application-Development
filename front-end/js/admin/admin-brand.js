var modalContainer = document.querySelector(".brand-delete-modal-container");
var deleteTrigger = document.querySelector(".brand-delete-modal-trigger");
var exitBtn = document.querySelector(".brand-delete-exit");
var deleteBtn = document.querySelector(".brand-delete-button");
var modalSearchBtn = document.querySelector(".brand-delete-modal-search");

deleteTrigger.addEventListener("click", (e) => {
    modalContainer.style.cssText = "display: block";
})

deleteBtn.addEventListener("click", (e) => {
    alert('Hello World!');
})

exitBtn.addEventListener("click", (e) => {
    modalContainer.style.cssText = "display: none";

    // Clear input value when exiting the modal
    document.querySelector(".brand-delete-modal-input").value = "";
})

modalSearchBtn.addEventListener("click", (e) => {
    let customerName = document.querySelector(".brand-delete-modal-input").value;
    alert(customerName);
})