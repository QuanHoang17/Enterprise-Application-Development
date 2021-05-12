var modalContainer = document.querySelector(".brand-add-modal-container");
var deleteTrigger = document.querySelector(".brand-add-modal-trigger");
var exitBtn = document.querySelector(".brand-add-exit");
var addBtn = document.querySelector(".brand-add-button");

// Function to display add brand modal
deleteTrigger.addEventListener("click", (e) => {
    modalContainer.style.cssText = "display: block";
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
})



// Button to exit the modal
exitBtn.addEventListener("click", (e) => {
    modalContainer.style.cssText = "display: none";

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