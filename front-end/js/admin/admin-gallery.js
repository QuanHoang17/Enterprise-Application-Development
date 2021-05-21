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