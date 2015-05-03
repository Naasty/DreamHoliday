
function onLoad(){
$(".luxRes").click(function(event)
{
	window.location = "Pictures.html";
	window.sessionStorage.setItem("place",event.target.innerText);
	var data=$('#'+event.target.id).data(event.target.id);
	window.sessionStorage.setItem("site",data.site);
	var pos = {"lat":data.lat,"lng":data.lng};

    window.sessionStorage.setItem("position",JSON.stringify(pos));
});
}