// Controller for brand choices
const brandChoiceList = document.querySelectorAll(".brand-choice");

Array.from(brandChoiceList).forEach(brandChoice => {
    brandChoice.addEventListener("click", (e) => {
        if (document.querySelector(".brand-active")) {
            document.querySelector(".brand-active").classList.remove("brand-active");
        }

        brandChoice.classList.add("brand-active");
    })
})

// Controller for price choices
const priceChoiceList = document.querySelectorAll(".price-choice");

Array.from(priceChoiceList).forEach(priceChoice => {
    priceChoice.addEventListener("click", (e) => {
        if (document.querySelector(".price-active")) {
            document.querySelector(".price-active").classList.remove("price-active");
        }

        priceChoice.classList.add("price-active");
    })
})

// Controller for type choices
const typeChoiceList = document.querySelectorAll(".type-choice");

Array.from(typeChoiceList).forEach(typeChoice => {
    typeChoice.addEventListener("click", (e) => {
        if (document.querySelector(".type-active")) {
            document.querySelector(".type-active").classList.remove("type-active");
        }

        typeChoice.classList.add("type-active");
    })
})

// Controller for sorting 
var sortField = document.querySelector(".sort-field");
var temp = "";

const sortValueList = document.querySelectorAll(".sort-value");

Array.from(sortValueList).forEach(sortValue => {
    sortValue.addEventListener("click", (e) => {
        // temp = sortField.textContent;
        sortField.innerHTML = sortValue.textContent;
        // sortValue.innerHTML = temp;
    }) 
})

// Controller for range slider using JQuery
$(function () {
    $("#slider-range").slider({
        range: true, // To make the middle range highlighted
        min: 0,
        max: 200,
        values: [40, 120],
        slide: function (event, ui) {
            $("#amount").val("$" + ui.values[0] + " - $" + ui.values[1]);
            document.querySelector(".min-value").value = ui.values[0];
            document.querySelector(".max-value").value = ui.values[1];
        }
    });
    $("#amount").val("$" + $("#slider-range").slider("values", 0) + " - $" + $("#slider-range").slider("values", 1));
});