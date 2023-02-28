$(window).on("load", function (e) {
    setTimeout(function(){
        $("#preloader").fadeOut("slow", function () {
            $(this).remove()
        })
    }, 10);

    if (document.querySelector('.d-mosaic-news') !== null) {
        $('.grid').masonry({
            itemSelector: '.grid-item',
            gutter: 20,
            columnWidth: '.grid-25',
            horizontalOrder: false,
            transitionDuration: '1.2s',
            percentPosition: true
        });
    }
});

$(document).ready(function () {

    var a = new LazyLoad({
        elements_selector: ".lazy"
    });

    $("header .menu").on('click', function() {
        $(this).toggleClass("on");
        $(".site-nav__menu").toggleClass('open');
        $("body").toggleClass('open-menu');
    });

    if (document.querySelector('.b-filters') !== null) {
        $(".b-filters .dropdown").on('click', function() {
            $(this).toggleClass("click-hover");
        });
    }

    if (document.querySelector('.d-hero-tournament') !== null) {
        $(window).scroll(function() {
            if ($(document).scrollTop() > 1) {
                $(".d-hero-tournament").addClass('state-1');
            }
            if ($(document).scrollTop() <= 1) {
                $(".d-hero-tournament").removeClass('state-1');
            }
            if ($(document).scrollTop() > 280) {
                $(".d-hero-tournament").addClass('state-2');
            }
            if ($(document).scrollTop() <= 280) {
                $(".d-hero-tournament").removeClass('state-2');
            }
        });
    }

    var position = $(window).scrollTop();
    // should start at 0
    $(window).scroll(function() {
        var scroll = $(window).scrollTop();
        if(scroll > position) {
            $("header").removeClass("scroll-up");
        } else {
            $("header").addClass("scroll-up");
        }
        if(scroll < position) {
            $("header").removeClass("scroll-down");
        } else {
            $("header").addClass("scroll-down");
        }
        position = scroll;

        if ($(window).width() > 768) {
            if ($(document).scrollTop() > 1) {
                $("header").removeClass('no-scroll');
            }
            if ($(document).scrollTop() <= 1) {
                $("header").addClass('no-scroll');
            }
        }
        if($(window).width() <= 768) {
            if ($(document).scrollTop() > 150) {
                $("header").removeClass('no-scroll');
            }
            if ($(document).scrollTop() <= 150) {
                $("header").addClass('no-scroll');
            }
        }

        if (document.querySelector('.d-hero') !== null) {
            if ($(document).scrollTop() > 250) {
                $(".d-hero").addClass('before-1');
            }
            if ($(document).scrollTop() <= 250) {
                $(".d-hero").removeClass('before-1');
            }
            /*if ($(document).scrollTop() > 400) {
                $(".d-hero").addClass('before-2');
            }
            if ($(document).scrollTop() <= 400) {
                $(".d-hero").removeClass('before-2');
            }*/
        }
    });

    //slider cards
    if (document.querySelector('.d-slider-tournament-cards') !== null) {
        class Card {
            constructor(node, position) {
                this.node = node;
                this.position = position;
            }

            nextPosition() {
                let nextPosition = 1;

                if (this.position != 5) {
                    nextPosition = this.position + 1;
                }

                return nextPosition;
            }

            prevPosition() {
                let prevPosition = 5;

                if (this.position != 1) {
                    prevPosition = this.position - 1;
                }

                return prevPosition;
            }

            moveNext() {
                this.node.classList.replace(
                    `position${this.position}`,
                    `position${this.nextPosition()}`
                );

                this.position = this.nextPosition();
            }

            movePrev() {
                this.node.classList.replace(
                    `position${this.position}`,
                    `position${this.prevPosition()}`
                );

                this.position = this.prevPosition();
            }
        }

// Initializations
        const [prev, next] = document.querySelectorAll("o");
        const gallery = document.querySelector(".gallery");
        const cards = [];
        let start;

// Instantiate cards and populate cards array
        document.querySelectorAll(".card").forEach((e, pos = 0) => {
            pos += 1;
            cards.push(new Card(e, pos));
        });

// Handle click events
        next.addEventListener("click", () => {
            cards.forEach((c) => {
                c.moveNext();
            });
        });

        prev.addEventListener("click", () => {
            cards.forEach((c) => {
                c.movePrev();
            });
        });

// Handle slide events
        gallery.addEventListener("touchstart", (s) => {
            start = s.targetTouches[0].screenX;
        });

        gallery.addEventListener("touchend", (e) => {
            let end = e.changedTouches[0].screenX;
            const range = Math.abs(start - end);

            if (range > 30) {
                if (start < end) {
                    cards.forEach((c) => {
                        c.moveNext();
                    });
                }

                if (start > end) {
                    cards.forEach((c) => {
                        c.movePrev();
                    });
                }
            }
        });
    }

/*
    if (document.querySelector('.d-menu-tournament') !== null) {
        $(".d-menu-tournament .b-info").on('click', function() {
            $(".d-menu-tournament .b-link").removeClass("active");
            $(this).addClass("active");
            $(".d-info").removeClass("d-block").addClass("d-none");
            $(".d-info-tournament").addClass("d-block").removeClass("d-none");
        });
        $(".d-menu-tournament .b-inscribed").on('click', function() {
            $(".d-menu-tournament .b-link").removeClass("active");
            $(this).addClass("active");
            $(".d-info").removeClass("d-block").addClass("d-none");
            $(".d-info-inscribed").addClass("d-block").removeClass("d-none");
        });
        $(".d-menu-tournament .b-shedule").on('click', function() {
            $(".d-menu-tournament .b-link").removeClass("active");
            $(this).addClass("active");
            $(".d-info").removeClass("d-block").addClass("d-none");
            $(".d-info-shedule").addClass("d-block").removeClass("d-none");
        });
        $(".d-menu-tournament .b-tables").on('click', function() {
            $(".d-menu-tournament .b-link").removeClass("active");
            $(this).addClass("active");
            $(".d-info").removeClass("d-block").addClass("d-none");
            $(".d-info-tables-tournament").addClass("d-block").removeClass("d-none");
        });
        $(".d-menu-tournament .b-results").on('click', function() {
            $(".d-menu-tournament .b-link").removeClass("active");
            $(this).addClass("active");
            $(".d-info").removeClass("d-block").addClass("d-none");
            $(".d-info-results").addClass("d-block").removeClass("d-none");
        });
    } */

    if (document.querySelector('.d-tournaments-calendar') !== null) {
        $(".b-select-view .a-list").on('click', function() {
            $(".b-select-view a").removeClass("active");
            $(this).addClass("active");
            $(".d-tournaments-calendar .b-calendar-list").addClass("d-block").removeClass("d-none");
            $(".d-tournaments-calendar .b-calendar").addClass("d-none").removeClass("d-block");
        });
        $(".b-select-view .a-calendar").on('click', function() {
            $(".b-select-view a").removeClass("active");
            $(this).addClass("active");
            $(".d-tournaments-calendar .b-calendar").addClass("d-block").removeClass("d-none");
            $(".d-tournaments-calendar .b-calendar-list").addClass("d-none").removeClass("d-block");
        });
        $(".d-tournaments-calendar .b-calendar-list .b-tournament .btn-tickets").hover(function() {
            $(".d-tournaments-calendar .b-calendar-list .b-tournament").toggleClass( "hover-tickets" );
        });
    }

    if (document.querySelector('.d-ranking') !== null) {
        $(".b-select-view .a-ranking").on('click', function() {
            $(".b-select-view a").removeClass("active");
            $(this).addClass("active");
            $(".d-tournaments-calendar .b-ranking").addClass("d-block").removeClass("d-none");
            $(".d-tournaments-calendar .b-ranking-race").addClass("d-none").removeClass("d-block");
            $(".b-title-top .title .t-ranking").addClass("d-block").removeClass("d-none");
            $(".b-title-top .title .t-ranking-race").addClass("d-none").removeClass("d-block");
            $(".d-tournaments-calendar").addClass("bg-img-ranking").removeClass("bg-img-race");
            $(".b-hero-ranking-race").addClass("d-none").removeClass("d-block");
            $(".b-hero-ranking").addClass("d-block").removeClass("d-none");
        });
        $(".b-select-view .a-ranking-race").on('click', function() {
            $(".b-select-view a").removeClass("active");
            $(this).addClass("active");
            $(".d-tournaments-calendar .b-ranking-race").addClass("d-block").removeClass("d-none");
            $(".d-tournaments-calendar .b-ranking").addClass("d-none").removeClass("d-block");
            $(".b-title-top .title .t-ranking-race").addClass("d-block").removeClass("d-none");
            $(".b-title-top .title .t-ranking").addClass("d-none").removeClass("d-block");
            $(".d-tournaments-calendar").addClass("bg-img-race").removeClass("bg-img-ranking");
            $(".b-hero-ranking").addClass("d-none").removeClass("d-block");
            $(".b-hero-ranking-race").addClass("d-block").removeClass("d-none");
        });
    }

    if (document.querySelector('.mySwiperCalendar') !== null) {
        $(".filters-calendar .b-filter ul li").on('click', function() {
            $(".filters-calendar .b-filter ul li").removeClass("active");
            $(this).addClass("active");
        });
        $(".filters-calendar .b-filter ul li.b-all").on('click', function() {
            $(".filters-calendar .swiper .all").addClass("active");
        });
        $(".filters-calendar .b-filter ul li.b-exhibition").on('click', function() {
            $(".filters-calendar .swiper .all").removeClass("active");
            $(".filters-calendar .swiper .f-exhibition").addClass("active");
        });
        $(".filters-calendar .b-filter ul li.b-open").on('click', function() {
            $(".filters-calendar .swiper .all").removeClass("active");
            $(".filters-calendar .swiper .f-open").addClass("active");
        });
        $(".filters-calendar .b-filter ul li.b-challenger").on('click', function() {
            $(".filters-calendar .swiper .all").removeClass("active");
            $(".filters-calendar .swiper .f-challenger").addClass("active");
        });
        $(".filters-calendar .b-filter ul li.b-master").on('click', function() {
            $(".filters-calendar .swiper .all").removeClass("active");
            $(".filters-calendar .swiper .f-master").addClass("active");
        });
    }

    if (document.querySelector('.d-info-player-statistics') !== null) {
        $(".b-title-top .b-select-view .a-feminine").on('click', function() {
            $(".b-title-top .b-select-view a").removeClass("active");
            $(this).addClass("active");
            //$(".b-row-feminine").addClass("d-flex").removeClass("d-none");
            //$(".b-row-male").addClass("d-none").removeClass("d-flex");
        });
        $(".b-title-top .b-select-view .a-male").on('click', function() {
            $(".b-title-top .b-select-view a").removeClass("active");
            $(this).addClass("active");
            //$(".b-row-male").addClass("d-flex").removeClass("d-none");
            //$(".b-row-feminine").addClass("d-none").removeClass("d-flex");
        });

        $(".b-info .b-select-view .a-statistics").on('click', function() {
            $(".b-info .b-select-view a").removeClass("active");
            $(this).addClass("active");
            $(".b-table.b-table-statistics").addClass("d-block").removeClass("d-none");
            $(".b-table.b-table-match").addClass("d-none").removeClass("d-block");
        });
        $(".b-info .b-select-view .a-match").on('click', function() {
            $(".b-info .b-select-view a").removeClass("active");
            $(this).addClass("active");
            $(".b-table.b-table-match").addClass("d-block").removeClass("d-none");
            $(".b-table.b-table-statistics").addClass("d-none").removeClass("d-block");
        });
    }

    if ($(window).width() > 768) {
        if (document.querySelector('.mySwiperCalendar') !== null) {
            var swiper = new Swiper(".mySwiperCalendar", {
                spaceBetween: 7,
                slidesPerView: 6,
                navigation: {
                    nextEl: ".swiper-button-next-calendar",
                    prevEl: ".swiper-button-prev-calendar",
                },
            });
        }
        if (document.querySelector('.mySwiperScoreboard') !== null) {
            var swiper = new Swiper(".mySwiperScoreboard", {
                spaceBetween: 35,
                slidesPerView: 2,
                navigation: {
                    nextEl: ".swiper-button-next-scoreboard",
                    prevEl: ".swiper-button-prev-scoreboard",
                },
            });
        }
    }
    if($(window).width() <= 768) {
        if (document.querySelector('.mySwiperCalendar') !== null) {
            var swiper = new Swiper(".mySwiperCalendar", {
                spaceBetween: 7,
                slidesPerView: 1,
                freeMode: true,
                navigation: {
                    nextEl: ".swiper-button-next-calendar",
                    prevEl: ".swiper-button-prev-calendar",
                },
            });
        }
        if (document.querySelector('.mySwiperScoreboard') !== null) {
            var swiper = new Swiper(".mySwiperScoreboard", {
                spaceBetween: 17,
                slidesPerView: 1,
                navigation: {
                    nextEl: ".swiper-button-next-scoreboard",
                    prevEl: ".swiper-button-prev-scoreboard",
                },
            });
        }
    }

    if (document.querySelector('.mySwiperRanking') !== null) {
        $(".filters-ranking .b-filter ul li").on('click', function () {
            $(".filters-ranking .b-filter ul li").removeClass("active");
            $(this).addClass("active");
        });
    }

    if (document.querySelector('.mySwiperRanking') !== null) {
        let men = $(".b-slider-ranking.masc");
        let women = $(".b-slider-ranking.fem");
        $(".filters-ranking .b-filter ul li").on('click', function () {
            let letter = $(this).data("letter");
            $(".filters-ranking .b-filter ul li").removeClass("active");
            $(this).addClass("active");
            if (letter === 'M') {
                women.addClass("d-none");
                men.removeClass("d-none");
            }
            if (letter === 'F') {
                men.addClass("d-none");
                women.removeClass("d-none");
            }
        });
    }

    if (document.querySelector('.mySwiperRanking') !== null) {
        if ($(window).width() > 768) {
            var swiper = new Swiper(".mySwiperRanking", {
                spaceBetween: 74,
                slidesPerView: "auto",
                centeredSlides: false,
                lazy: true,
                loop: false,
                navigation: {
                    nextEl: ".swiper-button-next-ranking",
                    prevEl: ".swiper-button-prev-ranking",
                },
            });
        }
        if($(window).width() <= 768) {
            var swiper = new Swiper(".mySwiperRanking", {
                spaceBetween: 74,
                slidesPerView: "auto",
                centeredSlides: true,
                lazy: true,
                loop: false,
                navigation: {
                    nextEl: ".swiper-button-next-ranking",
                    prevEl: ".swiper-button-prev-ranking",
                },
            });
        }
    }

    if (document.querySelector('.mySwiperGallery') !== null) {
		$('.mySwiperGallery').each(function() {
			var swiper = new Swiper("#"+$(this).attr('id'), {
				slidesPerView: 7,
				freeMode: true,
				watchSlidesProgress: true,
			});
			var swiper2 = new Swiper("#"+$(this).attr('id')+'-2', {
				slidesPerView: 1,
				effect: "fade",
				navigation: {
					nextEl: "#"+$(this).attr('id')+"-2 .swiper-button-next-gallery",
					prevEl: "#"+$(this).attr('id')+"-2 .swiper-button-prev-gallery",
				},
				thumbs: {
					swiper: swiper,
				},
			});
		})
    }

    if (document.querySelector('.d-mosaic-news') !== null) {
        $('.grid').masonry({
            itemSelector: '.grid-item',
            gutter: 20,
            columnWidth: '.grid-25',
            horizontalOrder: false,
            transitionDuration: '1.2s',
            percentPosition: true
        });
    }

    if (document.querySelector('.d-mosaic-news') !== null) {
        $('.copy-clipboard').on('click', function () {
            navigator.clipboard.writeText($(this).data('url'));
            //alert("Copied");
        })
    }

});

//map
if (document.querySelector('.d-info') !== null && puntos_mapa_info.length) {
    let map;

    function initMap() {
        var icon_map = BASE_URL+'/'+THEME_PATH+'/img/icons/icon-map.svg';

		var center_lat = 0;
		var center_lon = 0;
		
		for ( var i in puntos_mapa_info ) {
			center_lat = center_lat + puntos_mapa_info[i].lat*1;
			center_lon = center_lon + puntos_mapa_info[i].lon*1;
		}
		
		center_lat = center_lat/puntos_mapa_info.length;
		center_lon = center_lon/puntos_mapa_info.length;
		
		var center = {
			lat: center_lat,
			lng: center_lon
		};
		
        var d = new google.maps.Map(document.getElementById("map"), {
            center: center,
            zoom: 15,
            styles: [
                {
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#1d2c4d"
                        }
                    ]
                },
                {
                    "elementType": "labels",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                            "color": "#8ec3b9"
                        }
                    ]
                },
                {
                    "elementType": "labels.text.stroke",
                    "stylers": [
                        {
                            "color": "#1a3646"
                        }
                    ]
                },
                {
                    "featureType": "administrative",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "administrative.country",
                    "elementType": "geometry.stroke",
                    "stylers": [
                        {
                            "color": "#4b6878"
                        }
                    ]
                },
                {
                    "featureType": "administrative.land_parcel",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "administrative.land_parcel",
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                            "color": "#64779e"
                        }
                    ]
                },
                {
                    "featureType": "administrative.neighborhood",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "administrative.province",
                    "elementType": "geometry.stroke",
                    "stylers": [
                        {
                            "color": "#4b6878"
                        }
                    ]
                },
                {
                    "featureType": "landscape.man_made",
                    "elementType": "geometry.stroke",
                    "stylers": [
                        {
                            "color": "#334e87"
                        }
                    ]
                },
                {
                    "featureType": "landscape.natural",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#023e58"
                        }
                    ]
                },
                {
                    "featureType": "poi",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "poi",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#283d6a"
                        }
                    ]
                },
                {
                    "featureType": "poi",
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                            "color": "#6f9ba5"
                        }
                    ]
                },
                {
                    "featureType": "poi",
                    "elementType": "labels.text.stroke",
                    "stylers": [
                        {
                            "color": "#1d2c4d"
                        }
                    ]
                },
                {
                    "featureType": "poi.park",
                    "elementType": "geometry.fill",
                    "stylers": [
                        {
                            "color": "#023e58"
                        }
                    ]
                },
                {
                    "featureType": "poi.park",
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                            "color": "#3C7680"
                        }
                    ]
                },
                {
                    "featureType": "road",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#304a7d"
                        }
                    ]
                },
                {
                    "featureType": "road",
                    "elementType": "labels.icon",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "road",
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                            "color": "#98a5be"
                        }
                    ]
                },
                {
                    "featureType": "road",
                    "elementType": "labels.text.stroke",
                    "stylers": [
                        {
                            "color": "#1d2c4d"
                        }
                    ]
                },
                {
                    "featureType": "road.highway",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#2c6675"
                        }
                    ]
                },
                {
                    "featureType": "road.highway",
                    "elementType": "geometry.stroke",
                    "stylers": [
                        {
                            "color": "#255763"
                        }
                    ]
                },
                {
                    "featureType": "road.highway",
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                            "color": "#b0d5ce"
                        }
                    ]
                },
                {
                    "featureType": "road.highway",
                    "elementType": "labels.text.stroke",
                    "stylers": [
                        {
                            "color": "#023e58"
                        }
                    ]
                },
                {
                    "featureType": "transit",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "transit",
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                            "color": "#98a5be"
                        }
                    ]
                },
                {
                    "featureType": "transit",
                    "elementType": "labels.text.stroke",
                    "stylers": [
                        {
                            "color": "#1d2c4d"
                        }
                    ]
                },
                {
                    "featureType": "transit.line",
                    "elementType": "geometry.fill",
                    "stylers": [
                        {
                            "color": "#283d6a"
                        }
                    ]
                },
                {
                    "featureType": "transit.station",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#3a4762"
                        }
                    ]
                },
                {
                    "featureType": "water",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#0e1626"
                        }
                    ]
                },
                {
                    "featureType": "water",
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                            "color": "#4e6d70"
                        }
                    ]
                }
            ]
        });

		for ( var i in puntos_mapa_info ) {
			
			var coord = {
				lat: puntos_mapa_info[i].lat*1,
				lng: puntos_mapa_info[i].lon*1
			};
			console.log(coord);
			var marker = new google.maps.Marker({
				position: coord,
				map: d,
				icon: icon_map
			});
			var contentString = '<div id="content-loc">'+
				'<div class="text text-left">'+
				'<p><span><a target="_blank" style="text-decoration: none; color: #E0E721;" href="'+puntos_mapa_info[i].url+'">'+puntos_mapa_info[i].name+'</a></span></p>'+
				'<p><a target="_blank" style="text-decoration: none; color: #E0E721;" href="'+puntos_mapa_info[i].url+'">'+puntos_mapa_info[i].desc+'</a></p>'+
				'</div>'+
				'</div>';

			var infowindow = new google.maps.InfoWindow({
				content: contentString
			});

			marker.addListener('click', function() {
				window.open(puntos_mapa_info[i].url)
			});
			infowindow.open(d, marker);
		}
    }

    /* Lazy gmap */
    document.addEventListener("DOMContentLoaded", function () {
        var lazyloadMapElems = document.querySelectorAll(".map-lazy");
        var lazyloadThrottleTimeout;
        let head = document.getElementsByTagName('head')[0];
        let gmapsScript = document.createElement('script');
        gmapsScript.type = 'text/javascript';
        gmapsScript.src = gmap_url

        function lazyloadMap() {
            if (lazyloadThrottleTimeout) {
                clearTimeout(lazyloadThrottleTimeout);
            }

            lazyloadThrottleTimeout = setTimeout(function () {
                lazyloadMapElems.forEach(function (map) {
                    let rect = map.getBoundingClientRect();
                    if (rect.top < (window.innerHeight + 300)) {
                        head.appendChild(gmapsScript);

                        console.log('lazy map loaded');
                        lazyloadMapElems.forEach(function (elem) {
                            elem.classList.remove('map-lazy');
                        });
                    }
                });

                if (document.querySelectorAll(".map-lazy").length === 0) {
                    document.removeEventListener("scroll", lazyloadMap);
                    window.removeEventListener("resize", lazyloadMap);
                    window.removeEventListener("orientationChange", lazyloadMap);
                }
            }, 100);
        }

        document.addEventListener("scroll", lazyloadMap);
        window.addEventListener("resize", lazyloadMap);
        window.addEventListener("orientationChange", lazyloadMap);
    });
}

//map
if (document.querySelector('.d-contact') !== null) {
    let map;

    function initMap() {
        var icon_map_3 = BASE_URL+'/'+THEME_PATH+'/img/icons/icon-map.svg';

        var center = {
            lat: 38.34710736772738,
            lng: -0.4869181016121755
        };
        var d = new google.maps.Map(document.getElementById("map"), {
            center: center,
            zoom: 15,
            styles: [
                {
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#1d2c4d"
                        }
                    ]
                },
                {
                    "elementType": "labels",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                            "color": "#8ec3b9"
                        }
                    ]
                },
                {
                    "elementType": "labels.text.stroke",
                    "stylers": [
                        {
                            "color": "#1a3646"
                        }
                    ]
                },
                {
                    "featureType": "administrative",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "administrative.country",
                    "elementType": "geometry.stroke",
                    "stylers": [
                        {
                            "color": "#4b6878"
                        }
                    ]
                },
                {
                    "featureType": "administrative.land_parcel",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "administrative.land_parcel",
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                            "color": "#64779e"
                        }
                    ]
                },
                {
                    "featureType": "administrative.neighborhood",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "administrative.province",
                    "elementType": "geometry.stroke",
                    "stylers": [
                        {
                            "color": "#4b6878"
                        }
                    ]
                },
                {
                    "featureType": "landscape.man_made",
                    "elementType": "geometry.stroke",
                    "stylers": [
                        {
                            "color": "#334e87"
                        }
                    ]
                },
                {
                    "featureType": "landscape.natural",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#023e58"
                        }
                    ]
                },
                {
                    "featureType": "poi",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "poi",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#283d6a"
                        }
                    ]
                },
                {
                    "featureType": "poi",
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                            "color": "#6f9ba5"
                        }
                    ]
                },
                {
                    "featureType": "poi",
                    "elementType": "labels.text.stroke",
                    "stylers": [
                        {
                            "color": "#1d2c4d"
                        }
                    ]
                },
                {
                    "featureType": "poi.park",
                    "elementType": "geometry.fill",
                    "stylers": [
                        {
                            "color": "#023e58"
                        }
                    ]
                },
                {
                    "featureType": "poi.park",
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                            "color": "#3C7680"
                        }
                    ]
                },
                {
                    "featureType": "road",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#304a7d"
                        }
                    ]
                },
                {
                    "featureType": "road",
                    "elementType": "labels.icon",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "road",
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                            "color": "#98a5be"
                        }
                    ]
                },
                {
                    "featureType": "road",
                    "elementType": "labels.text.stroke",
                    "stylers": [
                        {
                            "color": "#1d2c4d"
                        }
                    ]
                },
                {
                    "featureType": "road.highway",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#2c6675"
                        }
                    ]
                },
                {
                    "featureType": "road.highway",
                    "elementType": "geometry.stroke",
                    "stylers": [
                        {
                            "color": "#255763"
                        }
                    ]
                },
                {
                    "featureType": "road.highway",
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                            "color": "#b0d5ce"
                        }
                    ]
                },
                {
                    "featureType": "road.highway",
                    "elementType": "labels.text.stroke",
                    "stylers": [
                        {
                            "color": "#023e58"
                        }
                    ]
                },
                {
                    "featureType": "transit",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "transit",
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                            "color": "#98a5be"
                        }
                    ]
                },
                {
                    "featureType": "transit",
                    "elementType": "labels.text.stroke",
                    "stylers": [
                        {
                            "color": "#1d2c4d"
                        }
                    ]
                },
                {
                    "featureType": "transit.line",
                    "elementType": "geometry.fill",
                    "stylers": [
                        {
                            "color": "#283d6a"
                        }
                    ]
                },
                {
                    "featureType": "transit.station",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#3a4762"
                        }
                    ]
                },
                {
                    "featureType": "water",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#0e1626"
                        }
                    ]
                },
                {
                    "featureType": "water",
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                            "color": "#4e6d70"
                        }
                    ]
                }
            ]
        });

        var m3 = new google.maps.Marker({
            position: center,
            map: d,
            icon: icon_map_3
        });

        var contentString = '<div id="content-loc">'+
            '<div class="text text-left">'+
            '<p><span>'+OFICINAS_CENTRALES+'</span></p>'+
            '</div>'+
            '</div>';

        var infowindow = new google.maps.InfoWindow({
            content: contentString
        });

        m3.addListener('click', function() {
            infowindow.open(d, m3);
        });
        infowindow.open(d, m3);
    }

    /* Lazy gmap */
    document.addEventListener("DOMContentLoaded", function () {
        var lazyloadMapElems = document.querySelectorAll(".map-lazy");
        var lazyloadThrottleTimeout;
        let head = document.getElementsByTagName('head')[0];
        let gmapsScript = document.createElement('script');
        gmapsScript.type = 'text/javascript';
        gmapsScript.src = gmap_url

        function lazyloadMap() {
            if (lazyloadThrottleTimeout) {
                clearTimeout(lazyloadThrottleTimeout);
            }

            lazyloadThrottleTimeout = setTimeout(function () {
                lazyloadMapElems.forEach(function (map) {
                    let rect = map.getBoundingClientRect();
                    if (rect.top < (window.innerHeight + 300)) {
                        head.appendChild(gmapsScript);

                        console.log('lazy map loaded');
                        lazyloadMapElems.forEach(function (elem) {
                            elem.classList.remove('map-lazy');
                        });
                    }
                });

                if (document.querySelectorAll(".map-lazy").length === 0) {
                    document.removeEventListener("scroll", lazyloadMap);
                    window.removeEventListener("resize", lazyloadMap);
                    window.removeEventListener("orientationChange", lazyloadMap);
                }
            }, 100);
        }

        document.addEventListener("scroll", lazyloadMap);
        window.addEventListener("resize", lazyloadMap);
        window.addEventListener("orientationChange", lazyloadMap);
    });
}