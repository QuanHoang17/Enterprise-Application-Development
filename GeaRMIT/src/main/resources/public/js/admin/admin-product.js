(() => {
    
// ------------------------------- Fetch Data into Table -------------------------------//
let dataFetched = [];
const productUrl = `${window.location.origin}/api/product`;
fetch(productUrl)
.then(response => response.json())
.then(data => {
    dataFetched = data;
    data.forEach(({id, name, quantity, issueDate, brandName,categoryName, imageName: [image1, image2, image3]}) => {
    let productRow = document.querySelector('#product-row').cloneNode();
    
    productRow.style.display= 'table-row';
    productRow.innerHTML=`
        <td>${id}</td>
        <td>${name}</td> 
        <td>${quantity}</td>
        <td>${new Date(issueDate).toLocaleDateString()}</td>

        <td>
            <div><a target="_blank" href="${window.location.origin}/api/image/${image1}">${image1}<i class="fas fa-external-link-alt"></i></a></div>
            <div><a target="_blank" href="${window.location.origin}/api/image/${image2}">${image2}<i class="fas fa-external-link-alt"></i></a></div>
            <div><a target="_blank" href="${window.location.origin}/api/image/${image3}">${image3}<i class="fas fa-external-link-alt"></i></a></div>
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

// ---------------------- Search Item on the Main Dashboard -----------------------------//

const mainSearchBar = document.querySelector(".searchbar-container #product-search-bar");

mainSearchBar.addEventListener('keyup', ({key}) =>{
    if (key ==='Enter'){
        console.log(1);
        let itemSearch = mainSearchBar.value;
    
        let productRowList = document.querySelectorAll("#product-row");
        
       
        
        //Reset the table
        if (!itemSearch){
            for (let i = 0; i < productRowList.length; i++){
                 if (productRowList[i].children[0].innerText !== '02'){
                    productRowList[i].style.display = 'table-row';
                 }
                
            }
          
        }
         let searchResult = dataFetched.find(({id, name}) => ((id === itemSearch.toLowerCase()) || (name.toLowerCase() === itemSearch.toLowerCase())));
         
        if (searchResult){
            console.log(2);
            // document.querySelector("#product-table").appendChild(productRow);
            for (let i = 0; i < productRowList.length; i++){
                console.log(productRowList[i].children[0].innerText);
                if ((productRowList[i].children[0].innerText !== searchResult.id) &&  (productRowList[i].children[1].innerText !== searchResult.name)){
                   productRowList[i].style.display = 'none';
                }
            }
        }else{
            alert("No product found")
        }
        
    }
})



// ------------------------------- For delete modal -------------------------------//

// Variables
const deleteModalContainer = document.querySelector(".product-delete-modal-container");
const deleteTrigger = document.querySelector(".product-delete-modal-trigger");
const deleteExitBtn = document.querySelector(".product-delete-exit");
const deleteBtn = document.querySelector(".product-delete-button");
const modalSearchBtn = document.querySelector(".product-delete-modal-input");
let itemToDelete;
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
modalSearchBtn.addEventListener("keyup", ({key}) => {
    
   if (key ==='Enter'){
         let itemSearch = document.querySelector(".product-delete-modal-input").value;
    
    if (!itemSearch){
        alert("Please Enter a Product Id !!!!!!!!!");
    }


    itemToDelete = dataFetched.find(data => data.id === itemSearch);
    
    if (itemToDelete){
        
        document.querySelector(".product-result p").innerHTML=`
        
          Result Found: <a href="">${itemToDelete.name} - ${itemToDelete.id}</a>
        
        `
    }else{
        document.querySelector(".product-result p").innerHTML=`
        
           Result Found: No result Found!!!
        
        `
    }
   }


})

// Handle delete button 
deleteBtn.addEventListener("click", (e) => {
    
    if (itemToDelete){
        fetch(`${window.location.origin}/api/product/id/` + itemToDelete.id, {
            method: 'DELETE',
        })
        .then(response => response.json())
        .then(({status}) => {
            console.log(status);

            if (status === "success"){
                document.querySelector(".product-result p").innerHTML=`
        
           Successfully Deleted Item!
        
        `
            }else{
                document.querySelector(".product-result p").innerHTML=`
        
           Failed To Delete! Please try again.
        
        `
            }
        })
    }else{
         alert("Can't delete product that is not available!");
    }
   
    
    
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
        "price": parseInt(price),
        "quantity": parseInt(productQuantity),
        "brandId": brandId,
        "categoryId": categoryId,
        "description": description,
        "color": colorList.split(", ")
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
    response.json().then(({status}) => 
        {if (status !== 'failed'){
           alert("Successfully Added Item");
           
           document.querySelector(".product-form").reset();
        }else {
            alert("Sorry!!!! Failed To Add");
        }}
    
        );
}


})() 


