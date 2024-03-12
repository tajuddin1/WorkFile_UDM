// Mobile Menu 

// var navIcon = document.getElementById("navIcon");
// var leftmenu =document.getElementById("leftMenu");


// navIcon.addEventListener('click' , function(){
//     navIcon.classList.toggle('active');
//     leftmenu.classList.toggle('fitMenu');
// });


// Sticky Nav

var header = document.querySelector('.main-header');

window.addEventListener('scroll', function() {
    if (window.pageYOffset >= 104) {
        header.classList.add('sticky');
    } else {
        header.classList.remove('sticky');
    }
});


// Save the default tab content
var defaultTabContent = $('.menu-content').html();

// Save the default content of each tab
var defaultTabContents = {};
$('.tab-pane').each(function() {
    var tabId = $(this).attr('id');
    defaultTabContents[tabId] = $(this).html();
});

// Reset tab content to default when mouse leaves mega-menu
$('.mega-menu').mouseleave(function(){
    // Remove "active" class from all tab links
    $('.manu-item-content .nav-link').removeClass('active');
    $('.menu-content .tab-pane').removeClass('active');
    // Set all tabs to their default content
    $('.tab-pane').each(function() {
    var tabId = $(this).attr('id');
    $(this).html(defaultTabContents[tabId]);
    });
});

// Handle tab click event
$('.manu-item-content .nav-link').on('click', function(){
    // Remove "active" class from all other tabs
    $('.manu-item-content .nav-link').removeClass('active');
    // Add "active" class to the clicked tab
    $(this).addClass('active');
    // Get the ID of the clicked tab
    var tabId = $(this).attr('data-bs-target').replace('#', '');
    // Set the content of other tabs to their default state
    $('.tab-pane').each(function() {
    var currentTabId = $(this).attr('id');
    if (currentTabId !== tabId) {
        $(this).html(defaultTabContents[currentTabId]);
    }
    });
});





