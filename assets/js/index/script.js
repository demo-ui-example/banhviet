import { preloadImages } from "../../libs/utils.js";
("use strict");
$ = jQuery;
// setup lenis
const lenis = new Lenis();
lenis.on("scroll", ScrollTrigger.update);
gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);
// end lenis

function introProducts() {
  if ($(".intro-products").length < 1) return;

  new Swiper(".products-swiper", {
    slidesPerView: 5,
    spaceBetween: 30,
    loop: false,
    speed: 800,
    navigation: {
      nextEl: ".products-swiper .arrow-next",
      prevEl: ".products-swiper .arrow-prev"
    },
    breakpoints: {
      0: {
        slidesPerView: 3,
        spaceBetween: 20
      },
      768: {
        slidesPerView: 5,
        spaceBetween: 30
      }
    }
  });
}

function featuredProduct() {
  if ($(".product-featured").length < 1) return;

  new Swiper(".product-featured-swiper", {
    slidesPerView: 1.5,
    spaceBetween: 30,
    loop: false,
    speed: 800,
    pagination: {
      el: ".swiper-pagination",
      type: "progressbar"
    },
    centeredSlides: true
  });
}

function categoryProducts() {
  if ($(".product-category").length < 1) return;

  new Swiper(".product-category-swiper", {
    slidesPerView: 3.3,
    spaceBetween: 30,
    loop: false,
    speed: 800,
    navigation: {
      nextEl: ".product-category .arrow-next",
      prevEl: ".product-category .arrow-prev"
    }
  });
}

function banner() {
  if ($(".banner-swiper").length < 1) return;

  new Swiper(".banner-swiper", {
    slidesPerView: 1,
    loop: false,
    type: "fade",
    speed: 800,
    pagination: {
      el: ".banner-swiper .swiper-pagination"
    },
    centeredSlides: true
  });
}

function scrollToTop() {
  $(".back-to-top").on("click", function (e) {
    e.preventDefault();
    lenis.scrollTo(0, { offset: 0, duration: 0.8, easing: (t) => t });
  });
}

const init = () => {
  gsap.registerPlugin(ScrollTrigger);
  banner();
  introProducts();
  featuredProduct();
  categoryProducts();
  scrollToTop();
};
preloadImages("img").then(() => {
  // Once images are preloaded, remove the 'loading' indicator/class from the body

  init();
});

// loadpage
let isLinkClicked = false;
$("a").on("click", function (e) {
  // Nếu liên kết dẫn đến trang khác (không phải hash link hoặc javascript void)
  if (this.href && !this.href.match(/^#/) && !this.href.match(/^javascript:/)) {
    isLinkClicked = true;
    console.log("1");
  }
});

$(window).on("beforeunload", function () {
  if (!isLinkClicked) {
    $(window).scrollTop(0);
  }
  isLinkClicked = false;
});
