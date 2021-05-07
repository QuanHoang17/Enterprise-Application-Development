// ------------------------------- For delete modal -------------------------------//

// Variables
var deleteModalContainer = document.querySelector(".delete-modal-container");
var deleteTrigger = document.querySelector(".show-delete-modal");
var exitBtn = document.querySelector(".exit");
var deleteBtn = document.querySelector(".delete-button");
var modalSearchBtn = document.querySelector(".modal-search");

// Show delete modal
deleteTrigger.addEventListener("click", (e) => {
    deleteModalContainer.style.cssText = "display: block";
})

//Hide delete modal
exitBtn.addEventListener("click", (e) => {
    // Clear search text
    document.querySelector(".modal-input").value = "";

    deleteModalContainer.style.cssText = "display: none";
})

// Get search text
modalSearchBtn.addEventListener("click", (e) => {
    alert(document.querySelector(".modal-input").value);
})

// Handle delete button 
deleteBtn.addEventListener("click", (e) => {
    alert("Some thing will happen.....");
})

// ------------------------------- For add modal -------------------------------//
var addBtn = document.querySelector(".add-button");

addBtn.addEventListener("click", (e) => {
    alert(document.querySelector("textarea").value);
})