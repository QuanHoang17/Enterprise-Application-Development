// Reusable components

const header = document.querySelector('#header');
const body = document.querySelector('body');

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
    favicon.href = '../assets/favicon.ico';
    favicon.type = 'image/x-icon';
    head.appendChild(favicon);
}

loadFavicon();

// fetch('./components/Header/header.html')
// =======
fetch('../components/Header/header.html') // Dynamic generate from server later.

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



// function loadSiteLogo() {
//     const logo = document.querySelector("#site-logo");
//     let imgPath = '';
//     if (window.location.pathname === '/front-end/') {
//         console.log(window.location.pathname);
//         console.log(logo);
//         imgPath = './assets/logo.png';
        
//     } else {
//         imgPath = '../assets/logo.png';
//     }
//     let logoElement = `<img src="${imgPath}" widt="100px"></img>`
//     logo.innerHTML = logoElement;

// }


// window.onload = () => {
//     // loadSiteLogo();
    
// }






