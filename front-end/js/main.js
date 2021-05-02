// Reusable components

const header = document.querySelector('#header');
// <<<<<<< HEAD
const footer = document.querySelector('#footer');
const indexHeader = document.querySelector('#index-header');
const indexFooter = document.querySelector('#index-footer');

const head = document.querySelector('head');


// const link = document.createElement('link');
// link.create
// head.appendChild()

const loadFavicon = () => {
    const favicon = document.createElement('link');
    favicon.rel = 'shortcut icon';
    favicon.href = '../assets/favicon.png';
    favicon.type = 'image/x-icon';
    head.appendChild(favicon);
}

// fetch('./components/Header/header.html')
// =======
fetch('../components/Header/header.html') // Dynamic generate from server later.
    // >>>>>>> 62d4eb7ab62ca18aa143dcb98ff93b558a716193
    .then(res => res.text())
    .then(data => {
        header.innerHTML = data;
    })
    .catch(e => console.log(e))

fetch('./components/Header/header.html')
    .then(res => res.text())
    .then(data => {
        indexHeader.innerHTML = data;
    })
    .catch(e => console.log(e))

fetch('../components/Footer/footer.html')
    .then(res => res.text())
    .then(data => {
        footer.innerHTML = data;
    })
    .catch(e => console.log(e))

fetch('./components/Footer/footer.html')
    .then(res => res.text())
    .then(data => {
        indexFooter.innerHTML = data;
    })
    .catch(e => console.log(e))


loadFavicon();


