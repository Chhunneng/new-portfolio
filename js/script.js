$(function () {
  "use strict";

  /*=========================================================================
		Initializing stellar.js Plugin
	=========================================================================*/
  $(".section").stellar({
    horizontalScrolling: false,
  });

  $(window).on("load", function () {
    var dob = new Date('1999-01-03');
    var today = new Date();
    var age = Math.floor((today - dob) / (365.25 * 24 * 60 * 60 * 1000));
    $("#age").html(age + " Years");


	$.get("https://api.quotable.io/random?tags=famous-quotes", function(data, status){
		$("#quote").html(data.content);
		$("#author").html(data.author);
    });

    $("body").addClass("loaded");

    /*=========================================================================
			Portfolio Grid
		=========================================================================*/
    var grid = $("#portfolio-grid");
    grid.shuffle({
      itemSelector: ".item",
    });

    $("#portfolio-filters > ul > li > a").on("click", function (e) {
      e.preventDefault();
      var groupName = $(this).attr("data-group");
      $("#portfolio-filters > ul > li > a").removeClass("active");
      $(this).addClass("active");
      grid.shuffle("shuffle", groupName);
    });

    $("a.image-link").magnificPopup({
      type: "image",
      removalDelay: 300,
      mainClass: "mfp-fade",
      gallery: {
        enabled: true,
      },
    });
  });

  /*=========================================================================
		Links Navigation System
	=========================================================================*/
  $(".front-person-links > ul > li > a[data-section]").on(
    "click",
    function (e) {
      e.preventDefault();
      var section = $("#" + $(this).data("section"));

      if (section.size() != 0) {
        $("body").addClass("section-show");

        section.addClass("active");
      }
    }
  );
  $(".close-btn").on("click", function () {
    $("body").removeClass("section-show");
    $("section.active").removeClass("active");
  });

  /*=========================================================================
		Testimonials Slider
	=========================================================================*/
  $(".testimonials-slider").owlCarousel({
    singleItem: true,
  });

  /*=========================================================================
		Skill Bar's Percent Initialization from attribute data-percent
	=========================================================================*/
  $(".skill-bar").each(function () {
    var $this = $(this),
      percent = parseInt($this.data("percent"), 10);

    $this.find(".bar").css("width", percent + "%");
  });
});
