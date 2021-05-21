(()=>{
    // ------------------------------- Fetch Data into Table -------------------------------//
    let dataFetched = [];
    const categoryUrl = 'http://localhost:8080/api/category';
    fetch(categoryUrl)
    .then(response => response.json())
    .then(data => {
        dataFetched = data;
    
        data.forEach(({id, name}) => {
        let categoryRow = document.querySelector('#category-row').cloneNode();
        
        categoryRow.style.display= 'table-row';
        categoryRow.innerHTML=`
            <td>${id}</td>
            <td>${name}</td> 
        `



        document.querySelector("#category-table").appendChild(categoryRow);
        
    })

    });




        //Get the ADD CATEGORY Modal
    var addCategoryModal = document.getElementById("add-category-modal");

        // Get the button that opens the ADD CATEGORY modal
    var addBtn = document.getElementById("addBtn");

        // Get the <span> element that closes the ADD CATEGORY modal
    var spanAddCategory = document.getElementsByClassName("add-category-close")[0];

        // When the user clicks the button, open the ADD CATEGORY modal 
    addBtn.onclick = function() {
        addCategoryModal.style.display = "grid";
    }

    // When the user clicks on <span> (x), close the ADD CATEGORY modal
    spanAddCategory.onclick = function() {
        addCategoryModal.style.display = "none";
    }

    document.querySelector(".add-category-modal-body").addEventListener("submit", (e) =>{
        e.preventDefault();
        let newCategory = document.querySelector('#add-category-name').value;
        sendDataToServer({"name": newCategory});
    })

    const sendDataToServer = async (data) => {
    const response = await fetch(categoryUrl, {
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
           alert("Successfully Added Category");
           
           document.querySelector(".add-category-modal-body").reset();
        }else {
            alert("Sorry!!!! Failed To Add");
        }}
    
        );
}


/*------------------------------------------------------------------------------------------------------------- */
        //Get the DELETE CATEGORY Modal
    var deleteCategoryModal = document.getElementById("modal-delete-category");

        // Get the DELETE CATEGORY button that opens the modal
    var deleteBtn = document.getElementById("deleteBtn");

        // Get the <span> element that closes the modal
    var spanDeleteCategory = document.getElementsByClassName("close-delete-category-modal")[0];

        // When the user clicks the button, open the DELETE CATEGORY modal 
    // deleteBtn.onclick = function() {
    //     deleteCategoryModal.style.display = "block";
    // }

    

    deleteBtn.addEventListener('click', () =>{
        console.log(1);
        deleteCategoryModal.style.display = "grid";
    })

    // When the user clicks on <span> (x), close the DELETE CATEGORY modal
    spanDeleteCategory.onclick = function() {
        deleteCategoryModal.style.display = "none";
    }
    let itemToDelete;
//     document.querySelector(".body-delete-category #search-bar").addEventListener("keyup", ({key}) => {
//             if (key ==='Enter'){
//     //      let itemSearch = document.querySelector(".body-delete-category #search-bar").value;
    
//     // if (!itemSearch){
//     //     alert("Please Enter a Category Id !!!!!!!!!");
//     // }


//     // itemToDelete = dataFetched.find(data => data.id === itemSearch);
    
//     // if (itemToDelete){
        
//     //     document.querySelector(".body-delete-category p").innerHTML=`
        
//     //       Result Found: <a href="">${itemToDelete.name} - ${itemToDelete.id}</a>
        
//     //     `
//     // }else{
//     //     document.querySelector(".body-delete-category p").innerHTML=`
        
//     //        Result Found: No result Found!!!
        
//     //     `
//     // }
//    }
//     })

    const validateSearchInput = () => {
        let itemSearch = document.querySelector(".body-delete-category #search-bar").value;
    
    if (!itemSearch){
        alert("Please Enter a Category Id !!!!!!!!!");
    }


    itemToDelete = dataFetched.find(data => data.id === itemSearch);
    
    if (itemToDelete){
        
        document.querySelector(".body-delete-category p").innerHTML=`
        
          Result Found: <a href="">${itemToDelete.name} - ${itemToDelete.id}</a>
        
        `
    }else{
        document.querySelector(".body-delete-category p").innerHTML=`
        
           Result Found: No result Found!!!
        
        `
    }
    }

    document.querySelector(".body-delete-category").addEventListener("submit", (e) =>{
        e.preventDefault();
        // validateSearchInput();

        let itemSearch = document.querySelector(".body-delete-category #search-bar").value;
    
    if (!itemSearch){
        alert("Please Enter a Category Id !!!!!!!!!");
    }


    itemToDelete = dataFetched.find(data => data.id === itemSearch);
    
    if (itemToDelete){
        
        document.querySelector(".body-delete-category p").innerHTML=`
        
          Result Found: <a href="">${itemToDelete.name} - ${itemToDelete.id}</a>
        
        `
    }else{
        document.querySelector(".body-delete-category p").innerHTML=`
        
           Result Found: No result Found!!!
        
        `
    } 
   
    })


    document.querySelector("#delete-category-button").addEventListener("click", (e)=>{
        e.preventDefault();

        if (itemToDelete){
        fetch("http://localhost:8080/api/category/id/" + itemToDelete.id, {
            method: 'DELETE',
        })
        .then(response => response.json())
        .then(({status}) => {
            console.log(status);

            if (status === "success"){
                document.querySelector(".body-delete-category p").innerHTML=`
        
           Successfully Deleted Item!
        
        `
            }else{
                document.querySelector(".body-delete-category p").innerHTML=`
        
           Failed To Delete! Please try again.
        
        `
            }
        })
    }else{
         alert("Can't delete product that is not available");
    }
   
    })

})()