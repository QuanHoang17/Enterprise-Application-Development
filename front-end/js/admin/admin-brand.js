var modalContainer = document.querySelector(".brand-add-modal-container");
var deleteTrigger = document.querySelector(".brand-add-modal-trigger");
var exitBtn = document.querySelector(".brand-add-exit");
var addBtn = document.querySelector(".brand-add-button");

deleteTrigger.addEventListener("click", (e) => {
    modalContainer.style.cssText = "display: block";
})

addBtn.addEventListener("click", (e) => {
    let brandName = document.querySelector(".brand-add-modal-input").value;
    alert(brandName);
})

exitBtn.addEventListener("click", (e) => {
    modalContainer.style.cssText = "display: none";

    // Clear input value when exiting the modal
    document.querySelector(".brand-add-modal-input").value = "";
})