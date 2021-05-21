var categoryName = new URLSearchParams(window.location.search).get("category");

var priceLimit = 0;
var productArray = [];
var brandNameArray = [];
var colorArray = [];
var filter = {
    "brand": "all",
    "color": "all",
    "priceMin": 0,
    "priceMax": 0
}

// Based html element
const categoryIndicator = document.querySelector(".bread-crumb .last");
var minPrice = document.querySelector("#min-price");
var maxPrice = document.querySelector("#max-price");
var filterButton = document.querySelector("#apply-filter-button");
var productQuantity = document.querySelector("#product-quantity");
var brandChoiceList = [];
var colorChoiceList = [];

// update category breadcrumb based on the category page.
categoryIndicator.innerText = categoryName;
function renderProductList() {
    let gridContainer = document.querySelector("#grid-container");
    gridContainer.innerHTML = "";
    let currentAcceptProduct = 0;
    let rowContainer = document.createElement("div");
    rowContainer.classList.add("row-container");

    productArray.map((product, index) => {
        let acceptBrand = true;
        let acceptPrice = true;
        let acceptColor = true;
        // Filter brand
        if (filter.brand != "all" && product.brandName != filter.brand) {
            acceptBrand = false;
        }

        // Filter color
        if (filter.color != "all" && !product.color.includes(filter.color)) {
            acceptColor = false;
        }

        // Filter price
        if (product.price < filter.priceMin || product.price > filter.priceMax) {
            acceptPrice = false;
        }

        // Render product satisfy all filter
        if (acceptBrand && acceptPrice && acceptColor) {
            currentAcceptProduct = currentAcceptProduct + 1;
            let productContainer = document.createElement("div");
            productContainer.classList.add("product-container");
            productContainer.innerHTML +=
                `<div class="content-container">
                    <div class="img-container">
                        <img src="http://localhost:8080/api/image/${product["imageName"][0]}" alt="product image">
                    </div>
                    
                    <p class="title">${product.name}</p>
                    <p class="description">${product.description.substring(0, 40)}</p>
                    
                    <div class="bottom-container">
                        <div class="price-container">
                            <p class="price">${product.price} USD</p>
                        </div>
                        <a href="product-description.html?&name=${product.name}"><button class="primary-cta--small">View detail</button></a>
                    </div>
                </div>`
            rowContainer.appendChild(productContainer);
        }

        // Create new row every 3 product
        if (index == productArray.length - 1) {
            gridContainer.appendChild(rowContainer);
        } else if (currentAcceptProduct % 3 == 0) {
            gridContainer.appendChild(rowContainer);
            
            rowContainer = document.createElement("div");
            rowContainer.classList.add("row-container");
        }
    })
    productQuantity.innerHTML = currentAcceptProduct;
}

function renderBrandChoice() {
    let brandChoiceContainer = document.querySelector("#brand-choice-container");
    // Display brand choice
    brandNameArray.map((brandName, index) => {
        let brandChoice = document.createElement("div");
        brandChoice.classList.add("brand-choice");
        brandChoice.classList.add("choice");
        brandChoice.classList.add("op");
        brandChoice.id = "brand-choice";
        brandChoice.dataset.brand = brandName;

        brandChoice.innerHTML += `
            <i class="fas fa-check-circle"></i>
            <label>${brandName}</label>`
        brandChoiceContainer.appendChild(brandChoice);
    });

    // Controller for brand choices
    brandChoiceList = document.querySelectorAll(".brand-choice");

    // Set filter value for brand when click
    Array.from(brandChoiceList).forEach(brandChoice => {
        brandChoice.addEventListener("click", (e) => {
            if (document.querySelector(".brand-active")) {
                document.querySelector(".brand-active").classList.remove("brand-active");
            }
            brandChoice.classList.add("brand-active");

            filter.brand = brandChoice.getAttribute("data-brand");
            console.log(filter);
        })
    })
}

function renderColorChoice() {
    let colorChoiceConatiner = document.querySelector("#color-choice-container");

    colorArray.map((color, index) => {
        let colorChoice = document.createElement("div");
        colorChoice.classList.add("color-choice");
        colorChoice.classList.add("choice");
        colorChoice.classList.add("op");
        colorChoice.id = "color-choice";
        colorChoice.dataset.color = color;

        colorChoice.innerHTML += `
            <i class="fas fa-check-circle"></i>
            <label for="">${color}</label>`
        colorChoiceConatiner.appendChild(colorChoice);
    })

    // Controller for color choices
    colorChoiceList = document.querySelectorAll(".color-choice");

    // Set filter value for color when click
    Array.from(colorChoiceList).forEach(colorChoice => {
        colorChoice.addEventListener("click", (e) => {
            if (document.querySelector(".color-active")) {
                document.querySelector(".color-active").classList.remove("color-active");
            }

            colorChoice.classList.add("color-active");

            filter.color = colorChoice.getAttribute("data-color");
            console.log(filter);
        })
    })
}

function sortProduct(option, direction) {
    if (option === "name" && direction === "ascending") {
        productArray.sort((a, b) => {
            var nameA = a.name.toUpperCase();
            var nameB = b.name.toUpperCase(); 
            if (nameA < nameB) {
              return -1;
            }
            if (nameA > nameB) {
              return 1;
            }
            return 0;
        });
    } else if (option === "name" && direction === "descending") {
        productArray.sort((a, b) => {
            var nameA = a.name.toUpperCase();
            var nameB = b.name.toUpperCase(); 
            if (nameA > nameB) {
              return -1;
            }
            if (nameA < nameB) {
              return 1;
            }
        
            return 0;
        });
    } else if (option === "price" && direction === "ascending") {
        productArray.sort((a, b) => a.price - b.price);
    } else if (option === "price" && direction === "ascending") {
        productArray.sort((a, b) => b.price - a.price);
    }
}

// Request product
fetch(`http://localhost:8080/api/product/category_name/${categoryName}`)
    .then(data => data.json())
    .then(json => {
        // Display product, create brand array, color array and product array
        json.map((product, index) => {
            // Set max price
            if (product.price > priceLimit) {
                priceLimit = product.price;
            }

            // Add product to product array
            productArray.push(product);

            // Add brand to brand array
            if (!brandNameArray.includes(product["brandName"])) {
                brandNameArray.push(product["brandName"]);
            }

            // Add available color to color array
            product.color.forEach(element => {
                if (!colorArray.includes(element)) {
                    colorArray.push(element);
                }
            });
        });
        // Initialy sort alphabetically a -> z
        sortProduct("name", "ascending");

        // Initialize price
        filter.priceMax = priceLimit;
        maxPrice.value = priceLimit;
        minPrice.value = 0;

        // Display product
        renderProductList();
        
        // Display brand choice
        renderBrandChoice();

        // Display color choice
        renderColorChoice();

        // Controller for range slider using JQuery
        $(function () {
            $("#slider-range").slider({
                range: true, // To make the middle range highlighted
                min: 0,
                max: priceLimit,
                values: [0, priceLimit],
                slide: function (event, ui) {
                    // $("#amount").val("$" + ui.values[0] + " - $" + ui.values[1]);
                    document.querySelector(".min-value").value = ui.values[0];
                    document.querySelector(".max-value").value = ui.values[1];
                    filter.priceMin = parseInt(ui.values[0]);
                    filter.priceMax = parseInt(ui.values[1]);
                }
            });
            // $("#amount").val("$" + $("#slider-range").slider("values", 0) + " - $" + $("#slider-range").slider("values", 1));
        });
    })

// Price controller
// Confirm value when out focus
minPrice.addEventListener("focusout", (e) => {
    let regex=/^[0-9]+$/;
    if (!minPrice.value.match(regex)) {
        minPrice.value = 0;
    }
    maxPriceInt = parseInt(maxPrice.value);
    minPriceInt = parseInt(minPrice.value);
    if (minPriceInt < 0) {
        minPrice.value = 0;
    }
    if (minPriceInt > maxPriceInt) {
        minPrice.value = maxPrice.value;
    }
    $(function () {
        $("#slider-range").slider({
            values: [minPrice.value, maxPrice.value]
        });
        // $("#amount").val("$" + $("#slider-range").slider("values", 0) + " - $" + $("#slider-range").slider("values", 1));
    });
    filter.priceMin = parseInt(minPrice.value);
})

// Confirm value when press Enter
minPrice.addEventListener("keyup", (e) => {
    if (e.keyCode === 13) {
        e.preventDefault();
        let regex=/^[0-9]+$/;
        if (!minPrice.value.match(regex)) {
            minPrice.value = 0;
        }
        maxPriceInt = parseInt(maxPrice.value);
        minPriceInt = parseInt(minPrice.value);
        if (minPriceInt < 0) {
            minPrice.value = 0;
        }
        if (minPriceInt > maxPriceInt) {
            minPrice.value = maxPrice.value;
        }
        $(function () {
            $("#slider-range").slider({
                values: [minPrice.value, maxPrice.value]
            });
            // $("#amount").val("$" + $("#slider-range").slider("values", 0) + " - $" + $("#slider-range").slider("values", 1));
        });
        filter.priceMin = parseInt(minPrice.value);
    }
})

maxPrice.addEventListener("focusout", (e) => {
    let regex=/^[0-9]+$/;
    if (!maxPrice.value.match(regex)) {
        maxPrice.value = priceLimit;
    }
    maxPriceInt = parseInt(maxPrice.value);
    minPriceInt = parseInt(minPrice.value);
    if (maxPriceInt > priceLimit) {
        maxPrice.value = priceLimit;
    }
    if (maxPriceInt < minPriceInt) {
        maxPrice.value = minPrice.value;
    }
    $(function () {
        $("#slider-range").slider({
            values: [minPrice.value, maxPrice.value]
        });
        // $("#amount").val("$" + $("#slider-range").slider("values", 0) + " - $" + $("#slider-range").slider("values", 1));
    });
    filter.priceMax = parseInt(maxPrice.value);
})

maxPrice.addEventListener("keyup", (e) => {
    if (e.keyCode === 13) {
        e.preventDefault();
        let regex=/^[0-9]+$/;
        if (!maxPrice.value.match(regex)) {
            maxPrice.value = priceLimit;
        }
        maxPriceInt = parseInt(maxPrice.value);
        minPriceInt = parseInt(minPrice.value);
        if (maxPriceInt > priceLimit) {
            maxPrice.value = priceLimit;
        }
        if (maxPriceInt < minPriceInt) {
            maxPrice.value = minPrice.value;
        }
        $(function () {
            $("#slider-range").slider({
                values: [minPrice.value, maxPrice.value]
            });
            // $("#amount").val("$" + $("#slider-range").slider("values", 0) + " - $" + $("#slider-range").slider("values", 1));
        });
        filter.priceMax = parseInt(maxPrice.value);
    }
})

// Controller for sorting 
var sortField = document.querySelector(".sort-field");
var temp = "";

const sortValueList = document.querySelectorAll(".sort-value");

Array.from(sortValueList).forEach(sortValue => {
    sortValue.addEventListener("click", (e) => {
        // temp = sortField.textContent;
        sortField.innerHTML = sortValue.textContent;
        sortProduct(sortValue.getAttribute("data-sort-field"), sortValue.getAttribute("data-sort-direction"))
        renderProductList();
        // sortValue.innerHTML = temp;
    }) 
})

// Filter button action
filterButton.addEventListener("click", (e) => {
    console.log(filter);
    renderProductList();
})

