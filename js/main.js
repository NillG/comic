$(document).ready(function () {
    "use strict"; // start of use strict

    /*==============================
    Menu
    ==============================*/
    $('.header__btn').on('click', function () {
        $(this).toggleClass('header__btn--active');
        $('.header__nav').toggleClass('header__nav--active');
        $('.body').toggleClass('body--active');
    });

    $('.header__search-btn, .header__search-close').on('click', function () {
        $('.header__search').toggleClass('header__search--active');
    });


    /*==============================
    Home
    ==============================*/
    $('.home__bg').owlCarousel({
        animateOut: 'fadeOut',
        animateIn: 'fadeIn',
        mouseDrag: false,
        touchDrag: false,
        rtl: true,
        items: 1,
        dots: false,
        loop: true,
        autoplay: false,
        smartSpeed: 700,
        margin: 0,
    });

    $('.home__bg .item').each(function () {
        if ($(this).attr("data-bg")) {
            $(this).css({
                'background': 'url(' + $(this).data('bg') + ')',
                'background-position': 'center center',
                'background-repeat': 'no-repeat',
                'background-size': 'cover'
            });
        }
    });

    $('.home__carousel').owlCarousel({
        mouseDrag: false,
        touchDrag: false,
        dots: false,
        rtl: true,
        loop: true,
        autoplay: false,
        smartSpeed: 700,
        margin: 30,
        responsive: {
            0: {
                items: 2,
            },
            576: {
                items: 2,
            },
            768: {
                items: 3,
            },
            992: {
                items: 4,
            },
            1200: {
                items: 4,
                margin: 40
            },
            1310: {
                items: 5,
                margin: 40
            },
        }
    });

    $('.home__nav--next').on('click', function () {
        $('.home__carousel, .home__bg').trigger('next.owl.carousel');
    });
    $('.home__nav--prev').on('click', function () {
        $('.home__carousel, .home__bg').trigger('prev.owl.carousel');
    });

    $(window).on('resize', function () {
        var itemHeight = $('.home__bg').height();
        $('.home__bg .item').css("height", itemHeight + "px");
    });
    $(window).trigger('resize');

    /*==============================
    Tabs
    ==============================*/
    $('.content__mobile-tabs-menu li').each(function () {
        $(this).attr('data-value', $(this).text().toLowerCase());
    });

    $('.content__mobile-tabs-menu li').on('click', function () {
        var text = $(this).text();
        var item = $(this);
        var id = item.closest('.content__mobile-tabs').attr('id');
        $('#' + id).find('.content__mobile-tabs-btn input').val(text);
    });

    /*==============================
    Section bg
    ==============================*/
    $('.section--bg, .details__bg').each(function () {
        if ($(this).attr("data-bg")) {
            $(this).css({
                'background': 'url(' + $(this).data('bg') + ')',
                'background-position': 'center center',
                'background-repeat': 'no-repeat',
                'background-size': 'cover'
            });
        }
    });

    /*==============================
    Section carousel
    ==============================*/

    if ($('.section__carousel').length > 0) {
        $('.section__carousel').slick({
            centerMode: true,
            centerPadding: '60px',
            slidesToShow: 5,
            responsive: [
                {
                    breakpoint: 991,
                    settings: {
                        arrows: false,
                        centerMode: true,
                        centerPadding: '40px',
                        slidesToShow: 3
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        arrows: false,
                        centerMode: true,
                        centerPadding: '40px',
                        slidesToShow: 1
                    }
                }
            ]
        });
    }
    //
    //
    // $('.section__nav--prev').on('click', function () {
    //     var carouselId = $(this).attr('data-nav');
    //     $(carouselId).trigger('prev.owl.carousel');
    // });
    // $('.section__nav--next').on('click', function () {
    //     var carouselId = $(this).attr('data-nav');
    //     $(carouselId).trigger('next.owl.carousel');
    // });

    /*==============================
    Back
    ==============================*/
    $('.footer__back').on('click', function () {
        $('body,html').animate({
                scrollTop: 0,
            }, 700
        );
    });

    /*==============================
    Filter
    ==============================*/
    $('.filter__item-menu li').each(function () {
        $(this).attr('data-value', $(this).text().toLowerCase());
    });

    $('.filter__item-menu li').on('click', function () {
        var text = $(this).text();
        var item = $(this);
        var id = item.closest('.filter__item').attr('id');
        $('#' + id).find('.filter__item-btn input').val(text);
    });

    /*==============================
    Scroll bar
    ==============================*/
    $('.scrollbar-dropdown').mCustomScrollbar({
        axis: "y",
        scrollbarPosition: "outside",
        theme: "custom-bar"
    });

    /*==============================
    Morelines
    ==============================*/
    $(window).resize(function () {
        $('.card__description').moreLines({
            linecount: 6,
            baseclass: 'b-description',
            basejsclass: 'js-description',
            classspecific: '_readmore',
            buttontxtmore: "",
            buttontxtless: "",
            animationspeed: 400
        });
    })

    /*==============================
    Gallery
    ==============================*/
    var initPhotoSwipeFromDOM = function (gallerySelector) {
        // parse slide data (url, title, size ...) from DOM elements
        // (children of gallerySelector)
        var parseThumbnailElements = function (el) {
            var thumbElements = el.childNodes,
                numNodes = thumbElements.length,
                items = [],
                figureEl,
                linkEl,
                size,
                item;

            for (var i = 0; i < numNodes; i++) {

                figureEl = thumbElements[i]; // <figure> element

                // include only element nodes
                if (figureEl.nodeType !== 1) {
                    continue;
                }

                linkEl = figureEl.children[0]; // <a> element

                size = linkEl.getAttribute('data-size').split('x');

                // create slide object
                item = {
                    src: linkEl.getAttribute('href'),
                    w: parseInt(size[0], 10),
                    h: parseInt(size[1], 10)
                };

                if (figureEl.children.length > 1) {
                    // <figcaption> content
                    item.title = figureEl.children[1].innerHTML;
                }

                if (linkEl.children.length > 0) {
                    // <img> thumbnail element, retrieving thumbnail url
                    item.msrc = linkEl.children[0].getAttribute('src');
                }

                item.el = figureEl; // save link to element for getThumbBoundsFn
                items.push(item);
            }

            return items;
        };

        // find nearest parent element
        var closest = function closest(el, fn) {
            return el && (fn(el) ? el : closest(el.parentNode, fn));
        };

        // triggers when user clicks on thumbnail
        var onThumbnailsClick = function (e) {
            e = e || window.event;
            e.preventDefault ? e.preventDefault() : e.returnValue = false;

            var eTarget = e.target || e.srcElement;

            // find root element of slide
            var clickedListItem = closest(eTarget, function (el) {
                return (el.tagName && el.tagName.toUpperCase() === 'FIGURE');
            });

            if (!clickedListItem) {
                return;
            }

            // find index of clicked item by looping through all child nodes
            // alternatively, you may define index via data- attribute
            var clickedGallery = clickedListItem.parentNode,
                childNodes = clickedListItem.parentNode.childNodes,
                numChildNodes = childNodes.length,
                nodeIndex = 0,
                index;

            for (var i = 0; i < numChildNodes; i++) {
                if (childNodes[i].nodeType !== 1) {
                    continue;
                }

                if (childNodes[i] === clickedListItem) {
                    index = nodeIndex;
                    break;
                }
                nodeIndex++;
            }

            if (index >= 0) {
                // open PhotoSwipe if valid index found
                openPhotoSwipe(index, clickedGallery);
            }
            return false;
        };

        // parse picture index and gallery index from URL (#&pid=1&gid=2)
        var photoswipeParseHash = function () {
            var hash = window.location.hash.substring(1),
                params = {};

            if (hash.length < 5) {
                return params;
            }

            var vars = hash.split('&');
            for (var i = 0; i < vars.length; i++) {
                if (!vars[i]) {
                    continue;
                }
                var pair = vars[i].split('=');
                if (pair.length < 2) {
                    continue;
                }
                params[pair[0]] = pair[1];
            }

            if (params.gid) {
                params.gid = parseInt(params.gid, 10);
            }

            return params;
        };

        var openPhotoSwipe = function (index, galleryElement, disableAnimation, fromURL) {
            var pswpElement = document.querySelectorAll('.pswp')[0],
                gallery,
                options,
                items;

            items = parseThumbnailElements(galleryElement);

            // define options (if needed)
            options = {

                // define gallery index (for URL)
                galleryUID: galleryElement.getAttribute('data-pswp-uid'),

                getThumbBoundsFn: function (index) {
                    // See Options -> getThumbBoundsFn section of documentation for more info
                    var thumbnail = items[index].el.getElementsByTagName('img')[0], // find thumbnail
                        pageYScroll = window.pageYOffset || document.documentElement.scrollTop,
                        rect = thumbnail.getBoundingClientRect();

                    return {x: rect.left, y: rect.top + pageYScroll, w: rect.width};
                }

            };

            // PhotoSwipe opened from URL
            if (fromURL) {
                if (options.galleryPIDs) {
                    // parse real index when custom PIDs are used
                    // http://photoswipe.com/documentation/faq.html#custom-pid-in-url
                    for (var j = 0; j < items.length; j++) {
                        if (items[j].pid == index) {
                            options.index = j;
                            break;
                        }
                    }
                } else {
                    // in URL indexes start from 1
                    options.index = parseInt(index, 10) - 1;
                }
            } else {
                options.index = parseInt(index, 10);
            }

            // exit if index not found
            if (isNaN(options.index)) {
                return;
            }

            if (disableAnimation) {
                options.showAnimationDuration = 0;
            }

            // Pass data to PhotoSwipe and initialize it
            gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, options);
            gallery.init();
        };

        // loop through all gallery elements and bind events
        var galleryElements = document.querySelectorAll(gallerySelector);

        for (var i = 0, l = galleryElements.length; i < l; i++) {
            galleryElements[i].setAttribute('data-pswp-uid', i + 1);
            galleryElements[i].onclick = onThumbnailsClick;
        }

        // Parse URL and open gallery if it contains #&pid=3&gid=1
        var hashData = photoswipeParseHash();
        if (hashData.pid && hashData.gid) {
            openPhotoSwipe(hashData.pid, galleryElements[hashData.gid - 1], true, true);
        }
    };
    // execute above function
    initPhotoSwipeFromDOM('.gallery');

    /*==============================
    Player
    ==============================*/
    function initializePlayer() {
        if ($('#player').length) {
            const player = new Plyr('#player');
        } else {
            return false;
        }
        return false;
    }

    $(window).on('load', initializePlayer());

    /*==============================
    Range sliders
    ==============================*/

    /*1*/
    function initializeFirstSlider() {
        if ($('#filter__years').length) {
            var firstSlider = document.getElementById('filter__years');
            noUiSlider.create(firstSlider, {
                range: {
                    'min': 1970,
                    'max': new Date().getFullYear()
                },
                step: 1,
                connect: true,
                direction: 'rtl',
                start: [1970, new Date().getFullYear()],
                format: wNumb({
                    decimals: 0,
                })
            });
            var firstValues = [
                document.getElementById('filter__years-start'),
                document.getElementById('filter__years-end')
            ];
            firstSlider.noUiSlider.on('update', function (values, handle) {
                firstValues[handle].innerHTML = values[handle];
            });

            $('.filter__item-menu--range').on('click.bs.dropdown', function (e) {
                e.stopPropagation();
                e.preventDefault();
            });
        } else {
            return false;
        }
        return false;
    }

    $(window).on('load', initializeFirstSlider());

    /*2*/
    function initializeSecondSlider() {
        if ($('#m-filter__year').length) {
            var firstSlider = document.getElementById('m-filter__years');
            noUiSlider.create(firstSlider, {
                range: {
                    'min': 1970,
                    'max': new Date().getFullYear()
                },
                step: 1,
                connect: true,
                direction: 'rtl',
                start: [1970, new Date().getFullYear()],
                format: wNumb({
                    decimals: 0,
                })
            });
            var firstValues = [
                document.getElementById('m-filter__years-start'),
                document.getElementById('m-filter__years-end')
            ];
            firstSlider.noUiSlider.on('update', function (values, handle) {
                firstValues[handle].innerHTML = values[handle];
            });

            $('.filter__item-menu--range').on('click.bs.dropdown', function (e) {
                e.stopPropagation();
                e.preventDefault();
            });
        } else {
            return false;
        }
        return false;
    }

    $(window).on('load', initializeSecondSlider());

    // /*3*/
    // function initializeThirdSlider() {
    //     if ($('#slider__rating').length) {
    //         var thirdSlider = document.getElementById('slider__rating');
    //         noUiSlider.create(thirdSlider, {
    //             range: {
    //                 'min': 0,
    //                 'max': 10
    //             },
    //             connect: [true, false],
    //             direction: 'rtl',
    //             step: 0.1,
    //             start: 8.6,
    //             format: wNumb({
    //                 decimals: 1,
    //             })
    //         });
    //
    //         var thirdValue = document.getElementById('form__slider-value');
    //
    //         thirdSlider.noUiSlider.on('update', function (values, handle) {
    //             thirdValue.innerHTML = values[handle];
    //         });
    //     } else {
    //         return false;
    //     }
    //     return false;
    // }

    // $(window).on('load', initializeThirdSlider());

    $('.filter__selectable').on('click.bs.dropdown', function (e) {
        e.stopPropagation();
    });
    try {
        $('.btn-num-product-down').on('click', function(){
            var numProduct = Number($(this).next().val());
            if(numProduct > 1) $(this).next().val(numProduct - 1);
        });

        $('.btn-num-product-up').on('click', function(){
            var numProduct = Number($(this).prev().val());
            $(this).prev().val(numProduct + 1);
        });

        $('.quantity-wrapper .minus').on('click', function(){
            var numProduct = Number($(this).prev().prev().val());
            if(numProduct > 1) $(this).prev().prev().val(numProduct - 1);
            return false;
        });

        $('.quantity-wrapper .plus').on('click', function(){
            var numProduct = Number($(this).prev().val());
            $(this).prev().val(numProduct + 1);
            return false;
        });


    } catch(er) {console.log(er);}
    try {
        $('.wrap-rating').each(function(){
            var item = $(this).find('.item-rating');
            var rated = -1;
            var input = $(this).find('input');
            $(input).val(0);

            $(item).on('mouseenter', function(){
                var index = item.index(this);
                var i = 0;
                for(i=0; i<=index; i++) {
                    $(item[i]).removeClass('fa-star-o');
                    $(item[i]).addClass('fa-star');
                }

                for(var j=i; j<item.length; j++) {
                    $(item[j]).addClass('fa-star-o');
                    $(item[j]).removeClass('fa-star');
                }
            });

            $(item).on('click', function(){
                var index = item.index(this);
                rated = index;
                $(input).val(index+1);
            });

            $(this).on('mouseleave', function(){
                var i = 0;
                for(i=0; i<=rated; i++) {
                    $(item[i]).removeClass('fa-star-o');
                    $(item[i]).addClass('fa-star');
                }

                for(var j=i; j<item.length; j++) {
                    $(item[j]).addClass('fa-star-o');
                    $(item[j]).removeClass('fa-star');
                }
            });
        });
    } catch(er) {console.log(er);}

    $('.filter__selectable input').on('change', function (evt) {
        const parent = $(evt.target).parent().parent();
        const inputcontainers = parent.find('div').toArray();
        const checkedInputs = inputcontainers.filter((item) => {
            const input = $(item).find('input')[0];
            return input.checked;
        });
        const checkedValues = checkedInputs.map((item) => {
            return $(item).find('label')[0].innerText;
        });
        const finalValue = checkedValues.join(' ، ');

        const toggle = $(evt.target).closest('.filter__selectable').prev().find('input')[0];
        toggle.value = finalValue  ? finalValue : 'همه';
    });
    $('.choose-avatar img').on('click', function (evt){
        $(this.closest('.choose-avatar')).find('.active').removeClass('active')
       this.classList.add('active');

    })

    /*==============================
Comics slider
==============================*/


        if ($('.amy-slick').length) {
            $('.amy-slick').slick({
                slidesToShow: 5,
                slidesToScroll: 5,
                autoplay: false,
                autoplaySpeed: 3000,
                arrows: true,
                centerMode: true,
                responsive: [{
                    breakpoint: 480,
                    settings: {slidesToShow: 1, slidesToScroll: 1}
                }, {breakpoint: 979, settings: {slidesToShow: 3, slidesToScroll: 3}}, {
                    breakpoint: 1199,
                    settings: {slidesToShow: 5, slidesToScroll: 5}
                }, {breakpoint: 1999, settings: {slidesToShow: 7, slidesToScroll: 7}}, {
                    breakpoint: 4999,
                    settings: {slidesToShow: 7, slidesToScroll: 7}
                }],
                "dots": false
            })
        }


        $('.publisher-container').owlCarousel({
            loop: true,
            margin: 10,
            autoplay: true,
            responsiveClass: true,
            rtl: true,
            nav: false,
            smartSpeed: 1200,
            responsive: {
                0: {
                    items: 2
                },
                400: {
                    items: 3
                },
                700: {
                    items: 5
                },
                1000: {
                    items: 8,
                    margin: 20
                }
            }
        });
        $('.product-slider').owlCarousel({
            loop: true,
            margin: 10,
            autoplay: true,
            responsiveClass: true,
            rtl: true,
            nav: false,
            smartSpeed: 1200,
            responsive: {
                0: {
                    items: 2
                },
                400: {
                    items: 2
                },
                800: {
                    items: 3
                },
                1000: {
                    items: 4,
                    margin: 20
                }
            }
        });

        const slider = document.getElementsByClassName('prs_vp_center_slider');
        if (slider.length > 0) {
            $('.prs_vp_center_slider .owl-carousel').owlCarousel({
                loop: true,
                margin: 10,
                autoplay: true,
                responsiveClass: true,
                rtl: true,
                smartSpeed: 1200,
                navText: ['<i class="icon ion-md-arrow-forward"></i>', '<i class="icon ion-md-arrow-forward"></i>'],
                responsive: {
                    0: {
                        items: 1,
                        nav: true
                    },
                    500: {
                        items: 1,
                        nav: true
                    },
                    700: {
                        items: 1,
                        nav: true
                    },
                    1000: {
                        items: 1,
                        nav: true,
                        loop: true,
                        margin: 20
                    }
                }
            })
        }

        $('.new-items').owlCarousel({
            // loop: true,
            dots: false,
            responsiveClass: true,
            margin: 20,
            nav: true,
            navText: ['<i class="ion-ios-arrow-forward ion"></i>', '<i class="ion-ios-arrow-back ion"></i>'],
            rtl: true,
            smartSpeed: 1200,
            responsive: {
                0: {
                    items: 1
                },
                500: {
                    items: 2
                },
                768: {
                    items: 3,
                    margin: 20
                },
                1000: {
                    items: 5,
                    margin: 20
                }
            }
    });

        $('.most-visited').owlCarousel({
            // loop: true,
            dots: false,
            responsiveClass: true,
            nav: true,
            navText: ['<i class="ion-ios-arrow-forward ion"></i>', '<i class="ion-ios-arrow-back ion"></i>'],
            rtl: true,
            smartSpeed: 1200,
            responsive: {
                0: {
                    items: 1
                },
                500: {
                    items: 2
                },
                768: {
                    items: 3,
                    margin: 20
                },
                1000: {
                    items: 5,
                    margin: 20
                }
            }
        });

    if ($('.album-slider').length) {
        $(".album-slider").bxSlider({
            minSlides: 1,
            maxSlides: 14,
            slideWidth: 157,
            slideMargin: 17,
            ticker: true,
            tickerHover: true,
            speed: 20000,
            useCSS: false,
            infiniteLoop: false

        });
    }

    if ($('.movie-cast-slider').length) {
        $(".movie-cast-slider").bxSlider({
            minSlides: 1,
            maxSlides: 10,
            slideWidth: 257,
            slideMargin: 17,
            ticker: true,
            tickerHover: true,
            speed: 20000,
            useCSS: false,
            infiniteLoop: false

        });
    }

    if ($('.prs_vp_left_slider').length) {
        $(".prs_vp_left_slider").bxSlider({
            minSlides: 1,
            autoDirection: 'next',
            mode: 'vertical',
            maxSlides: 10,
            slideWidth: 257,
            slideMargin: 17,
            ticker: true,
            tickerHover: true,
            speed: 15000,
            useCSS: false,
            infiniteLoop: false

        });
    }

    if ($('.prs_vp_right_slider').length) {
        $(".prs_vp_right_slider").bxSlider({
            minSlides: 1,
            mode: 'vertical',
            autoDirection: 'prev',
            maxSlides: 10,
            slideWidth: 257,
            slideMargin: 17,
            ticker: true,
            tickerHover: true,
            speed: 15000,
            useCSS: false,
            infiniteLoop: false

        });
    }

});

function addKeyword(evt) {
    debugger
    const target = evt.target;
    const keyword = $(target).parent().find('input')[0].value;
    if (keyword && evt.keyCode === 13) {
        const targetInput = $(target).parent().prev();
        targetInput.value = keyword
    }
}