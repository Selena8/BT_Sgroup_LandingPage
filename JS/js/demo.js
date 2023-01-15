
// window.onscroll = () => {
//     const header = document.querySelector('.header');
//     const headerTop = document.querySelector('.header-top');

//     if (document.documentElement.scrollTop > 0) {
//         headerTop.classList.add('d-none');
//         header.classList.add('fixed');
//     } else {
//         headerTop.classList.remove('d-none');
//         header.classList.remove('fixed');
//     }

// };

// //slides 
// let slideIndex = 0;
// showSlides();

// function showSlides() {
//   let i;
//   let slides = document.getElementsByClassName("swiper-slide");
//   for (i = 0; i < slides.length; i++) {
//     slides[i].style.display = "none";  
//   }
//   slideIndex++;
//   if (slideIndex > slides.length) {slideIndex = 1}    
//   slides[slideIndex-1].style.display = "block";  
//   setTimeout(showSlides, 3000); // Change image every 3 seconds
// }




var $win = $(window),
    $body = $('body'),
    $header = $('#header'),
    y_offsetWhenScrollDisabled,
    $offset, successSubmit,
    unlockScroll, lockScroll, $flagFancy = false;
successSubmit = function(elem) 
{
        $flagFancy = true;
        parent.jQuery.fancybox.getInstance().close();
        $flagFancy = true;
        $.fancybox.open({
            padding: 0,
            src: '#succsesOrder',
    
            transitionIn: 'fade',
            transitionOut: 'fade',
            padding: 0,
            margin: 0,
            speedIn: 0,
            speedOut: 0,
            smallBtn: true,
            toolbar: false,
            btnTpl: {
                smallBtn: '<button type="button" data-fancybox-close class="fancybox-button fancybox-close-small"><i class="icon-close"></i></button>'
            },
            onInit: function() {
                setTimeout(function() {
                    $('.js-stickly:not(.sticksy-dummy-node)').attr('style', $styles)
                })
            },
            beforeShow: function() {
                if (!$flagFancy) {
                    lockScroll();
                }
            },
            afterClose: function() {
    
                if (!$flagFancy) {
                    unlockScroll();
    
                    setTimeout(function() {
                        $('.js-stickly:not(.sticksy-dummy-node)').attr('style', $styles)
                    })
                }
                $flagFancy = false
            }
        });
}
$(function() {

    $(".js-menu").each(function() {
        $(this).singlePageNav({
            offset: $header.outerHeight(),
            images: 'img.js-lazy:not(.loaded)'
        });
    });
    $(".js-menu a").on('click', function() {
        var $el = $(this);
   

    }); 
    $(".js-menu-footer a:not(.current)").on('click', function() {
        $('.js-menu').not($(this).parent()).find('li').eq($(this).parent().index()).find('a').trigger('click')       
    })

    function getScrollbarWidth() {
      const outer = document.createElement('div');
      outer.style.visibility = 'hidden';
      outer.style.overflow = 'scroll'; 
      outer.style.msOverflowStyle = 'scrollbar'; 
      document.body.appendChild(outer);
      const inner = document.createElement('div');
      outer.appendChild(inner);
      const scrollbarWidth = (outer.offsetWidth - inner.offsetWidth);
      outer.parentNode.removeChild(outer);
      return scrollbarWidth;

    }
    var $flagFix = false;
    var $flagFixO = false,
        y_offsetWhenScrollDisabled
    $win.scroll(function() {
        y_offsetWhenScrollDisabled = $win.scrollTop();
        if (y_offsetWhenScrollDisabled > 0) {
            $('#header').addClass('fixed');
            $flagFix = true;
        } else {
            if (!$body.is('.open-header') && !$flagFixO) {
                $('#header').removeClass('fixed');
                $flagFix = false;

            }
        }
    });

    var $offsetTop;
    lockScroll = function() {
        if ($flagFix) {
            $flagFixO = true;
        }
        $flagFix2 = true;
        $offsetTop = y_offsetWhenScrollDisabled;
        $('html').css('margin-top', -$offsetTop);
        $body.addClass('scrollDisabled');
        $header.addClass('fixed');

        $width = getScrollbarWidth()
        $('body, html').css('padding-right', $width)
    }

    unlockScroll = function() {


        $('html').css('margin-top', '');
        $body.removeClass('scrollDisabled');
        $('body, html').css('padding-right', '')
        setTimeout(function() {

        $('html, body').animate({
            scrollTop: $offsetTop
        }, 0);

        })
        $flagFixO = false
    }


        if ($('.js-fancybox').length) {

        $(".js-fancybox").fancybox({
            padding: 0,
            margin: 20,
            touch: false,
            animationEffect: 'zoom',
            transitionEffect: "zoom-in-out",
            speed: 350,
            transitionDuration: 300,
            smallBtn: true,
            clickOutside: "close",
            btnTpl: {
                smallBtn: '<button type="button" data-fancybox-close class="fancybox-button fancybox-close-small"><i class="icon-close"></i></button>'
            },
            init: function() {

                lockScroll();
            },
            afterClose: function() {

                unlockScroll();
            }
        })
    }


    // placeholder
    $('input, textarea').each(function() {
        var placeholder = $(this).attr('placeholder');
        $(this).focus(function() {
            $(this).attr('placeholder', '');
        });
        $(this).focusout(function() {
            $(this).attr('placeholder', placeholder);
        });
    });
    // placeholder



        var swiper1;
        if ($('.js-slider-1').length > 0)  {
            var swiper = new Swiper('.js-slider-1', {
                loop: false,
                spaceBetween: 0,
                slidesPerView: 1,
                speed: 400,

                        effect: 'fade',
        autoplay: {
          delay: 2500,
          disableOnInteraction: false,
        },

            });


        }
    // toggle mob menu
    $('.js-button-nav').click(function() {
        var $el = $(this);
        $el.toggleClass('active');
        $('body').toggleClass('open-header');
        $('#mainNav').toggleClass('active');
        if ($('body').is('.open-header')) {
            lockScroll();
        } else {
            setTimeout(function() {
                unlockScroll();
            }, 400);
        }
        return false;
    });
    
 });
