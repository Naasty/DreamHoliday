
function onLoad(){
$(".natParks").click(function(event)
{
	window.location = "GranParadiso.html";
	window.sessionStorage.setItem("place",event.target.innerText);
});
}