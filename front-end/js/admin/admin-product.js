// ------------------------------- For delete modal -------------------------------//

// Variables
var deleteModalContainer = document.querySelector(".delete-modal-container");
var deleteTrigger = document.querySelector(".show-delete-modal");
var deleteExitBtn = document.querySelector(".delete-exit");
var deleteBtn = document.querySelector(".delete-button");
var modalSearchBtn = document.querySelector(".modal-search");

// Show delete modal
deleteTrigger.addEventListener("click", (e) => {
    deleteModalContainer.style.cssText = "display: block";
})

//Hide delete modal
deleteExitBtn.addEventListener("click", (e) => {
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

// Variables
var addModalContainer = document.querySelector(".add-modal-container");
var addTrigger = document.querySelector(".show-add-modal");
var addExitBtn = document.querySelector(".add-exit");
var addBtn = document.querySelector(".add-button");

// To show add modal 
addTrigger.addEventListener("click", (e) => {
    addModalContainer.style.cssText = 'display: block';
})

// To hide add modal
addExitBtn.addEventListener("click", (e) => {
    addModalContainer.style.cssText = 'display: none';
})

// To get all the fields
addBtn.addEventListener("click", (e) => {
    let productName = document.querySelector(".product-name").value;
    let productQuantity = document.querySelector(".product-quantity").value;
    let colorList = document.querySelector(".product-color").value;
    let date = document.querySelector(".product-date").value;
    let price = document.querySelector(".product-price").value;
    let message = document.querySelector(".product-message").value;

    let formData = [productName, productQuantity, colorList, date, price, message];

    alert("Check console for result");

    formData.forEach(data => {
        console.log(data);
    })
})