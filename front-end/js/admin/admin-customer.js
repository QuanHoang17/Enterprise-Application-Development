// ------------------------------- Fetch Data into Table -------------------------------//

const customerUrl = 'http://localhost:8080/api/customer';
fetch(customerUrl)
.then(response => response.json())
.then(data => {
    let activeCount = 0
    
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






var modalContainer = document.querySelector(".customer-delete-modal-container");
var deleteTrigger = document.querySelector(".customer-delete-modal-trigger");
var exitBtn = document.querySelector(".customer-delete-exit");
var deleteBtn = document.querySelector(".customer-delete-button");
var modalSearchBtn = document.querySelector(".customer-delete-modal-search");

deleteTrigger.addEventListener("click", (e) => {
    // modalContainer.style.cssText = "display: block";
    // ^ some how this doesn't work
    
    document.querySelector(".customer-delete-modal-container").style.cssText = "display: block";
})

deleteBtn.addEventListener("click", (e) => {
    alert('Delete customer button clicked');
})

exitBtn.addEventListener("click", (e) => {
    document.querySelector(".customer-delete-modal-container").style.cssText = "display: none";
    
    // Clear input value when exiting the modal
    document.querySelector(".customer-delete-modal-input").value = "";
})

modalSearchBtn.addEventListener("click", (e) => {
    let customerName = document.querySelector(".customer-delete-modal-input").value;
    alert("Customer name: " + customerName);
})