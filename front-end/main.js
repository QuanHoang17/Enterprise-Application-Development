const header = document.querySelector('#header');

fetch('./components/Header/header.html')
    .then(res => res.text())
    .then(data => {
        header.innerHTML = data;
    })