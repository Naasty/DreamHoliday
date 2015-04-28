
function onLoad(){
$(".luxRes").click(function(event)
{
	//window.location = event.target.id;
	window.location = "Pictures.html";
	window.sessionStorage.setItem("place",event.target.innerText);

});
}