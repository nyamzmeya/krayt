let $ = require("jquery");

var Flickity = require("flickity");
var jQueryBridget = require("jquery-bridget");
require("flickity-fade");

jQueryBridget("flickity", Flickity, $);

$(".intro__slider").flickity({
  prevNextButtons: false,
  imagesLoaded: true,
});

let spaces_slider = $(".spaces__slider").flickity({
  cellAlign: "center",
  resize: true,
  adaptiveHeight: true,
  imagesLoaded: true,
  wrapAround: true,
  pageDots: false,
  prevNextButtons: false,
  on: {
    ready: function () {
      $(".spaces__slider").find(".is-selected")[0].classList.add("center");
    },
    change: function (index) {
      $(".center")[0].classList.remove("center");

      $(".spaces__slider").find(".is-selected")[0].classList.add("center");

      let data = spaces_slider.data("flickity");
      $(".spaces__progress").val(data.selectedIndex + 1);
      $(".current__slide").text("0" + (data.selectedIndex + 1) + " /");
    },
  },
});

$(".spaces__slider_prev").on("click", function () {
  spaces_slider.flickity("previous");
});

$(".spaces__slider_next").on("click", function () {
  spaces_slider.flickity("next");
});

$(".facilities__slider").flickity({
  pageDots: false,
  prevNextButtons: false,
  setGallerySize: false,
  imagesLoaded: true,
  adaptiveHeight: true,
});

$(".facilities__main__buttons").on("click", function (e) {
  e.target.dataset.index
    ? $(".facilities__slider").flickity("select", e.target.dataset.index)
    : null;
});

let gallery_slider = $(".gallery__slider").flickity({
  wrapAround: true,
  resize: true,
  imagesLoaded: true,
  pageDots: false,
  prevNextButtons: false,
  setGallerySize: false,
  draggable: false,
  contain: true,
  on: {
    change: function () {
      gallery_slider.flickity("reposition");
      if ($(window).width() <= 425) {
        setWidth(
          $(".gallery__slider"),
          $(".gallery__slider").find(".is-selected").find("img")
        );
      }
    },
  },
});

$(".gallery__slider_prev").on("click", function () {
  gallery_slider.flickity("previous");
});

$(".gallery__slider_next").on("click", function () {
  gallery_slider.flickity("next");
});

let reviews_slider = $(".reviews__slider").flickity({
  cellAlign: "center",
  wrapAround: true,
  pageDots: false,
  prevNextButtons: false,
  contain: true,
  on: {
    ready: function () {
      let px = ($(window).width() - $(".wrapper").width()) / 2;
      $(".reviews__slider").css("transform", `translateX(${px}px)`);
    },
    change: function () {
      let data = reviews_slider.data("flickity");
      $(".reviews__progress").val(data.selectedIndex + 1);
    },
  },
});

$(".reviews__slider_prev").on("click", function () {
  reviews_slider.flickity("previous");
});

$(".reviews__slider_next").on("click", function () {
  reviews_slider.flickity("next");
});

$(".burger").on("click", function () {
  $("body")[0].classList.toggle("stop-scrolling");
  $(".burger")[0].classList.toggle("burger_show");
  $(".menu")[0].classList.toggle("menu_show");
});

$(".menu").on("click", function (e) {
  if (e.target.tagName == "A" || e.target == menu) {
    $("body")[0].classList.toggle("stop-scrolling");
    $(".burger")[0].classList.toggle("burger_show");
    $(".menu")[0].classList.toggle("menu_show");
  }
});

function setHeight(ab, target) {
  let heightImage;
  if (target[0].complete || target[0].readyState === 4) {
    heightImage = target.height();
    ab.height(heightImage);
  } else {
    target.on("load", function () {
      heightImage = $(this).height();
      ab.height(heightImage);
    });
  }
}

function setWidth(ab, target) {
  let widthImage;
  if (target[0].complete || target[0].readyState === 4) {
    widthImage = target.width();
    ab.width(widthImage);
  } else {
    target.on("load", function () {
      widthImage = $(this).width();
      ab.width(widthImage);
    });
  }
}

if ($(window).width() <= 768) {
  setHeight($(".facilities__slider"), $(".facilities__slider_img"));
}

$(window).resize(function () {
  if ($(window).width() <= 768) {
    setHeight($(".facilities__slider"), $(".facilities__slider_img"));
  }
});

if ($(window).width() <= 425) {
  setWidth(
    $(".gallery__slider"),
    $(".gallery__slider").find(".is-selected").find("img")
  );
}

$(window).resize(function () {
  if ($(window).width() <= 425) {
    setWidth(
      $(".gallery__slider"),
      $(".gallery__slider").find(".is-selected").find("img")
    );
  }
});
