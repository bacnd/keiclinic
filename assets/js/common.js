(function($){
    ({
        init: function(){
            this.define();
            $(function(){
                $this.common();
                $this.slidershow();
                $this.menutop();
                $this.service();
                // $this.feature();
                $this.animation();
            });
        },

        define: function() {
            $this = this;
        },

        common: function() {
            var pageTop = $('#page_top');
            pageTop.hide();
        
            $(window).on('load scroll', function() {
                var currentPos = $(this).scrollTop();
                if(currentPos > 500) {
                    pageTop.fadeIn('slow');
                } else {
                    pageTop.fadeOut('slow');
                }
            });

            pageTop.click(function(event) {
                event.preventDefault();
                $("html, body").animate({ scrollTop: 0 }, "slow");
                return false;
            });

            $('.drawer-toggle').click(function() {
                $('body').toggleClass('drawer-open');
            });
        },

        menutop: function() {
            var $win = $(window),
            $cloneNav = $('.home #header_subpage'),
            showClass = 'is-show';
            var headHeight = $('#header').height();

            $win.on('load scroll', function() {
                var currentPos = $(this).scrollTop();

                if(currentPos > headHeight) {
                    $cloneNav.addClass(showClass);
                } else {
                    $cloneNav.removeClass(showClass);
                }
            });
        },

        slidershow: function() {
            if($('.slide_box')[0]) {
                $('.slide_box').slick({       
                    draggable: true,
                    autoplay: true,
                    autoplaySpeed: 5000,
                    arrows: false,
                    dots: false,
                    fade: true,
                    speed: 4000,
                    infinite: true,
                    cssEase: 'ease-in',
                    touchThreshold: 100
                });
            }      
        },

        service: function() {
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
        },

        // feature: function() {
        //     var $win = $(window),

        //     $boxFeature= $('.box-feature');
        //     boxFeatureTop = $boxFeature.offset().top;
        //     boxFeatureHeight = $boxFeature.outerHeight();
        //     stopTop = boxFeatureHeight - $win.height();
        
        //     $bnThreeCommit = $('.our-three-commit'),
        //     bnThreeCommitHeight = $bnThreeCommit.outerHeight();
            
        //     $win.on('load scroll', function() {
        //         var currentPos = $(this).scrollTop();

        //         if(currentPos < boxFeatureTop || boxFeatureTop < currentPos - stopTop - bnThreeCommitHeight) {
        //             $bnThreeCommit.css({'position': 'absolute'});
        //         } else {
        //             $bnThreeCommit.css({'position': 'fixed'});
        //         }
        //     });
        // },

        animation: function() {
            AOS.init({
                duration: 1500,
                offset: 240,
                once: false
            });
        }
    }.init());
}(jQuery));

function initMap() {
    const bangalore = { lat: 34.96725, lng: 137.16321 };
    const mapConfig = new google.maps.Map(document.getElementById('map'), {
        zoom: 16,
        center: bangalore,
    });
    const image = window.location.origin + "/keiclinic/assets/images/marker-icon.png";
    // Add a marker at the center of the map.
    addMarker(bangalore, mapConfig, image);
}

// Adds a marker to the map.
function addMarker(location, mapConfig, image) {
    new google.maps.Marker({
        position: location,
        map: mapConfig,
        icon: image
    });
}