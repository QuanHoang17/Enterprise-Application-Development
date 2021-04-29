// Reusable components

const header = document.querySelector('#header');
// <<<<<<< HEAD
const footer = document.querySelector('#footer');

fetch('./components/Header/header.html')
// =======
fetch('./components/Header/header.html') // Dynamic generate from server later.
// >>>>>>> 62d4eb7ab62ca18aa143dcb98ff93b558a716193
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