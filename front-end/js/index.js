/*------------- FETCH DATA INTO CATEGORY SECTIONS --------------*/
const productUrl = 'http://localhost:8080/api/product'; 
let productFetched =[];
const fetchProductsFromDatabase = async () => {
    const response = await fetch(productUrl);
   
   
    response.json().then((productList) => {
      productFetched = productList;
        
      displayProductByCategory('Headsets');
      displayNewProduct();
    })
}

const displayProductByCategory = (categoryToFilter) => {
  let cardList = productFetched.filter(({categoryName}) => categoryName === categoryToFilter).map(({name, quantity, categoryName, price, description, imageName, color}) => {
          let available = 'Outstock';
          let imgSrc = 'http://localhost:8080/api/image/' + imageName[0]; 
          quantity > 0 ? available = 'Available' : available = 'Outstock'; 
          
          return createProductCardElement(name, description, price.toString(), categoryName, available, color.join(', '), imgSrc);
        });
      
      
        document.querySelector('.product-detail-list.section').replaceChildren(...cardList);
      
}

const displayNewProduct = () => {
  // Sort the products by issueDate in descending order
  productFetched.sort((a, b) => {if (a.issueDate < b.issueDate) {return 1;} return -1;})
  //productFetched.forEach(item => {console.log(item.issueDate)})
  const newProductContainer = document.querySelector('.new-product-section');
  newProductContainer.innerHTML='';
  for (let i = 0; i < 2; i++){
      newProductContainer.innerHTML+=`
        <div class="new-product-card">
                    <h1>${productFetched[i].name}</h1>
                    
                    <a target='_blank'  class="primary-cta--medium" href="./pages/product-description.html?&name=${productFetched[i].name}">
                      View Detail
                    </a>
                    
                    
                </div>
  
      `
    
  }
  
}

const createProductCardElement = (name, description, price, category, available, colorList, imgSrc) => {
  let cardContainer =document.createElement('DIV');
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
                                <p>99.69 USD</p>
                                <p>Free Shipping</p>
                                <button>Add to Cart</button>
                                <button><i class="fas fa-info-circle"></i>
                                    More detail</button>
                            </div>
  
  
  ` 
  return cardContainer; 
}

fetchProductsFromDatabase();

/*------ Handle Search Bar------- */
const searchBar = document.querySelector('.search-bar input');

searchBar.addEventListener('keyup', ({key}) =>{
    if (key ==='Enter'){
        let itemSearch = searchBar.value;
    
        if (!itemSearch){
            alert("Please Enter a Something !!!!!!!!!");
        }

        //search by product name or category name.
        searchResult = productFetched.find(item => (item.name.toLowerCase() === itemSearch.toLowerCase()));

       

        if (searchResult){
          alert(searchResult)
          window.location.replace("./pages/product-description.html?&name="+ searchResult.name);
        }
    }
})




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
                    autoplayTimeout: 3000,
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
$(function() {
        $('ul li').click(function() {
            $(this).addClass('selected').siblings('li').removeClass('selected');
            let categoryName = $(this).text();
            let sectionIndex = parseInt($(this).index() + 1);
            let currentSection = `.section:nth-of-type(${sectionIndex})`;
        
            $(currentSection).stop().fadeIn(200, 'linear').siblings().stop().hide();
            displayProductByCategory(categoryName);

            document.querySelector('#browse-category-cta').setAttribute('href', `../front-end/pages/category.html?&category=${categoryName}`);
            
        })
    })






//TODO: Consider delete this
// Select category section
body.onload = () => {

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



