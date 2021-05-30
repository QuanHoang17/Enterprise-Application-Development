(() =>{
    // ------------------------------- Fetch Data into Table -------------------------------//
let dataFetched = [];
const customerUrl = `${window.location.origin}/api/customer`;
fetch(customerUrl)
.then(response => response.json())
.then(data => {
    let activeCount = 0;
    dataFetched = data;

    data.forEach(({id, name, email, phone, enabled}) => {
        let customerRow = document.querySelector('#customer-row').cloneNode();

        customerRow.style.display= 'table-row';
        customerRow.innerHTML=`
            <td>${id}</td>
            <td>${email}</td> 
            <td>${name}</td>
            <td>${phone}</td>
            <td>
                ${enabled}
            </td>
        
        
        `
        document.querySelector("#customer-table").appendChild(customerRow);
        if (enabled) activeCount++;
        
    })
    document.getElementById('customer-stats').innerText= `Total users: ${data.length}`;
    document.getElementById('active-customer-stats').innerText= `Active users: ${activeCount}`;
    

})

// ---------------------- Search Item on the Main Dashboard -----------------------------//

const mainSearchBar = document.querySelector(".searchbar-container #customer-search-bar");

mainSearchBar.addEventListener('keyup', ({key}) =>{
    if (key ==='Enter'){
        
        let itemSearch = mainSearchBar.value;
    
        let customerRowList = document.querySelectorAll("#customer-row");
        
       
        
        //Reset the table
        if (!itemSearch){
            for (let i = 0; i < customerRowList.length; i++){
                 if (customerRowList[i].children[0].innerText !== '1'){
                    customerRowList[i].style.display = 'table-row';
                 }
                
            }
          
        }
         let searchResult = dataFetched.find(({id, name}) => ((id === itemSearch.toLowerCase()) || (name.toLowerCase() === itemSearch.toLowerCase())));
         
        if (searchResult){
            
            // document.querySelector("#product-table").appendChild(productRow);
            for (let i = 0; i < customerRowList.length; i++){
               
                if ((customerRowList[i].children[0].innerText !== searchResult.id) &&  (customerRowList[i].children[1].innerText !== searchResult.name)){
                   customerRowList[i].style.display = 'none';
                }
            }
        }else{
            alert("No customer found")
        }
        
    }
})












var modalContainer = document.querySelector(".customer-delete-modal-container");
var deleteTrigger = document.querySelector(".customer-delete-modal-trigger");
var exitBtn = document.querySelector(".customer-delete-exit");
var deleteBtn = document.querySelector(".customer-delete-button");
var modalSearchBtn = document.querySelector(".customer-delete-modal-input");
let customerToDelete;
deleteTrigger.addEventListener("click", (e) => {
    // modalContainer.style.cssText = "display: block";
    // ^ some how this doesn't work
    
    document.querySelector(".customer-delete-modal-container").style.cssText = "display: block";
})

deleteBtn.addEventListener("click", (e) => {
     if (customerToDelete){
        fetch(`${window.location.origin}/api/customer/` + customerToDelete.name, {
            method: 'DELETE',
        })
        .then(response => response.json())
        .then(({status}) => {
            console.log(status);

            if (status === "success"){
                document.querySelector(".customer-result p").innerHTML=`
        
           Successfully Deleted Customer!
        
        `
            }else{
                document.querySelector(".customer-result p").innerHTML=`
        
           Failed To Delete! Please try again.
        
        `
            }
        })
    }else{
         alert("Please Enter a Customer Id !!!!!!!!!");
    }
})

exitBtn.addEventListener("click", (e) => {
    document.querySelector(".customer-delete-modal-container").style.cssText = "display: none";
    
    // Clear input value when exiting the modal
    document.querySelector(".customer-delete-modal-input").value = "";
})

modalSearchBtn.addEventListener("keyup", ({key}) => {
   if (key ==='Enter'){
         let itemSearch = document.querySelector(".customer-delete-modal-input").value;
    
    if (!itemSearch){
        alert("Please Enter a Customer Id !!!!!!!!!");
    }


    customerToDelete = dataFetched.find(data => data.id === itemSearch);
    
    if (customerToDelete){
        
        document.querySelector(".customer-result p").innerHTML=`
        
          Result Found: <a href="">${customerToDelete.name} - ${customerToDelete.id}</a>
        
        `
    }else{
        document.querySelector(".customer-result p").innerHTML=`
        
           Result Found: No result Found!!!
        
        `
    }
   }
})
})()



