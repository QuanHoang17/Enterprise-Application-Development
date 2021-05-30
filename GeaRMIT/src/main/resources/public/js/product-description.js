//----------------------------------------- Variables ------------------------------------//

// For images
var mainPic = document.querySelector(".main-pic");
var productName = document.querySelector(".product-name");
var productCategory = document.querySelector(".product-category");
var productStatus = document.querySelector(".product-status");
var productPrice = document.querySelector(".product-price");
var productDescription = document.querySelector(".description");
var turnBack = document.querySelector(".turn-back");
var imgList = [];
var colorList = [];

//----------------------------------------- Functions ------------------------------------//

// Fetch product information from product name in url
const itemName = new URLSearchParams(window.location.search).get('name');
console.log(itemName);

fetch(`${window.location.origin}/api/product/name/${itemName}`)
    .then(response => response.json())
    .then(product => {
        console.log(product);

        productName.innerHTML = product[0].name;
        productCategory.innerHTML = product[0].categoryName;
        productPrice.innerHTML = product[0].price + ' USD';
        productDescription.innerHTML = product[0].description;
        imgList = product[0].imageName;
        colorList = product[0].color;
        turnBack.setAttribute("href", `./category.html?&category=${product[0].categoryName}`);



        // Update color choices
        colorList.forEach(color => {
            document.querySelector(".color").innerHTML +=
            `
            <div class="choice">
                <i class="fas fa-check-circle"></i>
                <span class="">${color}</span>
            </div>
            `;
        })



        // Controller for choices
        const colorChoiceList = document.querySelectorAll('.choice');
        Array.from(colorChoiceList).forEach(colorChoice => {
            colorChoice.addEventListener('click', (e) => {
                document.querySelector('.active').classList.remove('active');

                colorChoice.classList.add('active');
            })
        })



        // Controller for images
        // Change image for main pic and first small pic
        mainPic.src = `${window.location.origin}/api/image/${imgList[0]}`;

        document.querySelector(".small-pics").innerHTML +=
        `
        <div class="small-pic-container">
            <div class="img-container">
                <img src="${window.location.origin}/api/image/${imgList[0]}" alt="" class="small-pic img-active">
            </div>
        </div>
        `;

        // Change image for remaining small pics
        for (let i = 1; i < imgList.length; i++) {
            document.querySelector(".small-pics").innerHTML +=
            `
            <div class="small-pic-container">
                <div class="img-container">
                    <img src="${window.location.origin}/api/image/${imgList[i]}" alt="" class="small-pic">
                </div>
            </div>
            `;
        }

        // Click actions for small pics
        const smallPicList = document.querySelectorAll('.small-pic');
        Array.from(smallPicList).forEach(smallPic => {
            smallPic.addEventListener('click', (e) => {
                document.querySelector('.img-active').classList.remove('img-active');

                smallPic.classList.add('img-active');

                mainPic.src = smallPic.src;
            })
        })
    })