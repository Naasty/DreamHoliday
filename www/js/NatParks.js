
function onLoad(){
$(".natParks").click(function(event)
{
	window.location = "Pictures.html";
	window.sessionStorage.setItem("place",event.target.innerText);
	window.sessionStorage.setItem("site",event.target.id);
	
});
}