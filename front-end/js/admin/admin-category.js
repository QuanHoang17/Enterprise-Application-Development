(()=>{
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

    console.log(deleteCategoryModal);

    deleteBtn.addEventListener('click', () =>{
        console.log(1);
        deleteCategoryModal.style.display = "grid";
    })

    // When the user clicks on <span> (x), close the DELETE CATEGORY modal
    spanDeleteCategory.onclick = function() {
        deleteCategoryModal.style.display = "none";
    }
})()