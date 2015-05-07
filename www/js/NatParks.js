//The state of this page, saved when we want to reorder the list
var state;

function onLoad(){
  //Click event for all the natParks class elements
$(".natParks").click(function(event)
{
  //Change the page
	window.location = "Pictures.html";

  //Save the text of the selected element
	window.sessionStorage.setItem("place",event.target.innerText);

  //Get the data stored in that element
	var data=$('#'+event.target.id).data(event.target.id);
  
  //The position of that element
	var pos = {"lat":data.lat,"lng":data.lng};

  //Store the position
  window.sessionStorage.setItem("position",JSON.stringify(pos));
});

//Event for when the value of the Sort drop menu is changed
$('#Sort').change(function(){

    //Save the state
    saveState();

    //Reorder 
    reorder($('#Sort').val());
    
  })
}

//Save the state
function saveState()
{
    state={
    	"places":new Array()
    };

    //Store all the elements from the list
    $('.natplace-name').each(function(index){
    	state.places[index]={
    		"id":this.id,
    		"location":$(this).data(this.id),
    		"text": this.innerText
    	}
    });

    //Store the state as a key
    window.localStorage.setItem("state",state);
}

//Reorder the list of natural parks
function reorder(type)
{
  //Sort by name
	if(type=="Name")
	{
    //Sort
		state.places.sort(function(a,b){return a.text.localeCompare(b.text)});

    //Redisplay them after the sorting
		redisplay();
	}

  //Sort by distance
	if(type=="Distance")
	{
        //Get the current position
        navigator.geolocation.getCurrentPosition(sort, failPosition,{timeout:10000});
	    
	}
}

//Called when getCurrentPosition failed
function failPosition()
{
	alert("error");
}

//Called when getCurrentPosition succeded
function sort(position)
{
  //Go through all the elements of the array
	for(var i=0;i<state.places.length-1;i++)
		for(var j=i+1;j<state.places.length;j++)
		{
			var pos1 = {
				"lat":position.coords.latitude,
			     "lng":position.coords.longitude}

      //Compare the distances
			if(getDistance(pos1,state.places[i].location)>getDistance(pos1,state.places[j].location))
			{
        //Swap the elements
				var aux=state.places[i];
				state.places[i]=state.places[j];
				state.places[j]=aux;
			}
		}
		redisplay();
}

//Redisplay the elements of the list
function redisplay()
{
  //Change the details of the list with the details from the current state
	$('.natplace-name').each(function(index){
    		this.id = state.places[index].id;
    		$(this).data(this.id,state.places[index].location);
    		this.innerText = state.places[index].text;
    	});
  //Refresh the list
	$('#placesList').listview('refresh');
}

//Source: http://stackoverflow.com/questions/1502590/calculate-distance-between-two-points-in-google-maps-v3
 function rad(x) {
  return x * Math.PI / 180;
}

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