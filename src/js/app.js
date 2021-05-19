/* ===============================================
#  loading
=============================================== */
const load = require('./modules/loading');
load();

/* ===============================================
#  scroll fade in animation
=============================================== */
const scroll = require('./modules/scroll');
scroll('fade-in-item');

/* ===============================================
#  smooth scroll
=============================================== */
document.addEventListener('click', (e) => {
  const target = e.target;
  if (!target.classList.contains('smooth-scroll')) return;
  e.preventDefault();
  const targetId = target.hash;
  document.querySelector(targetId).scrollIntoView({
    behavior: 'smooth',
    block: 'start',
  });
});

// タブ

jQuery(function($){
  $('.tab').click(function(){
    $('.is-active').removeClass('is-active');
    $(this).addClass('is-active');
    $('.is-show').removeClass('is-show');
    const index = $(this).index();
    $('.panel').eq(index).addClass('is-show');
  });
});

// headerのshadow

$(window).scroll(function () {
  if($(window).scrollTop() > 714) {
    $('#header').addClass('add-shadow');
  }else {
    $('#header').removeClass('add-shadow');
  }
});

// スクロール値算出
$(function() {
  $(window).scroll(function() {
    var scroll = $(this).scrollTop();
    console.log(scroll);
   });
  });

  // fade
  $(function () {
    $(window).scroll(function () {
        const wHeight = $(window).height();
        const scrollAmount = $(window).scrollTop();
        $('.fadeItem').each(function () {
            const targetPosition = $(this).offset().top;
            if(scrollAmount > targetPosition - wHeight + 60) {
                $(this).addClass("fadeInDown");
            }
        });
    });
});


// スライダー

$(function() {
  $('.slider').slick({
        infinite: false,
        dots:true,
        slidesToShow: 3,
        slidesToScroll: 3,
        arrows:true,
        responsive: [
        //   {
        //      breakpoint: 768,
        //           settings: {
        //                slidesToShow: 3,
        //                slidesToScroll: 3,
        //      }
        // },
        {
             breakpoint: 480,
                  settings: {
                       slidesToShow: 1,
                       slidesToScroll: 1,
                  }
             }
        ]
   });
});


// モーダル

$(function(){
  $('.js-modal-open').each(function(){
      $(this).on('click',function(){
          var target = $(this).data('target');
          var modal = document.getElementById(target);
          $(modal).fadeIn();
          return false;
      });
  });
  $('.js-modal-close').on('click',function(){
      $('.js-modal').fadeOut();
      return false;
  });
});
$('.js-modal-close').on('click', function(){});

// モーダル開閉時の背景固定非固定

// $(function(){
// 	var scrollPosition;
// 	$(".js-modal-open").on("click", function() {
// 		scrollPosition = $(window).scrollTop();
// 		$('body').addClass('fixed').css({'top': -scrollPosition-15.5});
// 	});
// 	$(".js-modal-close").on("click", function() {
// 		$('body').removeClass('fixed').css({'top': 0});
// 		window.scrollTo( 0 , scrollPosition );
// 	});
// });

// スライダー２

$(function(){
  var slider = $('.slick02').slick({
    infinite: false
  });
  $('.js-modal-open').click(function(){
      slider.css('opacity',0);
      slider.animate({'z-index':1},50,function(){
          slider.slick('setPosition');
          slider.animate({'opacity':1});
      });
  });
});

// カーソル

$(window).mousemove(function (e) {
  $('.cursor span').css({
    left: e.pageX,
    top: e.pageY
  })
})
$('a').on('mouseenter', function () {
  $('.cursor span').addClass('active');
})
$('a').on('mouseleave', function () {
  $('.cursor span').removeClass('active');
})

// 背景色変更

window.addEventListener( "scroll" ,function(){

  let scroll = window.pageYOffset;
  var works = document.getElementById('works');
  
  if (window.matchMedia('(max-width: 767px)').matches) {
      if( scroll > 1501 ){ 
        works.style.backgroundColor = '#f6f6f6';
      }else if( scroll > 1500 ){
        works.style.backgroundColor = '#e9e9e9';
      }else if( scroll > 1400 ){
        works.style.backgroundColor = '#dddddd';
      }else if( scroll > 1200 ){
        works.style.backgroundColor = '#c3c3c3';
      }else if( scroll > 1000 ){
        works.style.backgroundColor = '#dddddd';
      }else if( scroll > 900 ){
        works.style.backgroundColor = '#e9e9e9';
      }
      else if( scroll > 690 ){
        works.style.backgroundColor = '#f6f6f6';
      }else{
        works.style.backgroundColor = '#f6f6f6';
      }
  } else if (window.matchMedia('(min-width:768px)').matches) {
    if( scroll > 2450 ){ 
      works.style.backgroundColor = '#fff';
    }else if( scroll > 2100 ){
      works.style.backgroundColor = '#f6f6f6';
    }else if( scroll > 1900 ){
      works.style.backgroundColor = '#e9e9e9';
    }else if( scroll > 1700 ){
      works.style.backgroundColor = '#ddd';
    }else if( scroll > 1600 ){
      works.style.backgroundColor = '#c3c3c3';
    }else if( scroll > 1400 ){
      works.style.backgroundColor = '#ddd';
    }else if( scroll > 1200 ){
      works.style.backgroundColor = '#e9e9e9';
    }else if( scroll > 1200 ){
      works.style.backgroundColor = '#f6f6f6';
    }
    else if( scroll > 1100 ){
      works.style.backgroundColor = '#fff';
    }else{
      works.style.backgroundColor = '#fff';
    }
  }
});


