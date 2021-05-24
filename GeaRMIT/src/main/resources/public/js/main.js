(() => {
    const productUrl = 'http://localhost:8080/api/product';
    let productFetched = [];
    const fetchProductsFromDatabase = async () => {
        const response = await fetch(productUrl);


        response.json().then((productList) => {
            productFetched = productList;


        })
    }

    /*------ Handle Search Bar------- */
    const searchBar = document.querySelector('.search-bar input');

    searchBar.addEventListener('keyup', ({ key }) => {
        fetchProductsFromDatabase();
        if (key === 'Enter') {
            let itemSearch = searchBar.value;

            if (!itemSearch) {
                alert("Please Enter a Something!");
            }

            //search by product name while handling case sensitive search.
            searchResult = productFetched.find(item => (item.name.toLowerCase() === itemSearch.toLowerCase()));


            if (searchResult) {
                let currentURL = window.location.pathname;
                let urlPath = currentURL.split("/");
                if (urlPath[urlPath.length - 2] === "pages") {
                    window.location.replace("./product-description.html?&name=" + searchResult.name);
                } else {
                    window.location.replace("./pages/product-description.html?&name=" + searchResult.name);
                }
            }
        }
    });
})()























