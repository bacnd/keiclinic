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

    if($('.slide_box')[0]) {
        $('.slide_box').slick({
            // autoplay: true,
            // autoplaySpeed: 7000,
            // arrows: false,
            // fade: true,
            // cssEase: 'ease-out',
            // speed: 5000,
            // pauseOnFocus: false,
            // pauseOnHover: false

            draggable: true,
            autoplay: true,
            autoplaySpeed: 7000,
            arrows: false,
            dots: false,
            fade: true,
            speed: 5000,
            infinite: true,
            cssEase: 'ease-in',
            touchThreshold: 100
        });
    }

    $(window).on('load resize', function() {
        var win = $(this);
        if (win.width() <= 768) {
            $('.box-service .service__list .service__img img').each(function() {
                var imgOrigin = $(this).attr('src');
                var imgNew = imgOrigin.replace('_pc.png','_sp.png');
                $(this).attr('src', imgNew);
            });
        } else {
            $('.box-service .service__list .service__img img').each(function() {
                var imgOrigin = $(this).attr('src');
                var imgNew = imgOrigin.replace('_sp.png','_pc.png');
                $(this).attr('src', imgNew);
            });
        }
    });

    $('.drawer-toggle').click(function() {
        $('body').toggleClass('drawer-open');
    });

    
    var $win = $(window),
        $cloneNav = $('.home #header_subpage'),
        showClass = 'is-show',
        headHeight = $('#header').height(),
        boxFeature = $('.box-feature').offset().top;
    
        var $kdwArea = $('.box-feature'),
        kdwPos = $kdwArea.offset().top,
        kdwHeight = $kdwArea.outerHeight();
        var stopTop = kdwHeight - $win.height();
        var $kdwBg = $('.our-three-commit'),
        kdwBgHeight = $kdwBg.outerHeight();
        
    $win.on('load scroll', function() {
        var value = $(this).scrollTop();
        if(value > headHeight) {
            $cloneNav.addClass(showClass);
        } else {
            $cloneNav.removeClass(showClass);
        }

        if(value < boxFeature || kdwPos < value - stopTop - kdwBgHeight) {
            $('.our-three-commit').css({'position': 'absolute'});
        } else {
            $('.our-three-commit').css({'position': 'fixed'});
        }
    });
});

$(function() {
    $(document).ready(function() {
      AOS.init({
        duration: 1500,
        offset: 300,
        once: false
      });
    });
});

function initMap() {
    const bangalore = { lat: 34.96725, lng: 137.16321 };
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 16,
        center: bangalore,
    });
    const image = window.location.origin + "/assets/images/marker-icon.png";
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