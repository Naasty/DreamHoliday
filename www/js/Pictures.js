//https://developers.google.com/image-search/v1/devguide

//Used by the image search
google.load("search", "1");

//The map
var map;

//The image search service
var imageSearch;

//The results of the search
var results;

function initialize()
{
  //Get the title(the name) and the site 
	var title = window.sessionStorage.getItem("place");
  var site = window.sessionStorage.getItem("site");

//Put the name as the header of this page
	$('#header').html(title);

  //If the site is not null (the selected place is a luxury resort)
  if(site!=null)
  {
     $('#site').attr('href',site);
     $('#site').html("Book your accommodation");
   }

   //Show the map with the position of this place
   showMap();

   //Search for image with this place
	imageSearch(title);

  //Change how want to display the pictures : vertically or horizontally
  $('#view').change(function(){
      resetView($('#view').val());
  })
}

//Reset the view based on type
function resetView(type)
{
  //If we want to whow the picture horizontally
  if(type=="List")
  {
    //Remove the overflow and set the width to 300px - the width of the pictures
    $('#wrapper').css('overflow','visible');
    $('#content').css('width','300px');

    //remove the currently displayed images
    $('img').remove();
    var contentDiv = document.getElementById('content');

       //Display the 4 images of the search
       for (var i = 0; i < 4; i++) {
            var result = results[i];
            var newImg = document.createElement('img');

            //get the source of the image
            newImg.src=result.unescapedUrl;
            newImg.width=300;
            newImg.height=200;
         
            //Add the image to the div
            contentDiv.appendChild(newImg);
          }

          //Show the google brand
          google.search.Search.getBranding('branding');
    }
  
  //If we want to show the images vertically
  else if (type=="Scroll")
  {
    //Set the overflow to scroll and the width to 4*width of an image
    $('#wrapper').css('overflow','scroll');
    $('#content').css('width','1200px');

    //Remove and display the images in the same way as above
    $('img').remove();
   var contentDiv = document.getElementById('content');
        results = imageSearch.results;
       for (var i = 0; i < 4; i++) {
          var result = results[i];
           var newImg = document.createElement('img');
           $('img').css('display','inline');
            newImg.src=result.unescapedUrl;
            newImg.width=300;
            newImg.height=200;
         
            contentDiv.appendChild(newImg);
          }
          google.search.Search.getBranding('branding');
}
  }

//Show a map with the place
//https://developers.google.com/places/javascript/
function showMap()
{
  //Get the position of this place
  var pos =JSON.parse(window.sessionStorage.getItem("position"));
  var mapCenter = new google.maps.LatLng(pos.lat,pos.lng);

  //Create the map with the center in the place's position
  map = new google.maps.Map(document.getElementById('map-canvas'), {
      center: mapCenter,
      zoom: 14
    });
  
  //Create a marker with this place
  var marker = new google.maps.Marker({
      position: mapCenter,
      map: map,
  });
}

//Search for image about this place
function imageSearch(place)
{
     //Create and execute the search
     imageSearch = new google.search.ImageSearch();
     imageSearch.setSearchCompleteCallback(this, imageSearchComplete, null);
     imageSearch.execute(place);

     //Get the google brand
     google.search.Search.getBranding('branding');
}

//Image search callback
function imageSearchComplete()
{
  //If the search is successful
	if (imageSearch.results && imageSearch.results.length > 0) {

       //Add the images as shown above in the resetView method
	     var contentDiv = document.getElementById('content');
     	  results = imageSearch.results;
       for (var i = 0; i < 4; i++) {
       	  var result = results[i];
       	   var newImg = document.createElement('img');
       	    newImg.src=result.unescapedUrl;
            newImg.width=300;
            newImg.height=200;
         
            contentDiv.appendChild(newImg);
          }
     }

}

/*
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


function updateStatusCallback(status){
   alert('Status updated!!');
   // Your logic here
}
*/

google.maps.event.addDomListener(window, "load", initialize);

