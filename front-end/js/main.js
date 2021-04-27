// Reusable components

const header = document.querySelector('#header');
fetch('./components/Header/header.html') // Dynamic generate from server later.
    .then(res => res.text())
    .then(data => {
        header.innerHTML = data;
    })
    .catch(e => console.log(e))