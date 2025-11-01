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
    spaceBetween: 24,
    loop: true,
    speed: 600,
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
      el: ".product-featured-swiper .swiper-pagination"
    },
    centeredSlides: true
  });
}

function categoryProducts() {
  if ($(".product-category").length < 1) return;

  new Swiper(".product-category-swiper", {
    slidesPerView: 3.3,
    spaceBetween: 10,
    loop: false,
    speed: 800,
    navigation: {
      nextEl: ".product-category .arrow-next",
      prevEl: ".product-category .arrow-prev"
    },
    slidesOffsetBefore: 100,
    breakpoints: {
      0: {
        slidesPerView: 3,
        spaceBetween: 10
      },
      768: {
        slidesPerView: 4.5,
        spaceBetween: 10
      }
    }
  });
}

function banner() {
  if ($(".banner-swiper").length < 1) return;

  new Swiper(".banner-swiper", {
    slidesPerView: 1,
    loop: false,
    effect: "fade",
    loop: true,
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

function productDetail() {
  if ($(".product-detail").length < 1) return;

  document.querySelectorAll(".gallery").forEach((container) => {
    const thumbs = container.querySelector(".mySwiper");
    const main = container.querySelector(".mySwiper2");

    // Slider thumbnail
    const swiperThumbs = new Swiper(thumbs, {
      loop: true,
      spaceBetween: 10,
      slidesPerView: 3,
      freeMode: true,
      watchSlidesProgress: true,
      centeredSlides: true,
      slideToClickedSlide: true
    });

    // Slider main
    const swiperMain = new Swiper(main, {
      loop: true,
      spaceBetween: 10,
      navigation: {
        nextEl: container.querySelector(".swiper-button-next"),
        prevEl: container.querySelector(".swiper-button-prev")
      },
      thumbs: {
        swiper: swiperThumbs
      }
    });
  });

  const galleryProduct = $(".product-detail .gallery");
  const variantButtonProduct = $(".product-detail .variant-item");
  variantButtonProduct.on("click", function (e) {
    e.preventDefault();

    const thisVariant = $(this);
    const dataThisVariant = thisVariant.data("variant");
    galleryProduct.removeClass("show");
    $(`.product-detail .gallery[data-variant="${dataThisVariant}"`).addClass(
      "show"
    );
  });
}

function animation() {
  gsap.utils
    .toArray(".data-fade-in, .data-fade-in-auto, data-fade-list")
    .forEach((element) => {
      const isMobile = window.innerWidth < 768;
      const disableMobile = element.hasAttribute("data-disable-mobile");
      if (disableMobile) return;

      let posOffset = element.getAttribute("data-offset") || "70%";
      let delay = parseFloat(element.getAttribute("data-delay")) || 0;
      let duration = parseFloat(element.getAttribute("data-duration")) || 1;

      if (element.classList.contains("data-fade-in-auto")) {
        gsap.fromTo(
          element,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            delay: delay,
            duration: duration,
            ease: "power1.out"
          }
        );
        return;
      }

      if (element.classList.contains("data-fade-list")) {
        const items = element.querySelectorAll(".data-fade-list-item");
        if (!items.length) return;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: element,
            start: `top ${posOffset}`,
            end: `bottom ${posOffset}`,
            // markers: true,
            once: true // chỉ chạy 1 lần
          }
        });

        items.forEach((item, i) => {
          tl.fromTo(
            item,
            { opacity: 0, y: 20 },
            {
              opacity: 1,
              y: 0,
              duration: duration,
              ease: "power1.out"
            },
            delay + i * 0.2
          );
        });

        return;
      }

      gsap.fromTo(
        element,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          delay: delay,
          duration: duration,
          ease: "power1.out",
          scrollTrigger: {
            trigger: element,
            start: `top ${posOffset}`,
            end: `bottom ${posOffset}`
            // toggleActions: "play none none reverse"
            // markers: true
          }
        }
      );
    });
}

const init = () => {
  gsap.registerPlugin(ScrollTrigger);
  banner();
  introProducts();
  featuredProduct();
  categoryProducts();
  scrollToTop();
  productDetail();
  animation();
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
