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
        $cloneNav = $('#header_subpage'),
        showClass = 'is-show',
        headHeight = $('#header').height(),
        boxFeature = $('.box-feature').offset().top;
    
    $win.on('load scroll', function() {
        var value = $(this).scrollTop();
        if(value > headHeight) {
            $cloneNav.addClass(showClass);
        } else {
            $cloneNav.removeClass(showClass);
        }

        // if(value > boxFeature) {
        //     $('#fix_bg').css({'position': 'fixed'});
        // } else {
        //     $('#fix_bg').css({'position': 'absolute'});
        // }
    });

    var $scl = $('#header_subpage'),
        sclHeight = $scl.outerHeight();

    var $kdwArea = $('.box-feature'),
        kdwPos = $kdwArea.offset().top,
        kdwHeight = $kdwArea.outerHeight();

    var $kdwBg = $('#fix_bg'),
        kdwBgHeight = $kdwBg.outerHeight();

    var classKdwAbs = 'kdw_abs',
        classKdwFix = 'kdw_fix',
        bgFirst = 'bg_first',
        bgFix = 'bg_fix',
        bgStop = 'bg_stop';

    var stopTop = kdwHeight - $win.height(),
        /* スクロール終わり：上からの位置 */
        defTop = '3%'; /* デフォルトの位置 */

    // $win.on('load scroll', function() {

    //     var value = $(this).scrollTop(),
    //     scrollPos = $win.height() + value; /* スクロールの下の位置 */

    //     // 背景を固定する範囲までスクロールしたら
    //     console.log('kdwBgHeight ' + (kdwPos + kdwHeight - kdwBgHeight));
    //     console.log('scrollPos ' + scrollPos);
    //     if(kdwPos + kdwBgHeight <= scrollPos) {

    //         // こだわりエリアの底辺が見えたら
    //         if(kdwPos + kdwHeight - kdwBgHeight <= scrollPos) {

    //             $kdwBg.removeClass(bgFix);
    //             $kdwBg.removeClass(bgFirst);
    //             $kdwBg.addClass(bgStop);

    //             // こだわりエリアの底辺が見えるまで
    //         } else {
    //             $kdwBg.removeClass(bgStop);
    //             $kdwBg.removeClass(bgFirst);
    //             $kdwBg.addClass(bgFix);
    //         }

    //     // 固定しない範囲
    //     } else {
    //         $kdwBg.removeClass(bgFix);
    //         $kdwBg.removeClass(bgStop);
    //         $kdwBg.addClass(bgFirst);
    //     }
    // });
});

function initMap() {
    const bangalore = { lat: 34.96725, lng: 137.16321 };
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 16,
        center: bangalore,
    });
    const image = window.location.origin + "/keiclinic/dist/assets/images/marker-icon.png";
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