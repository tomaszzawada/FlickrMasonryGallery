$(document).ready(function() {
  scrollSection();
  rwdMenu();
  flickr();
  initializeMap();
});

$(window).on("load", function() {
  $(".preloader").fadeOut("slow");
});

// fixed nav on scroll
$(window).scroll(function() {
  if ($(window).scrollTop() >= 100) {
    $("nav").addClass("nav-scroll");
  } else {
    $("nav").removeClass("nav-scroll");
  }
});

// scroll animate
function scrollSection() {
  $(".scrollSection a").click(function(e) {
    e.preventDefault();
    var $anchor = $(this);
    $("html, body")
      .stop()
      .animate(
        {
          scrollTop: $($anchor.attr("href")).offset().top + -55
        },
        1300,
        "easeInOutExpo"
      );
  });
}

function rwdMenu() {
  $(".rwd-icon a").click(function(e) {
    e.preventDefault();
    $(".main-nav").slideToggle();
    $(".main-nav a").click(function() {
      $(".main-nav").slideUp();
    });
  });
}

// Google Maps
function initializeMap() {
  var isDraggable = $(document).width() > 480 ? true : false;

  var officeCenter = new google.maps.LatLng(52.4064, 16.9252);
  var mapOpt = {
    center: officeCenter,
    zoom: 16,
    draggable: isDraggable,
    panControl: false,
    zoomControl: true,
    mapTypeControl: false,
    streetViewControl: false,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    scrollwheel: false
  };
  var map = new google.maps.Map(document.getElementById("gmap"), mapOpt);
  var marker = new google.maps.Marker({
    position: officeCenter,
    map: map,
    visible: true
  });
}

function flickr() {
  function msnry() {
    $(".grid").imagesLoaded(function() {
      $(".grid-container").fadeIn(300);
      $(".grid").masonry({
        percentPosition: true,
        itemSelector: ".grid-item",
        columnWidth: ".grid-sizer",
        gutter: 0
      });
    });
  }

  var flickrApi =
    "https://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key=2735393641e562c24c6d93b8a28805de&photoset_id=72157670372987373&user_id=27905743@N05&jsoncallback=?";
  var flickrOptions = {
    format: "json",
    extras: "tags",
    per_page: 12,
    page: 1
  };

  function addPhotos(data) {
    var figureHTML = '<div class="grid"><div class="grid-sizer"></div>';
    $.each(data.photoset.photo, function(i, item) {
      figureHTML += '<figure class="grid-item">';
      figureHTML +=
        '<img src="https://farm' +
        item.farm +
        ".staticflickr.com/" +
        item.server +
        "/" +
        item.id +
        "_" +
        item.secret +
        '_z.jpg" /></figure>';
    });
    figureHTML += "</div>";
    $(".grid-container")
      .html(figureHTML)
      .hide();

    msnry();
  }

  $.getJSON(flickrApi, flickrOptions, addPhotos);

  var flickrApiTags =
    "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=2735393641e562c24c6d93b8a28805de&user_id=27905743@N05&jsoncallback=?";

  function addPhotosTags(data) {
    var figureHTML = '<div class="grid"><div class="grid-sizer"></div>';
    $.each(data.photos.photo, function(i, item) {
      figureHTML += '<figure class="grid-item">';
      figureHTML +=
        '<img src="https://farm' +
        item.farm +
        ".staticflickr.com/" +
        item.server +
        "/" +
        item.id +
        "_" +
        item.secret +
        '_z.jpg" /></figure>';
    });
    figureHTML += "</div>";
    $(".grid-container")
      .html(figureHTML)
      .hide();

    msnry();
  }

  $("button").click(function() {
    $("button").removeClass("selected");
    $(this).addClass("selected");

    var btnText = $(this).text();

    if (btnText === "sea") {
      $(".grid").fadeOut(600, function() {});

      $.getJSON(flickrApiTags, { format: "json", tags: "sea" }, addPhotosTags);
    } else if (btnText === "lake") {
      $(".grid").fadeOut(600, function() {});

      $.getJSON(flickrApiTags, { format: "json", tags: "lake" }, addPhotosTags);
    } else {
      $(".grid").fadeOut(600, function() {});
      $.getJSON(flickrApi, flickrOptions, addPhotos);
    }
  });
}