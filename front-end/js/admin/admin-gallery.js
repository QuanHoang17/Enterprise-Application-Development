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