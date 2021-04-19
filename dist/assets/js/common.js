$(function() {
    var pageTop = $('#page_top');
    pageTop.hide();
  
    $(window).scroll(function() {
        if($(this).scrollTop() > 500) {
            pageTop.fadeIn('slow');
        } else {
            pageTop.fadeOut('slow');
        }
    });

    pageTop.click(function() {
        $("html, body").animate({ scrollTop: 0 }, "slow");
        return false;
    });

    $('.slide_box').slick({
        autoplay: true,
        autoplaySpeed: 7000,
        dots: false,
        arrows: false,
        fade: true,
        cssEase: 'ease-out',
        speed: 5000,
        pauseOnFocus: false,
        pauseOnHover: false
    });
});

function initMap() {
    const bangalore = { lat: 34.96725, lng: 137.16321 };
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 16,
        center: bangalore,
    });
    const image = window.location.origin + "/dist/assets/images/marker-icon.png";
    // Add a marker at the center of the map.
    addMarker(bangalore, map, image);
}

// Adds a marker to the map.
function addMarker(location, map, image) {
    // Add the marker at the clicked location, and add the next-available label
    // from the array of alphabetical characters.
    new google.maps.Marker({
        position: location,
        map: map,
        icon: image
    });
}