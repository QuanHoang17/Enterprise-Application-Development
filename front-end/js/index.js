const mainCover = document.querySelector('#main-cover');
const bestSellers = document.querySelector('#best-sellers');
const newProducts = document.querySelector('#new-products');
const categories = document.querySelector('#categories');

let sections = [mainCover, bestSellers, newProducts, categories];

//Dynamic generate from the server.
let secionLinks = [
    './components/Index/Cover/cover.html',
    './components/Index/BestSellers/best-sellers.html',
    './components/Index/NewProducts/new-products.html',
    './components/Index/Categories/categories.html'
]

const fetchData = (source, target) => {
    fetch(source)
        .then(res => res.text())
        .then(data => {
            target.innerHTML = data;
        })
        .catch(e => console.log(e))
}

for (let i = 0; i < sections.length; ++i) {
    fetchData(secionLinks[i], sections[i]);
}