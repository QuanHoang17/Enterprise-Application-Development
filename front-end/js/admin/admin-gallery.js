(()=>{
    //Get the ADD IMAGE Modal
    var addImageModal = document.getElementById("addImage");

        // Get the button that opens the ADD IMAGE modal
    var addImageBtn = document.getElementById("addImageBtn");

        // Get the <span> element that closes the ADD IMAGE modal
    var addImageSpan = document.getElementsByClassName("add-image-close")[0];

        // When the user clicks the button, open the ADD IMAGE modal 
    addImageBtn.onclick = function() {
        addImageModal.style.display = "grid";
    }

    // When the user clicks on <span> (x), close the ADD IMAGE modal
    addImageSpan.onclick = function() {
        addImageModal.style.display = "none";
    }
})()