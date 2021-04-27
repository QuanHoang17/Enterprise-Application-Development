// Reusable components

const header = document.querySelector('#header');
const footer = document.querySelector('#footer');

fetch('./components/Header/header.html')
    .then(res => res.text())
    .then(data => {
        header.innerHTML = data;
    })
    .catch(e => console.log(e))

fetch('./components/Footer/footer.html')
    .then(res => res.text())
    .then(data => {
        footer.innerHTML = data;
    })
    .catch(e => console.log(e))