
function onLoad(){
$(".natParks").click(function(event)
{
	window.location = event.target.id;
	window.sessionStorage.setItem("place",event.target.innerText);
});
}