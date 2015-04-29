https://developers.google.com/image-search/v1/devguide

google.load("search", "1");

var map;
var imageSearch;

function onLoad()
{
	var title = window.sessionStorage.getItem("place");
  var site = window.sessionStorage.getItem("site");
	$('#header').html(title);
  if(site!=null)
  {
     $('#site').attr('href',site);
     $('#site').html("Book your accomodation");
   }
	placeSearch(title);
	imageSearch(title);
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

function placeSearch(place)
{	
	
}
