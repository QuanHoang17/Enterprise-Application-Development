// Version 1, using fetch -- DEPRECATED!
// Using fetch() has some problems regarding selecting elements to manipulate data later on
// Version 2 below uses jQuery instead

// const mainCover = document.querySelector('#main-cover');
// const bestSellers = document.querySelector('#best-sellers');
// const newProducts = document.querySelector('#new-products');
// const categories = document.querySelector('#categories');

// let sections = [mainCover, bestSellers, newProducts, categories];

// //Dynamic generate from the server.
// let secionLinks = [
//     './components/Index/Cover/cover.html',
//     './components/Index/BestSellers/best-sellers.html',
//     './components/Index/NewProducts/new-products.html',
//     './components/Index/Categories/categories.html'
// ]

// const fetchData = (source, target) => {
//     fetch(source)
//         .then(res => res.text())
//         .then(data => {
//             target.innerHTML = data;
//         })
//         .catch(e => console.log(e))
// }


// for (let i = 0; i < sections.length; ++i) {
//     fetchData(secionLinks[i], sections[i]);
// }

// $(function() {
//     console.log("From indexJS");
//     $("#blabla").on('click', function() {
//         console.log('click');
//     })
// })

document.addEventListener('DOMContentLoaded', function() {
    const categoryList = document.getElementsByClassName('category-item');
 const categoryArr = [...categoryList];
  console.log(categoryArr);
});

// VERSION 2 -- USING JQUERY AJAX
$(function () {
  $('#main-cover').load("./components/Index/Cover/cover.html");
  $('#best-sellers').load("./components/Index/BestSellers/best-sellers.html");
  $('#new-products').load("./components/Index/NewProducts/new-products.html");
  $('#categories').load("./components/Index/Categories/categories.html");

  // console.log('loaded successfully');
});


// Scroll to top button
const btn = $('#btnScrollTop');

$(window).scroll(function () {
  if ($(window).scrollTop() > 300) {
    btn.addClass('show');
  } else {
    btn.removeClass('show');
  }
});

btn.on('click', function (e) {
  e.preventDefault();
  $('html, body').animate({ scrollTop: 0 }, '300');
});


// Select category section
body.onload = () => {

  // Toggle burger button
  let menuOpen = false;
  $('#nav-icon3').click(function () {
    $(this).toggleClass('open');
    if (menuOpen === false) {
      menuOpen = true;
      $('.browse-category').show();
    } else {
      menuOpen = false;
      $('.browse-category').hide();
    }
  });
}



