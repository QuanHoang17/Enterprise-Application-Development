/*------------- FETCH DATA INTO CATEGORY SECTIONS --------------*/
const productUrl = 'http://localhost:8080/api/product';
let productFetched = [];
const fetchProductsFromDatabase = async () => {
    const response = await fetch(productUrl);


    response.json().then((productList) => {
        productFetched = productList;

        displayProductByCategory('Headsets');
        displayNewProduct();
        loadCarouselProduct();
    })
}

const displayProductByCategory = (categoryToFilter) => {
    let cardList = productFetched.filter(({ categoryName }) => categoryName === categoryToFilter).map(({ name, quantity, categoryName, price, description, imageName, color }) => {
        let available = 'Outstock';
        let imgSrc = 'http://localhost:8080/api/image/' + imageName[0];
        quantity > 0 ? available = 'Available' : available = 'Outstock';

        return createProductCardElement(name, description, price.toString(), categoryName, available, color.join(', '), imgSrc);
    });


    document.querySelector('.product-detail-list.section').replaceChildren(...cardList);

}

const displayNewProduct = () => {
    // Sort the products by issueDate in descending order
    productFetched.sort((a, b) => { if (a.issueDate < b.issueDate) { return 1; } return -1; })

    const newProductContainer = document.querySelector('.new-product-section');
    newProductContainer.innerHTML = '';
    for (let i = 0; i < 2; i++) {
        newProductContainer.innerHTML += `
        <div class="new-product-card">
                    <h1>${productFetched[i].name}</h1>
                    
                    <a target='_blank'  class="primary-cta--medium" href="./pages/product-description.html?&name=${productFetched[i].name}">
                      View Detail
                    </a>
                    
                    
                </div> `

    }

}

const createProductCardElement = (name, description, price, category, available, colorList, imgSrc) => {
    let cardContainer = document.createElement('DIV');
    cardContainer.classList.add('product-detail-card');


    cardContainer.innerHTML = `

    <img src= "${imgSrc}" alt=${name}/>
                            <div class="product-info">
                                <h5>${name}</h5>
                                <p>${description}</p>
                                <div class="product-grid">
                                    <span>Category</span>
                                    <span id="product-info-category">${category}</span>
                                    <span>Status</span>
                                    <span id="product-info-status">${available}</span>
                                    <span>Color</span>
                                    <span id="product-info-color">${colorList}</span>
                                </div>
                            </div>
                            <div class="price-and-shipping">
                                <h1>${price} USD</h1>
                                <p>${parseInt(price * 1.3)} USD</p>
                                <p>Free Shipping</p>
                                <button>Add to Cart</button>
                                <a href='./pages/product-description.html?&name=${name}'><button><i class="fas fa-info-circle"></i>
                                    More detail</button></a>
                            </div>
  
  
  `
    return cardContainer;
}

fetchProductsFromDatabase();












/*------ Best Seller Carousel Product Fetching------- */
const carouselList = document.querySelector('.best-seller-product-list');
const NUMBER_OF_ITEMS = 4;


const buildCard = (name, description, price, imageName) => {
    let card = `<div class="best-seller-product-card item">
            <span class="discount">-30%</span>
            <img src="http://localhost:8080/api/image/${imageName[0]}"
                alt="" class="best-seller-product-image">
            <p class="product-title">${name}</p>
            <p class="product-description">${description}</p>
            <div class="small-container">
                <div class="smaller-container">
                    <p class="product-price">${price} USD</p>
                    <p class="product-old-price">${parseInt(price * 1.3)} USD</p>
                </div>

               
                <a target="_blank" href="./pages/product-description.html?&name=${name}" class="primary-cta--small">View Detail</a>
            </div>
        </div>`;

    return card;
}



const loadCarouselProduct = () => {


    // Reset Carousel If There Are Any Products.
    for (let i = 0; i < NUMBER_OF_ITEMS; i++) {
        $(".best-seller-product-list").trigger('remove.owl.carousel', [i]).trigger('refresh.owl.carousel');
    };


    for (let i = 0; i < NUMBER_OF_ITEMS; i++) {
        let { name, description, price, imageName } = productFetched[i];
        let productCard = buildCard(name, description, price, imageName);


        $('.best-seller-product-list').owlCarousel('add', productCard).owlCarousel('update');


    }

    loadCarousel();

}



function loadCarousel() {

    $('.best-seller-product-list')
        .owlCarousel({
            items: 4,
            dots: true,
            loop: true,
            margin: 20,
            navigation: true,
            nav: true,
            autoplay: true,
            autoplayTimeout: 2000,
            autoplayHoverPause: true,
            responsive: {
                0: {
                    items: 1
                },
                600: {
                    items: 3
                },
                1000: {
                    items: 4,
                }
            }
        })
}


// Function calls
$(function () {
    //fetchProductsFromDatabase();
    loadCarousel();
})


// Scroll to top button
const btn = $('#btnScrollTop');

$(window).scroll(function () {
    if ($(window).scrollTop() > 300) {
        btn.addClass('show');
    } else {
        btn.removeClass('show');
    }
});

btn.on('click', function (e) {
    e.preventDefault();
    $('html, body').animate({ scrollTop: 0 }, '300');
});

/*------ Toggle Category Style ------- */
$(function () {
    $('ul li').click(function () {
        $(this).addClass('selected').siblings('li').removeClass('selected');
        let categoryName = $(this).text();
        let sectionIndex = parseInt($(this).index() + 1);
        let currentSection = `.section:nth-of-type(${sectionIndex})`;

        $(currentSection).stop().fadeIn(200, 'linear').siblings().stop().hide();
        displayProductByCategory(categoryName);

        document.querySelector('#browse-category-cta').setAttribute('href', `./pages/category.html?&category=${categoryName}`);

    })
})




// Select category section
window.onload = () => {

    // Toggle burger button
    let menuOpen = false;
    $('#nav-icon3').click(function () {
        $(this).toggleClass('open');
        if (menuOpen === false) {
            menuOpen = true;
            $('.browse-category').show();
        } else {
            menuOpen = false;
            $('.browse-category').hide();
        }
    });
}



