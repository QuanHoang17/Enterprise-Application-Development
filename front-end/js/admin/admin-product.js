(() => {
    
// ------------------------------- Fetch Data into Table -------------------------------//

const productUrl = 'http://localhost:8080/api/product';
fetch(productUrl)
.then(response => response.json())
.then(data => {
    data.forEach(({id, name, quantity, issueDate, brandName,categoryName}) => {
    let productRow = document.querySelector('#product-row').cloneNode();
    
    productRow.style.display= 'table-row';
    productRow.innerHTML=`
        <td>${id}</td>
        <td>${name}</td> 
        <td>${quantity}</td>
        <td>${new Date(issueDate).toLocaleDateString()}</td>

        <td>
            <div><a href="">Image 1 <i class="fas fa-external-link-alt"></i></a></div>
            <div><a href="">Image 2 <i class="fas fa-external-link-alt"></i></a></div>
            <div><a href="">Image 3 <i class="fas fa-external-link-alt"></i></a></div>
        </td>
        <td><div><a href="">${brandName}<i class="fas fa-external-link-alt"></i></a></div>
        </td>
        <td>
            <div><a href="">${categoryName}<i class="fas fa-external-link-alt"></i></a></div>
        </td>
    
    `
    document.querySelector("#product-table").appendChild(productRow);
    
})
    document.getElementById('product-stats').innerText= `Total products: ${data.length}`;

})







// ------------------------------- For delete modal -------------------------------//

// Variables
var deleteModalContainer = document.querySelector(".product-delete-modal-container");
var deleteTrigger = document.querySelector(".product-delete-modal-trigger");
var deleteExitBtn = document.querySelector(".product-delete-exit");
var deleteBtn = document.querySelector(".product-delete-button");
var modalSearchBtn = document.querySelector(".product-delete-modal-search");

// Show delete modal
deleteTrigger.addEventListener("click", (e) => {
    deleteModalContainer.style.cssText = "display: block";
})

//Hide delete modal
deleteExitBtn.addEventListener("click", (e) => {
    // Clear search text
    document.querySelector(".product-delete-modal-input").value = "";

    deleteModalContainer.style.cssText = "display: none";
})

// Get search text
modalSearchBtn.addEventListener("click", (e) => {
    alert(document.querySelector(".product-delete-modal-input").value);
})

// Handle delete button 
deleteBtn.addEventListener("click", (e) => {
    e.preventDefault();
    alert("Some thing will happen.....");
    
    
})

// ------------------------------- For add modal -------------------------------//

// Variables
var addModalContainer = document.querySelector(".product-add-modal-container");
var addTrigger = document.querySelector(".product-add-modal-trigger");
var addExitBtn = document.querySelector(".product-add-exit");
var addBtn = document.querySelector(".product-add-button");

// To show add modal 
addTrigger.addEventListener("click", (e) => {
    addModalContainer.style.cssText = 'display: block';
})

// To hide add modal
addExitBtn.addEventListener("click", (e) => {
    // Clear all inputs
    let productName = document.querySelector(".product-name").value;
    let productQuantity = document.querySelector(".product-quantity").value;
    let colorList = document.querySelector(".product-color").value;
    let date = document.querySelector(".product-date").value;
    let price = document.querySelector(".product-price").value;
    let message = document.querySelector(".product-message").value;

    let formData = [productName, productQuantity, colorList, date, price, message];

    // Currently not working as planned
    formData.forEach(data => {
        data = "";
    })

    addModalContainer.style.cssText = 'display: none';
})

// To get all the fields
addBtn.addEventListener("click", (e) => {
    e.preventDefault();
    let productName = document.querySelector(".product-name").value;
    let productQuantity = document.querySelector(".product-quantity").value;
    let colorList = document.querySelector(".product-color").value;
    let date = document.querySelector(".product-date").value;
    let price = document.querySelector(".product-price").value;
    let description = document.querySelector(".product-message").value;
    let brandId = document.querySelector(".product-brand").value;
    let categoryId = document.querySelector(".product-category").value;

    let formData = {
        "name": productName,
        "issueDate" : date,
        "price": price,
        "quantity": productQuantity,
        "brandId": brandId,
        "category": categoryId,
        "description": description,
        "color": [colorList]


    };

    console.log(formData);


    sendDataToServer(formData);

    
}); 

const sendDataToServer = async (data) => {
    const response = await fetch(productUrl, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }
        );

    response.json().then(result => 
        {if (result.status !== 'failed'){
           alert("Successfully Added Item");
           document.querySelector("") 
           document.querySelector(".product-form").reset();
        }else {
            alert("Sorry!!!! Failed To Add");
        }}
    
        );
}


})() 


