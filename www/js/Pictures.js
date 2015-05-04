//https://developers.google.com/image-search/v1/devguide

google.load("search", "1");

var map;
var imageSearch;

function initialize()
{
  $.ajaxSetup({ cache: true });
  $.getScript('//connect.facebook.net/en_US/sdk.js', function(){
    FB.init({
      appId: '{your-app-id}',
      version: 'v2.3' // or v2.0, v2.1, v2.0
    });     
    $('#loginbutton,#feedbutton').removeAttr('disabled');
    FB.getLoginStatus(updateStatusCallback);
  });
	var title = window.sessionStorage.getItem("place");
  var site = window.sessionStorage.getItem("site");
	$('#header').html(title);
  if(site!="")
  {
     $('#site').attr('href',site);
     $('#site').html("Book your accomodation");
   }
   showMap();
	//placeSearch(title);
	imageSearch(title);
  
}

function showMap()
{
  var pos =JSON.parse(window.sessionStorage.getItem("position"));
  var mapCenter = new google.maps.LatLng(pos.lat,pos.lng);


  map = new google.maps.Map(document.getElementById('map-canvas'), {
      center: mapCenter,
      zoom: 14
    });

  var marker = new google.maps.Marker({
      position: mapCenter,
      map: map,
  });
}

function imageSearch(place)
{
     
     imageSearch = new google.search.ImageSearch();
     imageSearch.setSearchCompleteCallback(this, imageSearchComplete, null);
     imageSearch.execute(place);
     google.search.Search.getBranding('branding');
}

function imageSearchComplete()
{
	if (imageSearch.results && imageSearch.results.length > 0) {
	   var contentDiv = document.getElementById('content');
	   var results = imageSearch.results;
       for (var i = 0; i < 4; i++) {
       	  var result = results[i];
       	  var imgContainer = document.createElement('div');
       	   var newImg = document.createElement('img');
       	    newImg.src=result.unescapedUrl;
            newImg.width=300;
            newImg.height=200;
            imgContainer.appendChild(newImg);
         
            // Put our title + image in the content
            contentDiv.appendChild(imgContainer);
          }
     }

}
google.maps.event.addDomListener(window, "load", initialize);

