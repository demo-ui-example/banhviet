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
    slidesPerView: 2.5,
    spaceBetween: 30,
    loop: true,
    speed: 800,
    pagination: {
      el: ".product-featured-swiper .swiper-pagination"
    },
    autoplay: {
      delay: 3000,
      disableOnInteraction: false
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
    autoplay: {
      delay: 3000,
      disableOnInteraction: false
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
      slidesPerView: "auto",
      freeMode: true,
      watchSlidesProgress: true,
      centeredSlides: false,
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

    variantButtonProduct.removeClass("active");
    $(
      `.product-detail .variant-item[data-variant="${dataThisVariant}"`
    ).addClass("active");

    // galleryProduct.removeClass("show");
    // $(`.product-detail .gallery[data-variant="${dataThisVariant}"`).addClass(
    //   "show"
    // );
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

function getNewletter() {
  $("#form-newletter").on("submit", function (e) {
    e.preventDefault();

    const thisForm = $(this);
    const emailField = thisForm.find("input[type='email']");

    emailField.removeClass("error");
    thisForm.siblings("span").remove();

    if (!emailField.length) {
      console.error("Không tìm thấy input email trong form.");
      return;
    }

    const email = emailField.val() ? emailField.val().trim() : "";

    if (!email) {
      emailField.addClass("error");
      return;
    }

    $.ajax({
      type: "POST",
      url: ajaxUrl,
      data: {
        action: "vias_receive_newletter",
        email: email
      },
      beforeSend: function () {
        console.log("Đang gửi dữ liệu...");
      },
      success: function (res) {
        thisForm[0].reset();
        thisForm.addClass("d-none");
        thisForm.after(
          '<span class="contact-message b3-font d-block color-white" style=" max-width: 235px; margin-top: 16px;">We have received your information, thank you for registering.</span>'
        );

        setTimeout(() => {
          thisForm.siblings(".contact-message").remove();
          thisForm.removeClass("d-none");
        }, 5000);
      },
      error: function (xhr, status, error) {
        console.error("Lỗi khi gửi form:", error);
        alert("Có lỗi xảy ra, vui lòng thử lại sau.");
      }
    });
  });
}

function searchForm() {
  $(".header-cta__search--icon").on("click", function (e) {
    e.stopPropagation();
    $(this).toggleClass("open");
    $(".header-cta__search--form").toggleClass("open");
  });

  $(".header-cta__search--form").on("click", function (e) {
    e.stopPropagation();
  });

  $(document).on("click", function () {
    $(".header-cta__search--form, .header-cta__search--icon").removeClass(
      "open"
    );
  });
}

function marquee() {
  document.querySelectorAll(".marquee-container").forEach((container) => {
    const content = container.querySelector(".marquee-content");
    const items = [...container.querySelectorAll(".marquee-item")];
    const speed = parseFloat(container.getAttribute("data-speed")) || 50;

    content.innerHTML = "";
    items.forEach((item) => content.appendChild(item.cloneNode(true)));

    const clonedItems = [...content.children];
    let totalWidth = 0;

    clonedItems.forEach((item) => (totalWidth += item.offsetWidth));

    const containerWidth = container.offsetWidth;
    const copiesNeeded = Math.ceil(containerWidth / totalWidth) + 2;

    for (let i = 0; i < copiesNeeded; i++) {
      clonedItems.forEach((item) => {
        content.appendChild(item.cloneNode(true));
      });
    }

    let fullWidth = 0;
    [...content.children].forEach((item) => (fullWidth += item.offsetWidth));

    gsap.set(content, {
      x: 0,
      willChange: "transform",
      force3D: true
    });

    const tl = gsap.timeline({ repeat: -1 });
    tl.to(content, {
      x: -fullWidth,
      duration: fullWidth / speed,
      ease: "none",
      modifiers: {
        x: (x) => `${parseFloat(x) % fullWidth}px`
      }
    });

    // Hover pause
    const pause = parseFloat(container.getAttribute("hover-pause")) || false;
    if (pause) {
      container.addEventListener("mouseenter", () => tl.pause());
      container.addEventListener("mouseleave", () => tl.resume());
    }
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
  searchForm();
  marquee();
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
