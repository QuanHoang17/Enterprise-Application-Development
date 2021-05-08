$(function() {
    $('ul li').click(function() {
        $(this).addClass('active-nav').siblings('li').removeClass('active-nav');

        let sectionIndex = parseInt($(this).index() + 1);
        let currentSection = `.right section:nth-of-type(${sectionIndex})`;
    
        $(currentSection).stop().fadeIn(200, 'linear').siblings().stop().hide();
    })
})