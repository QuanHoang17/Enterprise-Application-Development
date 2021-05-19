// Reusable components
const body = document.querySelector('body');
const header = document.querySelector('#header');
const footer = document.querySelector('#footer');
const indexHeader = document.querySelector('#index-header');
const indexFooter = document.querySelector('#index-footer');

const head = document.querySelector('head');

// Function declarations
// const loadFavicon = () => {
//     const favicon = document.createElement('link');
//     favicon.rel = 'shortcut icon';
//     favicon.href = '../assets/favicon.ico';
//     favicon.type = 'image/x-icon';
//     head.appendChild(favicon);
// }

const loadHeaderFooter = () => {
    // if (header != null) {
    //     fetch('../components/Header/header.html')

    //         .then(res => res.text())
    //         .then(data => {
    //             header.innerHTML = data;
    //         })
    //         .catch(e => console.log(e))
    // }

    // if (indexHeader != null) {
    //     fetch('./components/Header/header.html')
    //         .then(res => res.text())
    //         .then(data => {
    //             indexHeader.innerHTML = data;
    //         })
    //         .catch(e => console.log(e))
    // }

    if (footer != null) {
        fetch('../components/Footer/footer.html')
            .then(res => res.text())
            .then(data => {
                footer.innerHTML = data;
            })
            .catch(e => console.log(e))
    }

    if (indexFooter != null) {
        fetch('./components/Footer/footer.html')
            .then(res => res.text())
            .then(data => {
                indexFooter.innerHTML = data;
            })
            .catch(e => console.log(e))
    }
}



// Function calls
// loadFavicon();
loadHeaderFooter();














