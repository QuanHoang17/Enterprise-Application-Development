
//Use Immediate Invoke Function To Avoid Naming Space Conflict.
(() => {
    let dataFetched = [];
    var addModalContainer = document.querySelector(".brand-add-modal-container");
    var addTrigger = document.querySelector(".brand-add-modal-trigger");
    var addExitBtn = document.querySelector(".brand-add-exit");
    var addBtn = document.querySelector(".brand-add-button");


    fetch(`${window.location.origin}/api/brand`, {
        method: 'GET'
    })
        .then(response => response.json())
        .then(brandList => {
            dataFetched = brandList;

            brandList.forEach(({id, name}) => {
                let brandRow = document.querySelector('#brand-row').cloneNode();
                
                brandRow.style.display= 'table-row';
                brandRow.innerHTML=`
                    <td>${id}</td>
                    <td>${name}</td> 
                `



                document.querySelector(".brand-table").appendChild(brandRow);
        
    })
            
        })








// Function to display add brand modal
addTrigger.addEventListener("click", (e) => {
    addModalContainer.style.cssText = "display: block";
})

// Button to add a new brand
addBtn.addEventListener("click", (e) => {
    e.preventDefault();
    let brandName = document.querySelector(".brand-add-modal-input").value;
    let brand = {
        'name': brandName
    }
    
    fetch(`${window.location.origin}/api/brand`, {
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


// ---------------------- Search Item on the Main Dashboard -----------------------------//

const mainSearchBar = document.querySelector(".searchbar-container #brand-search-bar");

mainSearchBar.addEventListener('keyup', ({key}) =>{
    if (key ==='Enter'){
    
        let itemSearch = mainSearchBar.value;
    
        let brandRowList = document.querySelectorAll("#brand-row");
        
        
        //Reset the table
        if (!itemSearch){
            for (let i = 0; i < brandRowList.length; i++){
                 if (brandRowList[i].children[0].innerText !== 'Place holder for id'){
                    brandRowList[i].style.display = 'table-row';
                 }
                
            }
          
        }
         let searchResult = dataFetched.find(({id, name}) => ((id === itemSearch.toLowerCase()) || (name.toLowerCase() === itemSearch.toLowerCase())));
         
        if (searchResult){
            
            // document.querySelector("#product-table").appendChild(productRow);
            for (let i = 0; i < brandRowList.length; i++){
                
                if ((brandRowList[i].innerText !== searchResult.id) &&  (brandRowList[i].children[1].innerText !== searchResult.name)){
                   brandRowList[i].style.display = 'none';
                }
            }
        }else{
            alert("No brand found")
        }
        
    }
})














// Button to exit the modal
addExitBtn.addEventListener("click", (e) => {
    addModalContainer.style.cssText = "display: none";

    // Clear input value when exiting the modal
    document.querySelector(".brand-add-modal-input").value = "";

    updateTable();
})


// Function to load the data and show on front end
// function loadData(){
    
// }
// window.onload = loadData();

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
    
    if (!brandId){
        alert("Please enter a brand id to delete");
    }

    let itemToDelete = dataFetched.find(data => data.id === brandId);

    if (itemToDelete){
        fetch(`${window.location.origin}/api/brand/id/` + itemToDelete.id, {
            method: 'DELETE',
        })
        .then(response => response.json())
        .then(({status}) => {
            console.log(status);

            if (status === "success"){
                alert("Successfully deleted the brand");
                document.querySelector(".brand-delete-modal-input").reset();
        
            }else{
                alert(`
        
           Failed To Delete! Please try again.
        
        `)
            }
        })
    }else{
         alert("Can't delete brand that is not available");
    }
})
})()