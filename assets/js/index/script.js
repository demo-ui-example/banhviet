import { preloadImages } from "../../libs/utils.js";
("use strict");
$ = jQuery;
// setup lenis
// const lenis = new Lenis();
// lenis.on("scroll", ScrollTrigger.update);
// gsap.ticker.add((time) => {
//   lenis.raf(time * 1000);
// });

// gsap.ticker.lagSmoothing(0);
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
        slidesPerView: 1,
        spaceBetween: 20
      },
      767: {
        slidesPerView: 1,
        spaceBetween: 20
      },
      991: {
        slidesPerView: 5,
        spaceBetween: 150
      },
      1600: {
        slidesPerView: 6,
        spaceBetween: 150
      }
    }
  });
}

function featuredProduct() {
  if ($(".product-featured").length < 1) return;

  const swiperFeatured = new Swiper(".product-featured-swiper", {
    slidesPerView: 1.5,
    spaceBetween: 30,
    loop: true,
    speed: 800,
    pagination: {
      el: ".product-featured-swiper .swiper-pagination"
    },
    autoplay: false, // Tắt autoplay lúc đầu
    centeredSlides: true,
    breakpoints: {
      0: {
        slidesPerView: 1.2,
        spaceBetween: 20
      },
      992: {
        slidesPerView: 1.5,
        spaceBetween: 30
      }
    }
  });

  // Sau 5s mới bắt đầu autoplay mỗi 3s
  setTimeout(() => {
    swiperFeatured.params.autoplay = {
      delay: 3000,
      disableOnInteraction: false
    };
    swiperFeatured.autoplay.start();
  }, 5000);
}

function categoryProducts() {
  if ($(".product-category").length < 1) return;

  document.querySelectorAll(".product-category-swiper").forEach((swiperEl) => {
    const parent = swiperEl.closest(".product-category");

    new Swiper(swiperEl, {
      slidesPerView: 3.2,
      spaceBetween: 10,
      loop: true,
      speed: 800,
      pagination: {
        el: parent.querySelector(".swiper-pagination")
      },
      navigation: {
        nextEl: parent.querySelector(".arrow-next"),
        prevEl: parent.querySelector(".arrow-prev")
      },
      autoplay: {
        delay: 3000,
        disableOnInteraction: false
      },
      // slidesOffsetBefore: 100,
      breakpoints: {
        0: {
          slidesPerView: 1.2,
          spaceBetween: 20
          // slidesOffsetBefore: 20
        },
        768: {
          slidesPerView: 3.2
          // spaceBetween: 10
        }
      }
    });
  });
}

function banner() {
  if ($(".banner-swiper").length < 1) return;

  new Swiper(".banner-swiper", {
    slidesPerView: 1,
    loop: true,
    effect: "fade",
    loop: true,
    speed: 800,
    pagination: {
      el: ".banner-swiper .swiper-pagination"
    },
    centeredSlides: true,
    autoplay: {
      delay: 6000,
      disableOnInteraction: false
    }
  });
}

function scrollToTop() {
  $(".back-to-top").on("click", function (e) {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
}

function productDetail() {
  if ($(".product-detail").length < 1) return;

  document.querySelectorAll(".gallery-item").forEach((container) => {
    const thumbs = container.querySelector(".mySwiper");
    const main = container.querySelector(".mySwiper2");

    // Slider thumbnail
    const swiperThumbs = new Swiper(thumbs, {
      loop: true,
      spaceBetween: 10,
      slidesPerView: 3,
      freeMode: true,
      watchSlidesProgress: true,
      centeredSlides: false,
      slideToClickedSlide: true,
      breakpoints: {
        0: {
          slidesPerView: "auto"
        },
        991: {
          slidesPerView: 3
        }
      }
    });

    // Slider main
    const swiperMain = new Swiper(main, {
      loop: true,
      spaceBetween: 10,
      effect: "fade",
      navigation: {
        nextEl: container.querySelector(".swiper-button-next"),
        prevEl: container.querySelector(".swiper-button-prev")
      },
      thumbs: {
        swiper: swiperThumbs
      }
    });
  });

  const galleryProduct = $(".product-detail .gallery-item");
  const variantButtonProduct = $(".product-detail .variant-item");
  variantButtonProduct.on("click", function (e) {
    e.preventDefault();

    const thisVariant = $(this);
    const dataThisVariant = thisVariant.data("variant");

    variantButtonProduct.removeClass("active");
    $(
      `.product-detail .variant-item[data-variant="${dataThisVariant}"`
    ).addClass("active");

    galleryProduct.removeClass("show");
    $(
      `.product-detail .gallery-item[data-variant="${dataThisVariant}"`
    ).addClass("show");
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

      // if (element.classList.contains("data-fade-list")) {
      //   const items = element.querySelectorAll(".data-fade-list-item");
      //   if (!items.length) return;

      //   const tl = gsap.timeline({
      //     scrollTrigger: {
      //       trigger: element,
      //       start: `top ${posOffset}`,
      //       end: `bottom ${posOffset}`,
      //       // markers: true,
      //       once: true // chỉ chạy 1 lần
      //     }
      //   });

      //   items.forEach((item, i) => {
      //     tl.fromTo(
      //       item,
      //       { opacity: 0, y: 20 },
      //       {
      //         opacity: 1,
      //         y: 0,
      //         duration: duration,
      //         ease: "power1.out"
      //       },
      //       delay + i * 0.2
      //     );
      //   });

      //   return;
      // }

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
  $("#form-newsletter").on("submit", function (e) {
    e.preventDefault();

    console.log("submit");

    const thisForm = $(this);
    const emailField = thisForm.find("input[type='email']");

    emailField.removeClass("error");

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
        action: "bv_receive_newletter",
        email: email
      },
      beforeSend: function () {
        thisForm.find("button[type='submit']").addClass("adloading");
      },
      success: function (res) {
        thisForm[0].reset();
        thisForm.find("button[type='submit']").removeClass("adloading");
        thisForm.after(
          '<span class="contact-message b1-font d-block color-white"">Thông tin của bạn đã được gửi, cảm ơn bạn đã đăng ký.</span>'
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

function header() {
  if ($(window).width() > 991) return;

  const els = $(
    ".header-hambuger, #header .header-menu, #header .header-backdrop"
  );

  $(".header-hambuger").on("click", () => {
    els.toggleClass("active");

    if (els.hasClass("active")) {
      $("body").addClass("overflow-hidden");
    } else {
      $("body").removeClass("overflow-hidden");
    }
  });

  $("#header .header-backdrop").on("click", () => {
    els.removeClass("active");
    $("body").removeClass("overflow-hidden");
  });
}

function productCol() {
  if ($(".col-images").length < 1) return;

  document.querySelectorAll(".swiper-col-images").forEach((swiperEl) => {
    const parent = swiperEl.closest(".list-item");
    let perView = 1;
    let gap = 10;

    if (parent) {
      const colClass = [...parent.classList].find((c) => c.startsWith("col--"));
      if (colClass) {
        perView = parseInt(colClass.replace("col--", "")) || 1;
      }
      if (perView == 1) {
        gap = 10;
      }
    }

    const paginationEl = swiperEl.querySelector(".swiper-pagination");

    new Swiper(swiperEl, {
      slidesPerView: perView,
      spaceBetween: 10,
      loop: true,
      speed: 800,
      pagination: paginationEl
        ? {
            el: paginationEl,
            clickable: true
          }
        : null,
      autoplay: {
        delay: 3000,
        disableOnInteraction: false
      },
      breakpoints: {
        0: {
          slidesPerView: 1,
          spaceBetween: 10
        },
        991: {
          slidesPerView: perView,
          spaceBetween: gap
        }
      }
    });
  });
}

function scrollToHashLink() {
  if (window.location.hash && window.location.hash.startsWith("#section-")) {
    window.scrollTo(0, 0);

    setTimeout(function () {
      var $target = $(window.location.hash);
      if ($target.length) {
        var isMobile = window.innerWidth <= 768;
        var offset = isMobile ? 40 : 48;
        var offsetTop = $target.offset().top - offset;

        $("html, body").animate(
          {
            scrollTop: offsetTop
          },
          600
        );
      }
    }, 500);
  }
}

function activeTab() {
  const sections = document.querySelectorAll("section[id]");
  const items = document.querySelectorAll(
    ".category-tab .category-item, .section-category .data-fade-list-item"
  );

  // Map section → link
  const sectionMap = {};
  items.forEach((a) => {
    const href = a.getAttribute("href");
    if (!href) return;

    const id = href.split("#")[1]; // get sectionID

    if (id) {
      sectionMap[id] = a; // store mapping
    }
  });

  // Intersection Observer Options
  const observerOptions = {
    root: null,
    rootMargin: "0px 0px -60% 0px", // 40% from top (giống start: "top 40%")
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        const link = sectionMap[id];
        if (!link) return;

        // remove active
        items.forEach((a) => a.classList.remove("active"));
        link.classList.add("active");
      }
    });
  }, observerOptions);

  // Observe all sections
  sections.forEach((section) => observer.observe(section));
}

function customDropdown() {
  const dropdowns = document.querySelectorAll(".dropdown-custom");

  dropdowns.forEach((dropdown) => {
    const btnDropdown = dropdown.querySelector(".dropdown-custom-btn");
    const dropdownMenu = dropdown.querySelector(".dropdown-custom-menu");
    const dropdownItems = dropdown.querySelectorAll(".dropdown-custom-item");
    const valueSelect = dropdown.querySelector(".value-select");

    // Toggle dropdown on button click
    btnDropdown.addEventListener("click", function (e) {
      e.stopPropagation();
      closeAllDropdowns(dropdown);
      dropdownMenu.classList.toggle("dropdown--active");
      btnDropdown.classList.toggle("--active");
    });

    // Close dropdown when clicking outside
    document.addEventListener("click", function () {
      closeAllDropdowns();
    });

    // Handle item selection
    dropdownItems.forEach((item) => {
      item.addEventListener("click", function (e) {
        e.stopPropagation();

        // Store current values from the button
        const currentImgEl = valueSelect.querySelector("img");
        const currentImg = currentImgEl ? currentImgEl.src : "";
        const currentText = valueSelect.querySelector("span").textContent;
        const currentHtml = valueSelect.innerHTML;

        // Store clicked item values
        const clickedHtml = item.innerHTML;

        // Update the button with clicked item values
        valueSelect.innerHTML = clickedHtml;

        const isSelectTime = currentText.trim() === "Time";

        // Update the clicked item with the previous button values
        if (!isSelectTime) {
          if (currentImg) {
            item.innerHTML = `<img src="${currentImg}" alt="" /><span>${currentText}</span>`;
          } else {
            item.innerHTML = `<span>${currentText}</span>`;
          }
        }

        closeAllDropdowns();
      });
    });

    // Close dropdown on scroll
    window.addEventListener("scroll", function () {
      if (dropdownMenu.closest(".header-lang")) {
        dropdownMenu.classList.remove("dropdown--active");
        btnDropdown.classList.remove("--active");
      }
    });
  });

  function closeAllDropdowns(exception) {
    dropdowns.forEach((dropdown) => {
      const menu = dropdown.querySelector(".dropdown-custom-menu");
      const btn = dropdown.querySelector(".dropdown-custom-btn");

      if (!exception || dropdown !== exception) {
        menu.classList.remove("dropdown--active");
        btn.classList.remove("--active");
      }
    });
  }
}

function magicCursor() {
  if (window.innerWidth < 991) return;
  var circle = document.querySelector(".magic-cursor");

  document.addEventListener("click", (e) => {
    circle.classList.add("scale-in");
    setTimeout(() => {
      circle.classList.remove("scale-in");
    }, 500);
  });
  gsap.set(circle, {
    xPercent: -50,
    yPercent: -50,
    opacity: 0
  });

  let mouseX = 0,
    mouseY = 0;

  window.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    gsap.to(circle, {
      x: mouseX,
      y: mouseY,
      opacity: 1,
      duration: 0.1
    });
  });

  document.addEventListener("mouseout", function (e) {
    if (!e.relatedTarget && !e.toElement) {
      // Chuột đã ra khỏi cửa sổ
      gsap.to(circle, {
        opacity: 0,
        duration: 0.2
      });
    }
  });

  document.addEventListener("mouseover", function () {
    gsap.to(circle, {
      opacity: 1,
      duration: 0.2
    });
  });

  const items = document.querySelectorAll(
    "[data-cursor-text],a[href], .back-to-top, button"
  );
  var cursorDot = document.querySelector(".magic-cursor .cursor");

  items.forEach((item) => {
    item.addEventListener("mouseenter", () => {
      cursorDot.classList.add("active");
    });

    item.addEventListener("mouseleave", () => {
      cursorDot.classList.remove("active");
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  if (window.innerWidth > 991) return;

  const stickyEls = document.querySelectorAll(
    ".category-tab, .section-category"
  );

  stickyEls.forEach((el) => {
    const parent = el.parentElement; // phần tử cha chứa sticky
    const elHeight = el.offsetHeight;

    window.addEventListener("scroll", () => {
      const rect = el.getBoundingClientRect();
      const parentRect = parent.getBoundingClientRect();

      // Khi sticky: top của element = 0 và bottom của parent còn > elHeight
      if (rect.top <= 0 && parentRect.bottom > elHeight) {
        el.classList.add("active");
      } else {
        el.classList.remove("active");
      }
    });
  });
});

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
  header();
  productCol();
  scrollToHashLink();
  activeTab();
  customDropdown();
  getNewletter();
  magicCursor();
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
