//The state of this page
var state

function onLoad(){
//Click event for all the luxRes elements
$(".luxRes").click(function(event)
{
	//Change the location
	window.location = "Pictures.html";

	//Store the name of the place
	window.sessionStorage.setItem("place",event.target.innerText);

	//Get the data of the element and store it (position and site)
	var data=$('#'+event.target.id).data(event.target.id);
	window.sessionStorage.setItem("site",data.site);
	var pos = {"lat":data.lat,"lng":data.lng};

    window.sessionStorage.setItem("position",JSON.stringify(pos));
});

//Sort the list based on the value of the Sort drop menu
$('#Sort').change(function(){
    saveState();
    reorder($('#Sort').val());
    
  })
}

//Save the state
function saveState()
{
    state={
    	"places":new Array()
    };
    $('.luxRes-name').each(function(index){
    	state.places[index]={
    		"id":this.id,
    		"location":$(this).data(this.id),
    		"text": this.innerText
    	}
    });
    window.localStorage.setItem("state",state);
}

//Reorder base on the type selected
function reorder(type)
{
	if(type=="Name")
	{
		state.places.sort(function(a,b){return a.text.localeCompare(b.text)});
		redisplay();
	}

	if(type=="Distance")
	{
        navigator.geolocation.getCurrentPosition(sort, failPosition,{timeout:10000});
	    
	}
}

function failPosition()
{
	alert("error");
}

//Sort based on the position of the user
function sort(position)
{
	for(var i=0;i<state.places.length-1;i++)
		for(var j=i+1;j<state.places.length;j++)
		{
			var pos1 = {
				"lat":position.coords.latitude,
			     "lng":position.coords.longitude}
			if(getDistance(pos1,state.places[i].location)>getDistance(pos1,state.places[j].location))
			{
				var aux=state.places[i];
				state.places[i]=state.places[j];
				state.places[j]=aux;
			}
		}
		redisplay();
}

//Redisplay by changing the values based on the current state 
function redisplay()
{
	$('.luxRes-name').each(function(index){
    		this.id = state.places[index].id;
    		$(this).data(this.id,state.places[index].location);
    		this.innerText = state.places[index].text;
    	});
	$('#placesList').listview('refresh');
}

//Source: http://stackoverflow.com/questions/1502590/calculate-distance-between-two-points-in-google-maps-v3
 function rad(x) {
  return x * Math.PI / 180;
}
//Source: http://stackoverflow.com/questions/1502590/calculate-distance-between-two-points-in-google-maps-v3

 function getDistance(p1, p2) {
  var R = 6378137; // Earth’s mean radius in meter
  var dLat = rad(p2.lat - p1.lat);
  var dLong = rad(p2.lng- p1.lng);
  var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + 
          Math.cos(rad(p1.lat)) * Math.cos(rad(p2.lat)) *
  	      Math.sin(dLong / 2) * Math.sin(dLong / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c;
  return d; // returns the distance in meter
   }