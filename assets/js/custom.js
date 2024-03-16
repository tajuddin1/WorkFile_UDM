// Mobile Menu 
function myFunction(x) {
    x.classList.toggle("change");
    var navigation = document.querySelector(".navigation-mobile");
    navigation.classList.toggle("active");
}

document.addEventListener('DOMContentLoaded', function() {
    var toggleBtns = document.querySelectorAll('.sub-menu-toggle');
    var goBackBtns = document.querySelectorAll('.go-back');

    toggleBtns.forEach(function(toggleBtn) {
        toggleBtn.addEventListener('click', function() {
            var subMenuWrapper = this.nextElementSibling;
            subMenuWrapper.classList.toggle('active');
        });
    });

    goBackBtns.forEach(function(goBackBtn) {
        goBackBtn.addEventListener('click', function() {
            var subMenuWrapper = this.closest('.sub-menu-wrapper');
            subMenuWrapper.classList.remove('active');
        });
    });
});

// Sticky Nav

var headerTop = document.querySelector('header');
var header = document.querySelector('.main-header');

window.addEventListener('scroll', function() {
    if (window.pageYOffset >= 104) {
        header.classList.add('sticky');
        headerTop.classList.add('pb-5');
    } else {
        header.classList.remove('sticky');
        headerTop.classList.remove('pb-5');
    }
});


// Desktop Menu

var defaultTabContent = $('.menu-content').html();

var defaultTabContents = {};
$('.tab-pane').each(function() {
    var tabId = $(this).attr('id');
    defaultTabContents[tabId] = $(this).html();
});

$('.mega-menu').mouseleave(function(){
    $('.manu-item-content .nav-link').removeClass('active');
    $('.menu-content .tab-pane').removeClass('active');
    $('.tab-pane').each(function() {
    var tabId = $(this).attr('id');
    $(this).html(defaultTabContents[tabId]);
    });
});

$('.manu-item-content .nav-link').on('click', function(){
    $('.manu-item-content .nav-link').removeClass('active');
    $(this).addClass('active');
    var tabId = $(this).attr('data-bs-target').replace('#', '');
    $('.tab-pane').each(function() {
    var currentTabId = $(this).attr('id');
    if (currentTabId !== tabId) {
        $(this).html(defaultTabContents[currentTabId]);
    }
    });
});





