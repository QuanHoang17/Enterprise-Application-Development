(()=>{
    let dataFetched = [];
const imgUrl = 'http://localhost:8080/api/image/info';
fetch(imgUrl)
.then(response => response.json())
.then(data => {
    dataFetched = data;
   
    data.forEach(({id, name}) => {
    let imgRow = document.querySelector('#img-row').cloneNode();
    
    imgRow.style.display= 'table-row';
    imgRow.innerHTML=`
        <td>${id}</td>
        <td>
        <a target="_blank" href="http://localhost:8080/api/image/${name}">${name}</a>
        </td> 
    `



    document.querySelector("#img-table").appendChild(imgRow);
    
})

});


// ---------------------- Search Item on the Main Dashboard -----------------------------//

const mainSearchBar = document.querySelector(".searchbar-container #img-search-bar");

mainSearchBar.addEventListener('keyup', ({key}) =>{
    if (key ==='Enter'){
        
        let itemSearch = mainSearchBar.value;
    
        let imgRowList = document.querySelectorAll("#img-row");
        
       
        
        //Reset the table
        if (!itemSearch){
            for (let i = 0; i < imgRowList.length; i++){
                 if (imgRowList[i].children[0].innerText !== '01'){
                    imgRowList[i].style.display = 'table-row';
                 }
                
            }
          
        }
         let searchResult = dataFetched.find(({id, name}) => ((id === itemSearch.toLowerCase()) || (name.toLowerCase() === itemSearch.toLowerCase())));
         
        if (searchResult){
            console.log(2);
            // document.querySelector("#product-table").appendChild(productRow);
            for (let i = 0; i < imgRowList.length; i++){
                console.log(imgRowList[i].children[0].innerText);
                if ((imgRowList[i].children[0].innerText !== searchResult.id) &&  (imgRowList[i].children[1].innerText !== searchResult.name)){
                   imgRowList[i].style.display = 'none';
                }
            }
        }else{
            alert("No file found")
        }
        
    }
})









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

// ---------------------- Add Image to Database -----------------------------//

var addImageBtn = document.querySelector("#add-image-button");

addImageBtn.addEventListener("click", async () => {
    let formData = new FormData();

    // Input field
    let imageName = document.querySelector("#image-name");
    let imageFile = document.querySelector("#upload-file");
    let productID = document.querySelector("#product-id");

    let productInfo = {
        "name": imageName.value,
        "productID": productID.value
    };

    formData.append("file", imageFile.files[0]);
    formData.append("info", new Blob([JSON.stringify(productInfo)], {type:"application/json"}));

    let response = await fetch("http://localhost:8080/api/image", {
        method: 'POST',
        body: formData
    });
    let resData = await response.json();
    let alertMessage = "";
    if (resData["file"] == "existed") {
        alertMessage = alertMessage.concat("- File name already exist\n");
    }

    if (resData["fileType"] == "invalid_type") {
        alertMessage = alertMessage.concat("- Incorrect File Type. The file must be an image\n");
    }

    if (resData["product"] == "not_found") {
        alertMessage = alertMessage.concat("- Product ID don't exist\n");
    }

    if (resData["status"] == "success") {
        alertMessage = alertMessage.concat("Image successfully added\n");
    }

    alert(alertMessage);
});