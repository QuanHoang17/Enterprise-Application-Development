
//Use Immediate Invoke Function To Avoid Naming Space Conflict.
(() => {
    var addModalContainer = document.querySelector(".brand-add-modal-container");
    var addTrigger = document.querySelector(".brand-add-modal-trigger");
    var addExitBtn = document.querySelector(".brand-add-exit");
    var addBtn = document.querySelector(".brand-add-button");

// Function to display add brand modal
addTrigger.addEventListener("click", (e) => {
    addModalContainer.style.cssText = "display: block";
})

// Button to add a new brand
addBtn.addEventListener("click", (e) => {
    let brandName = document.querySelector(".brand-add-modal-input").value;
    let brand = {
        'name': brandName
    }
    
    fetch(`http://localhost:8080/api/brand`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(brand)
    })
        .then(response => response.json())
        .then(response => {
            console.log(response.brand);
        })
})

// Button to exit the modal
addExitBtn.addEventListener("click", (e) => {
    addModalContainer.style.cssText = "display: none";

    // Clear input value when exiting the modal
    document.querySelector(".brand-add-modal-input").value = "";

    updateTable();
})


// Function to load the data and show on front end
function loadData(){
    fetch('http://localhost:8080/api/brand', {
        method: 'GET'
    })
        .then(response => response.json())
        .then(brandList => {
            console.log(brandList);

            // Clear table first
            if (document.querySelector('.brand-data')) {
                document.querySelectorAll('.brand-data').forEach(element => element.remove());
            }

            // Then show data so that data won't be repeated
            brandList.forEach(brand => {
                document.querySelector('.brand-table').innerHTML +=
                    `
                    <tr>
                        <td class="brand-data">${brand.id}</td>
                        <td class="brand-data">${brand.name}</td>
                    </tr>
                `;
            });
        })
}
window.onload = loadData();

// Function to reload table
function updateTable() { 
    $(".brand-table").load(location.href + " .brand-table"); 
}

// ------------------ FOR BRAND DELETE ------------------------------- //
var deleteModalContainer = document.querySelector(".brand-delete-modal-container");
var deleteTrigger = document.querySelector(".brand-delete-modal-trigger");
var deleteExitBtn = document.querySelector(".brand-delete-exit");
var deleteBtn = document.querySelector(".brand-delete-button");

// Function to display delete brand modal
deleteTrigger.addEventListener("click", (e) => {
    deleteModalContainer.style.cssText = "display: block";
})



// Button to exit the delete modal
deleteExitBtn.addEventListener("click", (e) => {
    deleteModalContainer.style.cssText = "display: none";

    // Clear input value when exiting the modal
    document.querySelector(".brand-delete-modal-input").value = "";

    updateTable();
})



// Button to delete a brand
deleteBtn.addEventListener("click", (e) => {
    let brandId = document.querySelector(".brand-delete-modal-input").value;
    
    alert(brandId);
})
})()