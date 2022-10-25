//////////////////////////////
/// DISABLE CONSOLE LOGS /////
//////////////////////////////
// console.log = function () {};


///////////////////
/// LAZY LOAD /////
///////////////////

$(document).on('lazyloaded', function(e) {
    // console.log('** lazyloaded is fired', e.target);  
})

$(document).on('lazybeforeunveil', function(e) {

    // console.log('lazyloader baby!', e.target);
    consoleLog('lazyloader', 'warning');

    var viewportWidth = $(window).innerWidth();
    // var bg = $(e.target).data('bg-mobile');
    var bg = $(e.target).data('bg-mobile');
    if (viewportWidth > 0) {
        bg = $(e.target).data('bg-mobile');
    }
    if (viewportWidth > 768) {
        bg = $(e.target).data('bg-tablet');
    }
    if (viewportWidth > 1023) {
        bg = $(e.target).data('bg-desktop');
    }
    if (viewportWidth > 1800) {
        bg = $(e.target).data('bg-super');
    }

    if (bg) {
        // $(e.target).css('background-image', 'url(' + bg + ')');
        // TweenMax.set($($(e.target)), {backgroundImage:'url(' + bg + ')'});
        // Also if you're going to use the css wrapper it shoud be like this:
        // TweenMax.set($(e.target),   {opacity:0}); // delay: 1

        // var giveFadeInClass = function(){
        // $(e.target).addClass('fade-in');
        // }

        TweenMax.set($(e.target), {
            css: {
                backgroundImage: 'url(' + bg + ')'
            },
            delay: 0.4
        }); // onComplete:giveFadeInClass

        // TweenMax.to($(e.target),    0.5,  {opacity:1, delay: 0.5}); // delay: 1

        // // in case of issues with opacity
        // var setOpacityTo1 = function(){
        //   console.log('%c setOpacityTo1 called', 'color: #bada55, background: #000');
        //   console.log($(e.target));
        //   TweenMax.set($(e.target),   {opacity:1});
        // }
        // TweenMax.delayedCall(6, setOpacityTo1);  

    }

});

///////////////////////////////////////
/// LAZY LOAD BG IMGS, set in CSS /////
///////////////////////////////////////


// lazyload curve bg images..
// https://imagekit.io/blog/lazy-loading-images-complete-guide/

document.addEventListener("DOMContentLoaded", function() {
    var lazyloadImages;

    if ("IntersectionObserver" in window) {
        lazyloadImages = document.querySelectorAll(".js-lazy-bg-image");
        var imageObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    var image = entry.target;
                    // console.log(image);
                    image.classList.remove("js-lazy-bg-image");
                    image.classList.add("lazy-bg-image-lazyloaded");
                    imageObserver.unobserve(image);
                }
            });
        });

        lazyloadImages.forEach(function(image) {
            // console.log(image);
            imageObserver.observe(image);
        });
    } else {
        var lazyloadThrottleTimeout;
        lazyloadImages = document.querySelectorAll(".js-lazy-bg-image");

        function lazyload() {
            if (lazyloadThrottleTimeout) {
                clearTimeout(lazyloadThrottleTimeout);
            }

            lazyloadThrottleTimeout = setTimeout(function() {
                var scrollTop = window.pageYOffset;
                lazyloadImages.forEach(function(img) {
                    if (img.offsetTop < (window.innerHeight + scrollTop)) {
                        img.src = img.dataset.src;
                        img.classList.remove('js-lazy-bg-image');
                        image.classList.add("lazy-bg-imagelazyloaded");
                    }
                });
                if (lazyloadImages.length == 0) {
                    document.removeEventListener("scroll", lazyload);
                    window.removeEventListener("resize", lazyload);
                    window.removeEventListener("orientationChange", lazyload);
                }
            }, 20);
        }

        document.addEventListener("scroll", lazyload);
        window.addEventListener("resize", lazyload);
        window.addEventListener("orientationChange", lazyload);
    }
});


///////////////////
/// UTILITIES /////
///////////////////

// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.
function debounce(func, wait, immediate) {
    var timeout;
    return function() {
        var context = this,
            args = arguments;
        var later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
};


///////////////////////////////////
/// console.log() replacement /////
///////////////////////////////////

var $enableCustomLog = false;
// $enableCustomLog = true;

function consoleLog(message, color = 'teal') {

    if (!$enableCustomLog) {
        return;
    }

    switch (color) {
        case 'success':
            color = 'Green'
            break
        case 'info':
            color = '#4d87fd'
            break;
        case 'error':
            color = 'Red'
            break;
        case 'warning':
            color = 'Orange'
            break;
        default:
            color = color
    }

    console.log('%c' + message, 'color:' + color);
}

// consoleLog('Hello World!');
// consoleLog('Success!', 'success');
// consoleLog('Error!', 'error');
// consoleLog('Warning!', 'warning');
// consoleLog('Info...', 'info');
consoleLog('ZAPPP!!', 'warning');

var scriptInit = function() {

    // GSAP DEFAULTS
    TweenMax.defaultEase = Back.easeOut;

    /////////////////////////////////////////////////////////////////////////////////////////////
    // Toggle on grid                                                                        / //
    /////////////////////////////////////////////////////////////////////////////////////////////

    window.onkeyup = function(e) {
        var key = e.keyCode ? e.keyCode : e.which;

        if (key == 71) {
            $('html').addClass('show-grid');
        } else if (key == 76) {
            $('html').addClass('show-lines');
        } else if (key == 27) {
            $('html').removeClass('show-grid');
            $('html').removeClass('show-lines');
        }
    }

    /////////////////////
    // POLICY TOGGLE.  //
    /////////////////////

    // body.menu-is-open
    jQuery("body .js-policy-toggle").click(function(event) {
        // togglePolicy(event);
        event.preventDefault();
        jQuery(this).parent().toggleClass('policy-is-open');
    });

    // body.menu-is-open
    jQuery("body .js-sub_policy-toggle").click(function(event) {
        // togglePolicy(event);
        event.preventDefault();
        jQuery(this).parent().toggleClass('policy-is-open');
    });

    ////////////////////////////
    // FOOTER MOBILE TOGGLE.  //
    ////////////////////////////

    // body.menu-is-open
    jQuery("body .js-toggle-footer-col").click(function(event) {
        // togglePolicy(event);
        event.preventDefault();
        jQuery(this).parent().toggleClass('is-visible');
    });


    ////////////////////////////
    // AJAX OPT-IN/OUT CALLS  //
    ////////////////////////////



    // function testAjax() {
    //   return $.ajax({
    //       url: "../opt-out/status.php"
    //   });
    // }

    // var promise = testAjax();

    // promise.success(function (data) {
    //   alert(data);
    // });

    // $("#confirm").click(function () {
    //   console.log('button click');
    //   promise();
    //     // $.ajax({
    //     //       type: "POST",
    //     //       // url: "index.php",
    //     //       url: "../opt-out/status.php",
    //     //       // data: {
    //     //       //     firstname: "Bob",
    //     //       //     lastname: "Jones"
    //     //       // }
    //     //   })
    //     //   .done(function (msg) {
    //     //       alert("Data Saved: " + msg);
    //     //   });
    // });

    $("#confirm").click(function() {

        console.log('added code...');

        // function that makes a request and returns a promise:
        function testAjax() {
            return $.ajax({

                crossDomain: true,
                url: '../opt-out/status.php',
                // url: '../opt-out/newtest.php',
                type: 'POST',
                xhrFields: {
                    withCredentials: true
                },
                success: function(data) {
                    console.log(data);
                }

                // data: {
                //     json: '123',
                //     delay: 2
                // }

            });
        }

        // function that expects a promise as an argument:
        function displayData(x) {
            console.log('display Data function');
            x.success(function(realData) {
                console.log('display Data...');
                console.log(realData);
            });
        }

        // get a promise from testAjax:
        var promise = testAjax();

        // give a promise to other function:
        displayData(promise);

        // Reached the end of the script:
        console.log('Main script is done without waiting for data.');


        // console.log("main function");
        // console.log("ajax request to the resource which will require cors enabled");
        // $.ajax
        // ({
        //     // dataType: "html",
        //     // url: "http://google.com",
        //     dataType: "json",
        //     url: "https://api.github.com",
        //     success: function(data)
        //     {
        //         console.log("log response on success");
        //         console.log(data);
        //     }
        // });

        // $.ajaxSetup({
        //     headers: { 
        //       "Access-Control-Allow-Origin" : "{$_SERVER['HTTP_ORIGIN']}",
        //       "Access-Control-Allow-Credentials" : "true",
        //       "X-Content-Security-Policy" : "default-src *",
        //       "X-Frame-Options" : "ALLOW-FROM www.youronlinechoices.com",
        //       "P3P" : "CP='IDC DSP COR ADM DEVi TAIi PSA PSD IVAi IVDi CONi HIS OUR IND CNT'",
        //     }
        // });

        // function getAvailableServices() {
        //   // e.g., Origin URL : www.origin.com , Destination server URL : http://www.server.com/abc.json
        //   var server_url = 'https://ib.adnxs.com/eu_optout?action_id=3&participant_id=375';
        //   var method = "POST";

        //   $.ajax({
        //     // type : method,
        //     // cache : false,
        //     url : server_url,

        //     beforeSend: function(xhr) {
        //       // xhr.setRequestHeader("custom_header", "value");
        //       xhr.setRequestHeader("Access-Control-Allow-Origin", "{$_SERVER['HTTP_ORIGIN']}");
        //       xhr.setRequestHeader("Access-Control-Allow-Credentials", "true");
        //       xhr.setRequestHeader("X-Content-Security-Policy", "default-src *");
        //       xhr.setRequestHeader("X-Frame-Options", "ALLOW-FROM www.youronlinechoices.com");
        //       xhr.setRequestHeader("P3P", "CP='IDC DSP COR ADM DEVi TAIi PSA PSD IVAi IVDi CONi HIS OUR IND CNT'");
        //     },
        //     // async : false,
        //     // xhrFields: {
        //     //   withCredentials: true
        //     // },
        //     //contentType : "text/plain",
        //     // headers : {
        //     //   // Custom Header
        //     //   // "x-zeropc-mapi-sid" : "7b7d67f8-40bc-4b6e-9398-cbf0d699f917",
        //     //   // "Access-Control-Allow-Origin" : "{$_SERVER['HTTP_ORIGIN']}",
        //     //   // "Access-Control-Allow-Credentials" : "true",
        //     //   // "X-Content-Security-Policy" : "default-src *",
        //     //   // "X-Frame-Options" : "ALLOW-FROM www.youronlinechoices.com",
        //     //   // "P3P" : "CP='IDC DSP COR ADM DEVi TAIi PSA PSD IVAi IVDi CONi HIS OUR IND CNT'",
        //     // },
        //     // timeout : 10000,
        //     success : function(data, status, xhr) {
        //       // var parsedJSON = jQuery.parseJSON(data);
        //       // alert(parsedJSON);
        //       console.log(data);
        //       console.log(status);
        //       console.log(xhr);
        //     },
        //     error : handleError,
        //   });
        // };

        // function handleError(data, status, xhr) {
        //   alert(data.status);
        //   var message;
        //   var statusErrorMap = {
        //     '400' : "Server understood the request but request content was invalid.",
        //     '401' : "Unauthorised access.",
        //     '403' : "Forbidden resouce can't be accessed",
        //     '500' : "Internal Server Error.",
        //     '503' : "Service Unavailable"
        //   };
        //   if (data.status) {
        //     message = statusErrorMap[data.status];
        //     if (!message) {
        //       message = "Unknow Error \n.";
        //     }
        //   } else if (xhr == 'parsererror') {
        //     message = "Error.\nParsing JSON Request failed.";
        //   } else if (xhr == 'timeout') {
        //     message = "Request Time out.";
        //   } else if (xhr == 'abort') {
        //     message = "Request was aborted by the server";
        //   } else {
        //     message = "Unknow Error \n.";
        //   }
        // }

        // getAvailableServices();

    });



    /////////////////////////////////////////////////////////////////////////////////////////////
    // Mobile height 100vh fix - https://css-tricks.com/the-trick-to-viewport-units-on-mobile/ //
    /////////////////////////////////////////////////////////////////////////////////////////////

    // First we get the viewport height and we multiple it by 1% to get a value for a vh unit
    let vh = window.innerHeight * 0.01;
    // Then we set the value in the --vh custom property to the root of the document
    document.documentElement.style.setProperty('--vh', `${vh}px`);

    // We listen to the resize event
    window.addEventListener('resize', () => {
        // We execute the same script as before
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    });

    ///////////////////////////////
    // LAZY LOAD Sizes in RESIZE //
    ///////////////////////////////

    var onResize = debounce(function() {

        // console.log('resize triggered');
        // VARS
        var viewportWidth = $(window).innerWidth();

        /// LAZY SIZES FOR BACKGROUNDS....
        // console.log('onResize fired. viewportWidth is', viewportWidth);
        $.each($(".lazyloaded"), function(index, item) {
            var bg = $(item).data('bg-mobile');
            if (viewportWidth > 0) {
                bg = $(item).data('bg-mobile');
            }
            if (viewportWidth > 768) {
                bg = $(item).data('bg-tablet');
            }
            if (viewportWidth > 1023) {
                bg = $(item).data('bg-desktop');
            }
            if (viewportWidth > 1800) {
                bg = $(item).data('bg-super');
            }
            if (bg) {
                // console.log('lazyloader resize!', $(item), ' - onResize fired. viewportWidth is', viewportWidth);
                $(item).css('background-image', 'url(' + bg + ')');
            }
        });

    }, 250);

    window.addEventListener('resize', onResize);


    ///////////////////
    // PLAY GIF ON ROLLVER // 
    ///////////////////

    $(".js-anim-on-rollover").hover(
        function() {
            // $static = $(this).data('static');
            var $anim = $(this).data('anim');
            // console.log('anim is', $anim);
            $(this).attr("style", "background-image: url('" + $anim + "');");
        },
        function() {
            var $static = $(this).data('static');
            // $anim = $(this).data('anim');
            // console.log('static is', $static);
            $(this).attr("style", "background-image: url('" + $static + "');");
        }
    );

    ///////////////////
    // PLAY GIF ON ROLLVER OF VIDEO STRIP MODULE // 
    ///////////////////



    $(".js-video-overlay-with-anim-gif").hover(
        function() {
            // $static = $element.data('static');
            // var $element = $(this).closest('module_content_container').children('js-trigger-anim-on-rollover'); 
            var $element = $(this).parent().find('.js-trigger-anim-on-rollover');
            // console.log($element);
            var $anim = $element.data('anim');
            // console.log('anim is', $anim);
            $element.attr("style", "background-image: url('" + $anim + "');");
        },
        function() {
            // var $element = $(this).closest('module_content_container').children('js-trigger-anim-on-rollover'); 
            var $element = $(this).parent().find('.js-trigger-anim-on-rollover');
            // console.log($element);
            var $static = $element.data('static');
            // $anim = $element.data('anim');
            // console.log('static is', $static);
            $element.attr("style", "background-image: url('" + $static + "');");
        }
    );



    ///////////////////
    // MENU TOGGLE.  //
    ///////////////////

    // body.menu-is-open
    $("body .js-menu-toggle").click(function(event) {
        toggleClassMenu();
    });

    var toggleClassMenu = function() {

        $('.js-menu-toggle.hamburger').toggleClass('is-active');
        $('body').toggleClass('menu-is-open');

        var $labelCopy = $('js-hamburger--label').text();
        // console.log( $labelCopy );
        if ($labelCopy == 'Menu') {
            $('js-hamburger--label').text('Close');
        } else {
            $('js-hamburger--label').text('Menu');
        }

        // console.log('%c menu toggled', 'background:#000; color:#fff');
        // $("body .off-canvas-menu").addClass("off-canvas-menu--animatable");   
        // if(!$("body .off-canvas-menu").hasClass("off-canvas-menu--visible")) {       
        //   $("body .off-canvas-menu").addClass("off-canvas-menu--visible");
        //   $('body').addClass('menu-open');
        //   $('html').addClass('menu-open');
        // } else {
        //   $("body .off-canvas-menu").removeClass('off-canvas-menu--visible');
        //   $('body .off-canvas-news-list').removeClass('off-canvas-news-list--visible');
        //   $('body').removeClass('menu-open');    
        //   $('body').removeClass('news-list-open');

        //   var removeClassFromHTML = function(){
        //     $('html').removeClass('menu-open');  
        //     $("body .off-canvas-menu").removeClass("off-canvas-menu--animatable");
        //   }

        //   TweenMax.delayedCall(0.2, removeClassFromHTML);   
        // }   

    }


    // 

    // /**************************************************************/
    // /***   SLICK                                                ***/
    // /**************************************************************/

    // IMAGE SLIDERS

    // js-images-wrapper
    // js-image-thumbs-wrapper

    // image (iframes)
    var imageSliderSettings = {

        // some imageSliderSettings
        dots: true,
        arrows: false,
        // speed:              450,
        // slidesToShow: 4,
        // slidesToScroll: 1,
        autoplay: true,
        fade: true,
        infinite: true,
        // autoplaySpeed:      2900,
        // vertical:           true,
        // verticalSwiping:    true,
        // touchMove:          false,
        // touchThreshold: true,
        // swipe:              false,
        // adaptiveHeight:     false,
        // touchThreshold:     10,
        // asNavFor:           '.js-flex-slideshow-captions',

        // prevArrow:"<div class='slick-prev--wrapper slick-arrow--wrapper'><img class='a-left control-c prev slick-prev' src='" + js_vars.themeurl + "/2x/inline-icon-arrow-left@2x.png'></div>",
        // nextArrow:"<div class='slick-next--wrapper slick-arrow--wrapper'><img class='a-right control-c next slick-next' src='" + js_vars.themeurl + "/2x/inline-icon-arrow-right@2x.png'></div>"
        // draggable: true,
        // pauseOnHover:       false,
        // rtl: true,
    }

    $('body .js-slideshow-gallery').slick(imageSliderSettings);



    // js-team_members-strip
    var imageSliderSettings = {

        // some imageSliderSettings
        dots: true,
        arrows: false,
        // speed:              450,
        // slidesToShow: 4,
        // slidesToScroll: 1,
        autoplay: false,
        fade: false,
        infinite: false,
        slidesToShow: 4,
        // autoplaySpeed:      2900,
        // vertical:           true,
        // verticalSwiping:    true,
        // touchMove:          false,
        // touchThreshold: true,
        // swipe:              false,
        // adaptiveHeight:     false,
        // touchThreshold:     10,
        // asNavFor:           '.js-flex-slideshow-captions',

        // prevArrow:"<div class='slick-prev--wrapper slick-arrow--wrapper'><img class='a-left control-c prev slick-prev' src='" + js_vars.themeurl + "/2x/inline-icon-arrow-left@2x.png'></div>",
        // nextArrow:"<div class='slick-next--wrapper slick-arrow--wrapper'><img class='a-right control-c next slick-next' src='" + js_vars.themeurl + "/2x/inline-icon-arrow-right@2x.png'></div>",
        // draggable: true,
        // pauseOnHover:       false,
        // rtl: true,
        responsive: [{
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    // arrows: false,
                    // dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    // arrows: false,
                    // dots: true
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    // arrows: false,
                    // dots: true
                }
            }
            // You can unslick at a given breakpoint now by adding:
            // settings: "unslick"
            // instead of a settings object
        ]
    }

    $('body .js-team_members-strip').slick(imageSliderSettings);



    // js-client_logos_container
    var client_logos_containerSettings = {

        // some imageSliderSettings
        dots: false,
        arrows: false,
        // speed:              450,
        // slidesToShow: 4,
        // slidesToScroll: 1,
        autoplay: true,
        fade: false,
        infinite: true,
        slidesToShow: 6,
        // slidesToScroll:     6,
        autoplaySpeed: 900,
        // vertical:           true,
        // verticalSwiping:    true,
        touchMove: false,
        // touchThreshold: true,
        swipe: false,
        // adaptiveHeight:     false,
        // touchThreshold:     10,
        // asNavFor:           '.js-flex-slideshow-captions',

        // prevArrow:"<div class='slick-prev--wrapper slick-arrow--wrapper'><img class='a-left control-c prev slick-prev' src='" + js_vars.themeurl + "/2x/inline-icon-arrow-left@2x.png'></div>",
        // nextArrow:"<div class='slick-next--wrapper slick-arrow--wrapper'><img class='a-right control-c next slick-next' src='" + js_vars.themeurl + "/2x/inline-icon-arrow-right@2x.png'></div>",
        draggable: false,
        pauseOnHover: false,
        // rtl: true,
        responsive: [{
                breakpoint: 1024,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 4,
                    infinite: true,
                    // arrows: false,
                    // dots: true
                }
            },
            // {
            //   breakpoint: 600,
            //   settings: {
            //     slidesToShow: 2,
            //     slidesToScroll: 2,
            //     // arrows: false,
            //     // dots: true
            //   }
            // },
            // {
            //   breakpoint: 480,
            //   settings: {
            //     slidesToShow: 1,
            //     slidesToScroll: 1,
            //     // arrows: false,
            //     // dots: true
            //   }
            // }
            // You can unslick at a given breakpoint now by adding:
            // settings: "unslick"
            // instead of a settings object
        ]
    }

    $('body .js-client_logos_container').slick(client_logos_containerSettings);


    ///////////////////
    // clipboard  //
    ///////////////////

    // var clipboard = new Clipboard('.clipboard-btn');

    // clipboard.on('success', function(e) {
    //     console.info('Action:', e.action);
    //     console.info('Text:', e.text);
    //     console.info('Trigger:', e.trigger);

    //     e.clearSelection();

    //     $('#clipboard-btn').text('link copied');

    // });

    // clipboard.on('error', function(e) {
    //     console.error('Action:', e.action);
    //     console.error('Trigger:', e.trigger);

    //     $('#clipboard-btn').text('error!');

    // });

    ///////////////////
    // FILTER SELECT //
    ///////////////////

    // $('.js-post-filters').multiselect();

    // $('.js-post-filters').forEach


    // $('.js-post-filters').fSelect({
    //     placeholder: $(this).data('name'),
    //     // placeholder: $('.js-post-filters').data('name'),
    //     // placeholder: 'bum',
    //     // numDisplayed: 3,
    //     // overflowText: '{n} selected',
    //     // noResultsText: 'No results found',
    //     // searchText: 'Search',
    //     // showSearch: true
    // });

    // $('.js-post-filters').each(function() {
    //     var $name = $(this).data('name');
    //     $(this).fSelect({
    //         placeholder: $name,
    //         // placeholder: $('.js-post-filters').data('name'),
    //         // placeholder: 'bum',
    //         // numDisplayed: 3,
    //         // overflowText: '{n} selected',
    //         // noResultsText: 'No results found',
    //         // searchText: 'Search',
    //         // showSearch: true
    //     });
    // });



    // // console.table($('.js-post-filters').fSelect());


    // // GLOBAL DESELECT ALL
    // $('.js-deselect-all-filters').click( function(event){
    //     event.preventDefault();
    //     // console.log('deselect-all-filters'); 
    //     $('.fs-option').removeClass('selected');
    //     $('.fs-wrap').find('.fs-dropdown').removeClass('hidden');
    //     $('.fs-wrap').addClass('fs-open');
    //     // deselect hidden fields
    //     $('.post-filters select option').attr("selected", false);
    // });

    // // GLOBAL SELECT ALL
    // $('.js-select-all-filters').click( function(event){
    //     event.preventDefault();
    //     // console.log('SELECT-all-filters'); 
    //     $('.fs-option').addClass('selected');
    //     $('.fs-wrap').find('.fs-dropdown').removeClass('hidden');
    //     $('.fs-wrap').addClass('fs-open');
    //     // deselect hidden fields
    //     $('.post-filters select option').attr("selected", "selected");
    // });

    // // replace copy for 'clear selection' - for WPML langs
    // var $clear_label = $('.js-filter-ul').data('clear-label-name');
    // console.log('$clear_label', $clear_label);
    // $('.js-deselect-toggle').text($clear_label);
    // console.log($('.js-deselect-toggle').text());

    // // DROPDOWN DESELECT ALL
    // $('.js-deselect-toggle').click( function(event){
    //     event.preventDefault();
    //     // console.log('deselect-dropdown-filters'); 
    //     // travel up to fs-wrap
    //     var $thisFsWrap = $(this).closest('.fs-wrap');
    //     // console.log('fsWrap is',$thisFsWrap);
    //     // $thisFsWrap.addClass('is-highlighted'); 
    //     // find all relevant children
    //     $thisFsWrap.find('.fs-option').removeClass('selected');
    //     $thisFsWrap.find('.fs-dropdown').removeClass('hidden');
    //     $thisFsWrap.addClass('fs-open');
    //     // deselect hidden fields
    //     $thisFsWrap.find('select option').attr("selected", false);
    // });

    // // DROPDOWN SELECT ALL
    // $('.js-select-toggle').click( function(event){
    //     event.preventDefault();
    //     // console.log('SELECT-dropdown-filters'); 
    //     // travel up to fs-wrap
    //     var $thisFsWrap = $(this).closest('.fs-wrap');
    //     // console.log('fsWrap is',$thisFsWrap); 
    //     // $thisFsWrap.addClass('is-highlighted');
    //     // find all relevant children
    //     $thisFsWrap.find('.fs-option').addClass('selected');
    //     $thisFsWrap.find('.fs-dropdown').removeClass('hidden');
    //     $thisFsWrap.addClass('fs-open');
    //     // deselect hidden fields
    //     $thisFsWrap.find('select option').attr("selected", "selected");
    // });

    ///////////////////
    // SMOOTH SCROLL //
    ///////////////////

    // Select all links with hashes
    $('a[href*="#"]')
        // Remove links that don't actually link to anything
        .not('[href="#"]')
        .not('[href="#news"]') // added for news in overlay
        .not('[href="#0"]')
        .click(function(event) {
            // On-page links
            if (
                location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') &&
                location.hostname == this.hostname
            ) {
                // Figure out element to scroll to
                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                // Does a scroll target exist?
                if (target.length) {
                    // Only prevent default if animation is actually gonna happen
                    event.preventDefault();
                    $('html, body').animate({
                        scrollTop: target.offset().top
                    }, 1000, function() {
                        // Callback after animation
                        // Must change focus!
                        var $target = $(target);
                        $target.focus();
                        if ($target.is(":focus")) { // Checking if the target was focused
                            return false;
                        } else {
                            $target.attr('tabindex', '-1'); // Adding tabindex for elements not focusable
                            $target.focus(); // Set focus again
                        };
                    });
                }
            }
        });



    // /**************************************************************/
    // /***   WOW                                                  ***/
    // /**************************************************************/


    var wow = new WOW({
        // boxClass:     'wow',      // animated element css class (default is wow)
        // animateClass: 'animated', // animation css class (default is animated)
        // offset:       0,          // distance to the element when triggering the animation (default is 0)
        // mobile:       true,       // trigger animations on mobile devices (default is true)
        // live:         true,       // act on asynchronously loaded content (default is true)
        // callback:     function(box) {
        //   // the callback is fired every time an animation is started
        //   // the argument that is passed in is the DOM node being animated
        // },
        // scrollContainer: null,    // optional scroll container selector, otherwise use window,
        // resetAnimation: true,     // reset animation on end (default is true)
    });
    wow.init();


    /////////////////////////////////
    // IFRAME LOAD ON CLICK VIDEO  //
    /////////////////////////////////

    // $('.js-iframe-load-on-click').click( function(event){
    //     event.preventDefault(); 
    //     // console.log('load iFrame'); 
    //     // $('.fs-option').removeClass('selected');
    //     // $('.fs-wrap').find('.fs-dropdown').removeClass('hidden');
    //     // $('.fs-wrap').addClass('fs-open');
    //     // deselect hidden fields
    //     var $url = $(this).data("src");
    //     $url = decodeURIComponent($url);
    //     $(this).html('<iframe id="iframe" src="'+$url+'" width="700" height="450"></iframe>');
    // });



    /////////////////////////////////
    // BLOG STRIP REVEAL BUTTON  //
    /////////////////////////////////

    $('.js-reveal-more-posts-btn').click(function(event) {
        event.preventDefault();
        // console.log( $(this) ); 
        $(this).parent().parent().find('.reveal-more-posts').addClass('is-visible');
        $(this).addClass('is-hidden');
        $(this).parent().addClass('is-hidden');
    });




    $('.js-video-overlay').magnificPopup({
        type: 'iframe',
        iframe: {
            markup: '<div class="mfp-iframe-scaler">' +
                '<div class="mfp-close"></div>' +
                '<iframe class="mfp-iframe" frameborder="0" allow="autoplay" allowfullscreen></iframe>' +
                '</div>', // HTML markup of popup, `mfp-close` will be replaced by the close button

            // patterns: {
            //   youtube: {
            //     index: 'youtube.com/', // String that detects type of video (in this case YouTube). Simply via url.indexOf(index).

            //     id: 'v=', // String that splits URL in a two parts, second part should be %id%
            //     // Or null - full URL will be returned
            //     // Or a function that should return %id%, for example:
            //     // id: function(url) { return 'parsed id'; }

            //     src: '//www.youtube.com/embed/%id%?autoplay=1' // URL that will be set as a source for iframe.
            //   },
            //   vimeo: {
            //     index: 'vimeo.com/',
            //     id: '/',
            //     src: '//player.vimeo.com/video/%id%?autoplay=1'
            //   },
            //   gmaps: {
            //     index: '//maps.google.',
            //     src: '%id%&output=embed'
            //   }

            //   // you may add here more sources

            // },



            srcAction: 'iframe_src', // Templating object key. First part defines CSS selector, second attribute. "iframe_src" means: find "iframe" and set attribute "src".
        },
        callbacks: {
            elementParse: function(item) {
                // Function will fire for each target element
                // "item.el" is a target DOM element (if present)
                // "item.src" is a source that you may modify



                // ga('require', 'GTM-NFL8294');
                ga('send', 'event', 'Video Overlay', 'open', item.src);
                // gtag('config', 'UA-GA_TRACKING-CODE', { 'optimize_id': 'GTM-NFL8294'})

                // console.log(item.src); // Do whatever you want with "item" object
            }
            // open: function() {
            //     console.log('Popup is opened');
            // }
        }
        // other options
    });

    $('.js-search-toggle').magnificPopup({
        items: {
            src: '#overlay-searchform',
            type: 'inline'
        },
        // type:'inline',
        midClick: true // Allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source in href.
    });




    ///////////////////////
    // FILTER JOBS       //
    ///////////////////////

    // $('.js-jobs-grid').isotope({
    //   // options
    //   itemSelector: '.grid-item',
    //   layoutMode: 'fitRows'
    // });

    $('.js-job-filter-btn').on('click', function(event) {

        event.preventDefault();

        var $filterValuesGroup1 = [];
        var $filterValuesGroup2 = [];

        $filterValuesGroup1.push($('.js-job-post-filters.post-filters--post-filter_1 select').val());
        $filterValuesGroup2.push($('.js-job-post-filters.post-filters--post-filter_2 select').val());

        // $filterValuesGroup1 = ;
        // $filterValuesGroup2 = $( '.js-job-post-filters.post-filters--post-filter_2' ).val();


        // console.table($filterValuesGroup1);
        // console.table($filterValuesGroup2);

        // stop fade in again
        $('.jobs-board .jobs-card').removeAttr('style');
        $('.jobs-board .jobs-card').removeClass('wow');

        $('.jobs-board .jobs-card').addClass('is-hidden');


        // $filterValuesGroup1

        var $itemsToShow = [];

        if ($filterValuesGroup1.length != 0) {
            // if items are in group 1, then try and loop with group 2

            if ($filterValuesGroup2.length != 0) {
                // both groups have items

                $.each($filterValuesGroup1, function(index, value) {
                    // alert( index + ": " + value );
                    // console.log('array1 val is', value);
                    $.each($filterValuesGroup2, function(i, v) {
                        // console.log('combined vals is', value, v);
                        $itemsToShow.push(value + v);
                    });

                });

            } else {
                // group 1 has items, group 2 doesn't
                $.each($filterValuesGroup1, function(index, value) {
                    $itemsToShow.push(value);
                });

            }

        } else {

            if ($filterValuesGroup2.length != 0) {
                // group 2 has items, group 1 does not.
                $.each($filterValuesGroup2, function(i, v) {
                    // console.log('combined vals is', value, v);
                    $itemsToShow.push(v);
                });

            }

        }

        // console.table($itemsToShow);

        // console.table('items to shoooow', $itemsToShow);

        $.each($itemsToShow, function(ind, val) {
            // console.log('val is', val);
            $(val).removeClass('is-hidden');
            $(val + ' .jobs-card').addClass('fadeIn');
        });

        // $($itemsToShow).removeClass('is-hidden');




        // }

        // if ($filterValuesGroup2.length === 0) {

        //     $('.jobs-card_link').removeClass('is-hidden');

        // } else {

        //     $('.jobs-card_link').addClass('is-hidden');

        //     // remove wow so it doesn't fade in again.
        //     $('.jobs-card_link .jobs-card').removeAttr('style');
        //     $('.jobs-card_link .jobs-card').removeClass('wow');

        //     // var $classList = "";

        //     var $itemsToShow = $filterValuesGroup2.join('');
        //     $($itemsToShow).removeClass('is-hidden');
        //     $($itemsToShow + ' .jobs-card').addClass('fadeIn');

        //     // $.each($filterValues, function( index, value ) {
        //       // alert( index + ": " + value );
        //       // console.log(value);

        //       // $classList .= " ."+value+" "; 

        //     // });
        //       // $('.jobs-card_link' + value).removeClass('is-hidden');
        //       // $('.jobs-card_link' + value + ' .jobs-card').addClass('fadeIn');
        //     // });

        // }

        // use filterFn if matches value
        // filterValue = filterFns[ filterValue ] || filterValue;
        // $('.js-jobs-grid').isotope({ filter: string }); // NOT YET WORKING...
    });


    // REMOVE SOME CATS FROM BLOG DROPDOWN/
    if ($('.searchandfilter').length) {
        $('#ofcategory option[value="1"]').remove();
        $('#ofcategory option[value="9"]').remove();
    }



};

$(document).ready(function() {

    ////////////////////
    /// SWUP ///////////
    ////////////////////

    // const pageTransitions = function() {
    // let pageTransitioning = false;
    // let animateInTimeline,
    //     animateOutTimeline,
    //     animateInNext;


    // // load scripts for replaced elements
    // document.addEventListener('swup:contentReplaced', event => {
    //   // swup.options.elements.forEach((selector) => {
    //       // load scripts for all elements with 'selector'
    //       // console.log( '%c contentReplaced ' + event.target.URL, 'background: #444; color: #888');
    //       // console.log($('body'));
    //       // scriptInit();
    //   // })
    //   // console.log(event);
    //   // console.log($('body'));

    //   setTimeout(function(){
    //     // console.log( '%c contentReplaced ' + event.target.URL, 'background: #444; color: #888');
    //     console.log($('body'));
    //     scriptInit();
    //   }, 1);

    // });

    // // document.addEventListener('swup:pageRetrievedFromCache', event => {
    // //   console.log( '%c pageRetrievedFromCache -> ' + event.target.URL, 'background: #222; color: #888');
    // //   scriptInit();
    // // });

    // let reverseLoad = () => {
    //     animateInNext && animateInNext();
    // }

    // let buildTimelineOut = (callback) => {
    //     let itemsToAnimate = $(".animate-out").toArray();
    //     itemsToAnimate.reverse();
    //     animateOutTimeline = new TimelineMax({ onComplete: callback });
    //     animateOutTimeline.to(itemsToAnimate, 0.3, { autoAlpha: 0 });
    // }

    // let buildTimelineIn = (callback) => {
    //     let itemsToAnimate = $(".animate-out").toArray();
    //     TweenMax.set(itemsToAnimate, { autoAlpha: 0 });
    //     animateInTimeline = new TimelineMax({ onComplete: callback, onReverseComplete: reverseLoad });
    //     animateInTimeline.to(itemsToAnimate, 0.3, { autoAlpha: 1 });
    // }

    // let options = {
    //   elements: ['#site-content', '#menu-main-menu'],
    //   // debugMode: true,
    //   preload: true,
    //   animateScroll: false,
    //   // pageClassPrefix: 'page-',
    //   animations: {
    //     // if link has data-swup-class="single-work"
    //     // '*>single-work': { 
    //     //   out: function(next) {
    //     //     console.log('%c ---->>>>>>> single work page baby', 'background: #bada55; color: #fff');
    //     //     // if (!pageTransitioning) {
    //     //     animateInNext = next;
    //     //     if (animateInTimeline && animateInTimeline.progress() < 1) {
    //     //       animateInTimeline.reverse();
    //     //     } else {
    //     //       if (!animateOutTimeline) {
    //     //         buildSingleWorkTimelineOut(next);
    //     //       }
    //     //       if (animateOutTimeline && !animateOutTimeline.isActive()) {
    //     //         buildSingleWorkTimelineOut(next);
    //     //       }
    //     //     }
    //     //   },
    //     //   in: function(next) {
    //     //     console.log(next);
    //     //     buildTimelineIn(next);
    //     //   }
    //     // },
    //     /// default transition
    //     '*': {
    //       out: function(next) {
    //         // if (!pageTransitioning) {
    //         animateInNext = next;
    //         if (animateInTimeline && animateInTimeline.progress() < 1) {
    //           animateInTimeline.reverse();
    //         } else {
    //           if (!animateOutTimeline) {
    //             buildTimelineOut(next);
    //           }
    //           if (animateOutTimeline && !animateOutTimeline.isActive()) {
    //             buildTimelineOut(next);
    //           }
    //         }
    //       },
    //       in: function(next) {
    //         console.log(next);
    //         buildTimelineIn(next);
    //       }
    //     }
    //   },
    //   LINK_SELECTOR: 'a[href^="/"]:not(.data-no-swup), a[href^="' + window.location.origin + '"]:not(.data-no-swup)'
    // }



    // let init = () => {
    //     var swup = new Swupjs(options);
    // }
    // return {
    //     init: init
    // }
    // }();

    ///////////////////
    // INIT SWUPS   ///
    ///////////////////
    // pageTransitions.init();


    ///////////////////
    // INIT SCRIPTS ///
    ///////////////////
    scriptInit();
    // alert('bosh');

});