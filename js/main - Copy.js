$(document).ready(function(){
	setSection();
	flickr();
	initializeMap();
});

// fixed nav on scroll
$(window).scroll(function() {
  if ($(window).scrollTop() >= 100) {
    $("nav").addClass("nav-scroll");
  } else {
    $("nav").removeClass("nav-scroll");
  }
});

// slide to section function
function setSection() {
	$(".main-nav a").click(function(e){
		e.preventDefault();
		var sectionID = e.currentTarget.id + "Section";

		$("html, body").animate({
			scrollTop: $("#" + sectionID).offset().top +(-55)
		}, 1000)
	})
}

// Google Maps
function initializeMap() {
	var isDraggable = $(document).width() > 480 ? true : false;

	var officeCenter= new google.maps.LatLng(52.4064, 16.9252);
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
	var map= new google.maps.Map(document.getElementById("gmap"),mapOpt);
	var marker = new google.maps.Marker({
		position: officeCenter,
		map: map,
		visible: true
	});
};


function flickr() {

	function msnry(){
		$('.grid').imagesLoaded(function(){
			$('.grid-container').fadeIn(300);
				$('.grid').masonry({
					percentPosition: true,
					itemSelector : '.grid-item',
					columnWidth	: '.grid-sizer',
					gutter: 0
				});
		});
	}

	var flickrApi = "https://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key=2735393641e562c24c6d93b8a28805de&photoset_id=72157670372987373&user_id=27905743@N05&jsoncallback=?";
	var flickrOptions = {
		format : "json",
		extras : "tags",
		per_page : 12,
		page : 1
	}


	function addPhotos(data){
		var figureHTML = '<div class="grid"><div class="grid-sizer"></div>';
		$.each(data.photoset.photo, function(i, item){
			figureHTML += '<figure class="grid-item" data-photo-tag="'+ item.tags + '">';
			figureHTML += '<img src="https://farm' + item.farm + '.staticflickr.com/' + item.server + '/' + item.id + '_' + item.secret + '_b.jpg" /></figure>';
		});
		figureHTML += '</div>';
		$(".grid-container").html(figureHTML).hide();
		
			msnry();
	}

	$.getJSON(flickrApi, flickrOptions, addPhotos);


	var flickrApiTags = "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=2735393641e562c24c6d93b8a28805de&user_id=27905743@N05&jsoncallback=?";
	
	function addPhotosTags(data){
		var figureHTML = '<div class="grid"><div class="grid-sizer"></div>';
		$.each(data.photos.photo, function(i, item){
			figureHTML += '<figure class="grid-item" data-photo-tag="'+ btnText + '">';
			figureHTML += '<img src="https://farm' + item.farm + '.staticflickr.com/' + item.server + '/' + item.id + '_' + item.secret + '_b.jpg" /></figure>';
		});
		figureHTML += '</div>';
		$(".grid-container").html(figureHTML).hide();

			msnry();
	}

	$("button").click(function(){
		$("button").removeClass("selected");
		$(this).addClass("selected");

		btnText = $(this).text();

		if (btnText==="sea") {
			$('.grid').fadeOut(600, function(){
			});

			$.getJSON(flickrApiTags, {format : "json", tags : "sea"}, addPhotosTags);

		} else if (btnText==="lake") {
			$('.grid').fadeOut(600, function(){
			});

			$.getJSON(flickrApiTags, {format : "json", tags : "lake"}, addPhotosTags);

		} else {
			$('.grid').fadeOut(600, function(){
			});
			$.getJSON(flickrApi, flickrOptions, addPhotos);
		}
	});
}

// Flickr Gallery
// function flickr() {
// 	$("button").click(function(){
// 		$("button").removeClass("selected");
// 		$(this).addClass("selected");

// 		var flickrApi = "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=2735393641e562c24c6d93b8a28805de&user_id=27905743@N05&jsoncallback=?";

// 		var btnText = $(this).text();

// 		if(btnText === "All") {
// 			var photoCategory = "sea, lake";
// 		} else {
// 			var photoCategory = btnText;
// 		}

// 		var flickrOptions = {
// 			tags: photoCategory,
// 			format: "json"
// 		};

// 		function addPhotos(data) {
// 			var figureHTML = '';
// 			$.each(data.photos.photo, function(i, item){
// 				figureHTML += '<figure class="grid-item">';
// 				figureHTML += '<img src="https://farm' + item.farm + '.staticflickr.com/' + item.server + '/' + item.id + '_' + item.secret + '_b.jpg" /></figure>';
// 			});
// 			$(".grid").html(figureHTML);

// 			$('.grid').imagesLoaded(function(){
// 				$('.grid').masonry();
// 			});	
// 		};

// 		$.getJSON(flickrApi, flickrOptions, addPhotos);
// 	});

// };

/* AIzaSyBstbWyM3a73-zj_89Dqflwosku7IPuU2s
 AIzaSyB1qBowHtQNQ24fZ3p2q2hSFZy959smZ00
 */

 // flickr api 2735393641e562c24c6d93b8a28805de
 // Your user ID:
// 27905743@N05
// https://api.flickr.com/services/rest/?method=flickr.people.getPublicPhotos&api_key=2735393641e562c24c6d93b8a28805de&user_id=27905743@N05&format=json&jsoncallback=?
// https://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key=2735393641e562c24c6d93b8a28805de&photoset_id=72157670372987373&user_id=27905743@N05&extras=tags&format=json&jsoncallback=?

// https://farm9.staticflickr.com/8368/29509882836_d4c966c895.jpg

// https://farm{farm-id}.staticflickr.com/{server-id}/{id}_{secret}.jpg
// https://farm9.staticflickr.com/8141/29544024075_2edc5eed24.jpg

// photoset_id 72157670372987373