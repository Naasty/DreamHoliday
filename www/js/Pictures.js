//https://developers.google.com/image-search/v1/devguide

google.load("search", "1");

var map;
var imageSearch;

function initialize()
{
  document.addEventListener("deviceready", onDeviceReady, false);
	var title = window.sessionStorage.getItem("place");
  var site = window.sessionStorage.getItem("site");

	$('#header').html(title);
  if(site!=null)
  {
     $('#site').attr('href',site);
     $('#site').html("Book your accomodation");
   }
   showMap();
	//placeSearch(title);
	imageSearch(title);
  
}

function onDeviceReady()
{
  facebookConnectPlugin.login(["public_profile"],
    fbLoginSuccess,
    function (error) { alert("" + error) }
);
var fbLoginSuccess = function (userData) {
    alert("UserInfo: " + JSON.stringify(userData));
    facebookConnectPlugin.getLoginStatus(
        function (status) {
            alert("current status: " + JSON.stringify(status));

            var options = { method:"feed" };
            facebookConnectPlugin.showDialog(options,
                function (result) {
                    alert("Posted. " + JSON.stringify(result));             },
            function (e) {
                alert("Failed: " + e);
            });
        }
    );
};
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

function updateStatusCallback(status){
   alert('Status updated!!');
   // Your logic here
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
       	  //var imgContainer = document.createElement('div');
       	   var newImg = document.createElement('img');
       	    newImg.src=result.unescapedUrl;
            newImg.width=300;
            newImg.height=200;
            contentDiv.appendChild(newImg);
         
            // Put our title + image in the content
            //contentDiv.appendChild(imgContainer);
          }
     }

}
google.maps.event.addDomListener(window, "load", initialize);

