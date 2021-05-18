// window.onload = () => {
//     if (window.sessionStorage.getItem("privilage") != "admin") {
//         window.location.replace("login.html");
//     }
// };

// var logOutButton = document.querySelector("#log-out-button");

// logOutButton.addEventListener("click", () => {
//     window.sessionStorage.removeItem("privilage");
//     window.sessionStorage.removeItem("name");
//     window.location.replace("../index.html");
// });

$(function() {
    $('ul li').click(function() {
        $(this).addClass('active-nav').siblings('li').removeClass('active-nav');

        let sectionIndex = parseInt($(this).index() + 1);
        let currentSection = `.right section:nth-of-type(${sectionIndex})`;
    
        $(currentSection).stop().fadeIn(200, 'linear').siblings().stop().hide();
    })
})