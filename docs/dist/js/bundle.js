(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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

document.addEventListener('click', e => {
  const target = e.target;
  if (!target.classList.contains('smooth-scroll')) return;
  e.preventDefault();
  const targetId = target.hash;
  document.querySelector(targetId).scrollIntoView({
    behavior: 'smooth',
    block: 'start'
  });
}); // タブ

jQuery(function ($) {
  $('.tab').click(function () {
    $('.is-active').removeClass('is-active');
    $(this).addClass('is-active');
    $('.is-show').removeClass('is-show');
    const index = $(this).index();
    $('.panel').eq(index).addClass('is-show');
  });
}); // headerのshadow

$(window).scroll(function () {
  if ($(window).scrollTop() > 714) {
    $('#header').addClass('add-shadow');
  } else {
    $('#header').removeClass('add-shadow');
  }
}); // スクロール値算出

$(function () {
  $(window).scroll(function () {
    var scroll = $(this).scrollTop();
    console.log(scroll);
  });
}); // fade

$(function () {
  $(window).scroll(function () {
    const wHeight = $(window).height();
    const scrollAmount = $(window).scrollTop();
    $('.fadeItem').each(function () {
      const targetPosition = $(this).offset().top;

      if (scrollAmount > targetPosition - wHeight + 60) {
        $(this).addClass("fadeInDown");
      }
    });
  });
}); // スライダー

$(function () {
  $('.slider').slick({
    infinite: false,
    dots: true,
    slidesToShow: 3,
    slidesToScroll: 3,
    arrows: true,
    responsive: [//   {
    //      breakpoint: 768,
    //           settings: {
    //                slidesToShow: 3,
    //                slidesToScroll: 3,
    //      }
    // },
    {
      breakpoint: 767,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }]
  });
}); // モーダル

$(function () {
  $('.js-modal-open').each(function () {
    $(this).on('click', function () {
      var target = $(this).data('target');
      var modal = document.getElementById(target);
      $(modal).fadeIn();
      return false;
    });
  });
  $('.js-modal-close').on('click', function () {
    $('.js-modal').fadeOut();
    return false;
  });
}); // モーダル開閉時の背景固定非固定
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

$(function () {
  var slider = $('.slick02').slick({
    infinite: false
  });
  $('.js-modal-open').click(function () {
    slider.css('opacity', 0);
    slider.animate({
      'z-index': 1
    }, 50, function () {
      slider.slick('setPosition');
      slider.animate({
        'opacity': 1
      });
    });
  });
}); // カーソル

$(window).mousemove(function (e) {
  $('.cursor span').css({
    left: e.pageX,
    top: e.pageY
  });
});
$('a').on('mouseenter', function () {
  $('.cursor span').addClass('active');
});
$('a').on('mouseleave', function () {
  $('.cursor span').removeClass('active');
}); // 背景色変更

window.addEventListener("scroll", function () {
  let scroll = window.pageYOffset;
  var works = document.getElementById('works');

  if (scroll > 2450) {
    works.style.backgroundColor = '#fff';
  } else if (scroll > 2100) {
    works.style.backgroundColor = '#f6f6f6';
  } else if (scroll > 1800) {
    works.style.backgroundColor = '#e9e9e9';
  } else if (scroll > 1500) {
    works.style.backgroundColor = '#c2c2c2';
  } else if (scroll > 1200) {
    works.style.backgroundColor = '#aaaaaa';
  } else if (scroll > 1000) {
    works.style.backgroundColor = '#797979';
  } else {
    works.style.backgroundColor = '#797979';
  }
});

},{"./modules/loading":2,"./modules/scroll":4}],2:[function(require,module,exports){
const preventScroll = require("./preventScroll");

const loading = () => {
  const load = document.getElementById("loading");
  const content = document.getElementById("container");
  window.scrollTo(0, 0);
  preventScroll.enable();
  window.addEventListener("load", function () {
    this.setTimeout(() => {
      content.classList.add("active");
      load.classList.add("done");
      preventScroll.disable();
    }, 500);
    this.setTimeout(() => {
      preventScroll.disable();
    }, 1500);
  });
};

module.exports = loading;

},{"./preventScroll":3}],3:[function(require,module,exports){
const preventScroll = {
  x: 0,
  y: 0,

  setPos(x = window.pageXOffset, y = window.pageYOffset) {
    this.x = x;
    this.y = y;
  },

  handleEvent() {
    window.scrollTo(this.x, this.y);
  },

  enable() {
    this.setPos();
    window.addEventListener("scroll", this);
  },

  disable() {
    window.removeEventListener("scroll", this);
  }

};
module.exports = preventScroll;

},{}],4:[function(require,module,exports){
/**
 * スクロール処理間引き
 * @param {function} func 処理
 * @param {number} wait 間引き時間
 */
function throttle(func, wait = 300) {
  let timer = null;
  return function (...args) {
    if (timer === null) {
      timer = setTimeout(() => {
        func.apply(this, args);
        timer = null;
      }, wait);
    }
  };
}
/**
 * アクティブクラス付与
 * @param {HTMLElement} e フェードイン対象エレメント
 */


const toggle = e => {
  const id = e.id ? e.id : null;

  if (!id) {
    return;
  }

  const target = document.getElementById(id);
  const rect = target.getBoundingClientRect();

  if (rect.top < 250) {
    target.classList.add("active");
  } else {
    target.classList.remove("active");
  }

  return target;
};
/**
 * スクロールイベント
 * @param {string} className アニメーションさせる要素に付与するクラス名
 */


const scroll = className => {
  const elements = document.getElementsByClassName(className);

  if (typeof elements === "undefined" || elements.length <= 0) {
    return;
  }

  const func = () => {
    for (const e of elements) {
      toggle(e);
    }
  };

  const throttled = throttle(func, 200);
  window.addEventListener("scroll", throttled);
};

module.exports = scroll;

},{}]},{},[1]);
