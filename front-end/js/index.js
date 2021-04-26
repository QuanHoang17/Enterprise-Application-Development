const mainCover = document.querySelector('#main-cover');
const bestSellers = document.querySelector('#best-sellers');
const newProducts = document.querySelector('#new-products');
const categories = document.querySelector('#categories');

const fetchData = (source, target) => {
    fetch(source)
        .then(res => res.text())
        .then(data => {
            target.innerHTML = data;
            console.log('haha');
        })
        // .catch(e => console.log(e))
}

fetchData('./components/Index/Cover/cover.html', mainCover)